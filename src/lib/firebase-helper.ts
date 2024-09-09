import {
    endAt,
    orderBy,
    query,
    startAt,
    type CollectionReference
} from "firebase/firestore";

export function startsWith(
    collectionRef: CollectionReference,
    fieldName: string,
    term: string
) {
    return query(
        collectionRef,
        orderBy(fieldName),
        startAt(term),
        endAt(term + '~')
    );
}