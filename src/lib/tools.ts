export const getComment = (event: SubmitEvent) => {

    event.preventDefault();

    const formElement = event.target as HTMLFormElement;

    const { text, level, parent } = Object.fromEntries(
        new FormData(formElement)
    );

    if (!text || typeof text !== 'string') {
        throw "No comment!";
    }
    if (!level || typeof level !== 'string') {
        throw "No level!";
    }
    if (typeof parent !== 'string') {
        throw "No parent!";
    }
    return { text, level, parent, formElement };
};