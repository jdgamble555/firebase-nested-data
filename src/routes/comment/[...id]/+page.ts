import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {

    const path = params.id;
    const parentPath = path?.split('/').slice(0, -1).join('/');
    const id = path?.split('/').join('_');

    if (!path) {
       return redirect(301, '/');
    }

    return {
        id,
        path,
        parentPath
    };
};