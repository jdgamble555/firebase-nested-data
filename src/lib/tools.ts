export const getComment = (event: SubmitEvent) => {

    event.preventDefault();

    const formElement = event.target as HTMLFormElement;

    const { text, parent } = Object.fromEntries(
        new FormData(formElement)
    );

    if (!text || typeof text !== 'string') {
        throw "No comment!";
    }
    if (typeof parent !== 'string') {
        throw "No parent!";
    }
    
    return { text, parent, formElement };
};



export const nestedComments = (comments: CommentType[]) => {
    const commentMap: Record<string, CommentType> = {};
    const result: CommentType[] = [];

    // Initialize the commentMap and set up children arrays
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        comment.children = [];
        commentMap[comment.path] = comment;
    }

    // Nest comments under their parents, or handle cases where parent is missing
    for (const comment of comments) {
        // If the comment doesn't have a parent, add it to the top-level result immediately
        if (!comment.parent) {
            result.push(comment);
            continue;
        }

        // If the parent is not in the dataset, handle the child as a top-level comment (or change as needed)
        const parent = commentMap[comment.parent];
        if (!parent) {
            result.push(comment);
            continue;
        }

        // Add the comment to the parent's children array if the parent exists
        parent.children!.push(comment);
    }

    return result;
};

