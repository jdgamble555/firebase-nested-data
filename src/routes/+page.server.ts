import { collection, getDocs } from "firebase/firestore";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/firebase";
//import { generateComments } from "./seed";

export const load = (async () => {

    const snap = await getDocs(
        collection(db, 'comments')
    );

    const data = snap.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id
        };
    });

    console.log(data);


    //await generateComments();

}) satisfies PageServerLoad;