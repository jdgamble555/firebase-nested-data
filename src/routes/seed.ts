import { db } from "$lib/firebase";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

// Function to generate Firebase-like random IDs
function generateFirebaseId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
}

// Reference to the 'comments' collection
const commentsRef = collection(db, 'comments');

// Function to generate 10 comments with Firebase-like IDs and parent references
export async function generateComments() {
  // Manually generate Firebase-like IDs for each comment
  const commentIds = {
    comment_1: generateFirebaseId(),
    comment_2: generateFirebaseId(),
    comment_3: generateFirebaseId(),
    comment_4: generateFirebaseId(),
    comment_5: generateFirebaseId(),
    comment_6: generateFirebaseId(),
    comment_7: generateFirebaseId(),
    comment_8: generateFirebaseId(),
    comment_9: generateFirebaseId(),
    comment_10: generateFirebaseId(),
  };

  const comments = [
    { id: commentIds.comment_1, content: "This is the first comment", depth: 1, postId: "post_1", parent: null },
    { id: commentIds.comment_2, content: "This is a reply to the first comment", depth: 2, postId: "post_1", parent: commentIds.comment_1 },
    { id: commentIds.comment_3, content: "Another top-level comment", depth: 1, postId: "post_2", parent: null },
    { id: commentIds.comment_4, content: "Reply to the second post", depth: 2, postId: "post_2", parent: commentIds.comment_3 },
    { id: commentIds.comment_5, content: "Deep reply to first comment", depth: 3, postId: "post_1", parent: commentIds.comment_2 },
    { id: commentIds.comment_6, content: "Second level reply on post 3", depth: 2, postId: "post_3", parent: commentIds.comment_7 },
    { id: commentIds.comment_7, content: "Top-level comment on post 3", depth: 1, postId: "post_3", parent: null },
    { id: commentIds.comment_8, content: "Reply to post 4", depth: 2, postId: "post_4", parent: commentIds.comment_9 },
    { id: commentIds.comment_9, content: "First level reply on post 4", depth: 1, postId: "post_4", parent: null },
    { id: commentIds.comment_10, content: "Deep reply on post 3", depth: 3, postId: "post_3", parent: commentIds.comment_8 },
  ];

  for (const comment of comments) {
    try {
      const docRef = doc(commentsRef, comment.id);
      await setDoc(docRef, comment);
      console.log(`Added comment: ${comment.content} with ID: ${comment.id}`);
    } catch (e) {
      console.error("Error adding comment: ", e);
    }
  }
}

// Call the function to generate comments
