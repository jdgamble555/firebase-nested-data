import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params, url }) => {

    const path = params.id;

    const depth = url.searchParams.get('depth');

    const numLevels = path.split('/').length;

    const levelArray = [];

    if (depth) {
        for (let i = 0; i < Number(depth); ++i) {
            levelArray.push(i + numLevels);
        }
    }

    const parentPath = path?.split('/').slice(0, -1).join('/');
    const id = path?.split('/').join('_');

    if (!path) {
        return redirect(301, '/');
    }

    return {
        id,
        path,
        parentPath,
        levelArray
    };
};