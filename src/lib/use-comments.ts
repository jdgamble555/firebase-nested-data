import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    QuerySnapshot,
    serverTimestamp,
    setDoc,
    Timestamp,
    where,
    writeBatch,
    type DocumentData
} from "firebase/firestore";
import { getComment, nestedComments } from "./tools";
import { auth, db } from "./firebase";
import { FirebaseError } from "firebase/app";
import { useUser } from "./use-user";
import { derived, type Readable } from "svelte/store";
import { dev } from "$app/environment";
import { startsWith } from "./firebase-helper";

// fix what's up on comments page
// add depth drop down, calculate level where clause
// possible firebase-admin ssr version?

export const snapToData = (
    q: QuerySnapshot<DocumentData, DocumentData>
) => {

    // creates comment data from snapshot
    if (q.empty) {
        return [];
    }
    const comments = q.docs.map((doc) => {
        const data = doc.data({
            serverTimestamps: 'estimate'
        });
        const createdAt = data['createdAt'] as Timestamp;
        const comment = {
            ...data,
            path: data['path']?.split('_').join('/'),
            parent: data['parent']?.split('_').join('/'),
            createdAt: createdAt.toDate(),
            id: doc.id
        };
        return comment;
    }) as CommentType[];

    // create children from IDs
    const _comments = nestedComments(comments);
    if (dev) {
        console.log(_comments);
    }
    return _comments;
}

export const addComment = async (event: SubmitEvent) => {

    const { text, parent: _parent, formElement } = getComment(event);

    const level = _parent.split('/').length + 1 || 1;
    const parent = _parent.split('/').join('_');

    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw 'No user!';
    }

    // create short ID
    const id = doc(
        collection(db, 'comments')
    ).id.substring(0, 5);

    const path = parent ? `${parent}_${id}` : id;

    try {
        await setDoc(
            doc(db, `comments/${id}`),
            {
                createdBy: currentUser.uid,
                createdAt: serverTimestamp(),
                text,
                level,
                path,
                parent,
                votes: 0
            }
        );
        formElement.reset();

    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);
        }
    }
};

export const deleteComment = async (path: string) => {

    const _path = path.split('/').join('_');

    const childrenSnap = await getDocs(
        query(
            collection(db, 'comments'),
            ...startsWith('path', _path)
        )
    );

    if (childrenSnap.empty) {
        throw 'No ids!';
    }

    const batch = writeBatch(db);

    try {
        childrenSnap.docs.map(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);
        }
    }
};


export const useComments = (
    term: string | null = null,
    levels: number[] = []
) => {

    const user = useUser();

    // filtering comments depend on user
    return derived<
        Readable<UserType | null>,
        CommentType[]
    >(
        user, ($user, set) => {
            set([]);
            if (!$user) {
                return;
            }
            const queryConstraints = [];
            if (term) {
                const _term = term.split('/').join('_');
                queryConstraints.push(
                    where('path', '>=', _term),
                    where('path', '<=', _term + '~')
                );
            }
            if (levels?.length) {
                queryConstraints.push(
                    where('level', 'in', levels)
                );
            }
            return onSnapshot(
                query(
                    collection(db, 'comments'),
                    where('createdBy', '==', $user.uid),
                    orderBy('path'),
                    orderBy('votes', 'desc'),
                    ...queryConstraints
                ), (q) => set(snapToData(q))
            );
        });
};

