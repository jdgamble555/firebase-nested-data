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

    const _level = Number(level);
    
    return { text, level: _level, parent, formElement };
};



export const nestedComments = (comments: CommentType[]) => {
    const commentMap: Record<string, CommentType> = {};
    const result: CommentType[] = [];

    // Initialize the commentMap and set up children arrays
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        comment.children = [];
        commentMap[comment.id] = comment;
    }

    // Nest comments under their parents
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];

        // If no parent, push it to top-level result and continue
        if (!comment.parent) {
            result.push(comment);
            continue;
        }

        // If parent exists, add it to the parent's children array
        const parent = commentMap[comment.parent];
        if (parent) {
            parent.children!.push(comment);
        }
    }

    return result;
};

