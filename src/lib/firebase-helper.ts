import {
    endAt,
    orderBy,
    startAt,
} from "firebase/firestore";


export const startsWith = (
    fieldName: string,
    term: string
) => {
    return [
        orderBy(fieldName),
        startAt(term),
        endAt(term + '~')
    ];
};