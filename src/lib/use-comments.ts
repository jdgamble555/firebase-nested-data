import {
    collection,
    doc,
    documentId,
    endAt,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    QuerySnapshot,
    serverTimestamp,
    setDoc,
    startAt,
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

// fix what's up on comments page
// fix comments with /
// add depth drop down, calculate level where clause
// add up button that goes just up one parent
// change ID to path, doc ID to small
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

    const { text, level, parent, formElement } = getComment(event);

    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw 'No user!';
    }

    // create short ID
    const id = doc(
        collection(db, 'comments')
    ).id.substring(0, 5);

    const new_id = parent ? `${parent}_${id}` : id;

    try {
        await setDoc(
            doc(db, `comments/${new_id}`),
            {
                createdBy: currentUser.uid,
                createdAt: serverTimestamp(),
                text,
                level,
                parent
            }
        );
        formElement.reset();

    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);
        }
    }
};

export const deleteComment = async (id: string) => {

    const childrenSnap = await getDocs(
        query(
            collection(db, 'comments'),
            orderBy(documentId()),
            startAt(id),
            endAt(id + '~')
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
                queryConstraints.push(
                    startAt(term),
                    endAt(term + '~')
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
                    orderBy(documentId()),
                    ...queryConstraints
                ), (q) => set(snapToData(q))
            );
        });
};

