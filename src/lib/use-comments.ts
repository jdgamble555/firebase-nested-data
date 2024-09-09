import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    QuerySnapshot,
    serverTimestamp,
    setDoc,
    Timestamp,
    where,
    type DocumentData
} from "firebase/firestore";
import { getComment } from "./tools";
import { auth, db } from "./firebase";
import { FirebaseError } from "firebase/app";
import { useUser } from "./use-user";
import { derived, type Readable } from "svelte/store";

export const snapToData = (
    q: QuerySnapshot<DocumentData, DocumentData>
) => {

    // creates comment data from snapshot
    if (q.empty) {
        return [];
    }
    return q.docs.map((doc) => {
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

    try {
        await setDoc(
            doc(db, `comments/${id}`),
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
    try {
        await deleteDoc(
            doc(db, 'comments', id)
        );
    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);
        }
    }
};


export const useComments = () => {

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
            return onSnapshot(
                query(
                    collection(db, 'comments'),
                    where('createdBy', '==', $user.uid),
                    orderBy('createdAt'),
                    orderBy('parent')
                ), (q) => set(snapToData(q))
            );
        });
};

