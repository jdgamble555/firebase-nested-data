import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params, url }) => {

    const path = params.path;

    const depth = url.searchParams.get('depth');

    const numLevels = path.split('/').length;

    const levelArray = [];

    if (depth) {
        for (let i = 0; i < Number(depth); ++i) {
            levelArray.push(i + numLevels);
        }
    }

    const parent = path?.split('/').slice(0, -1).join('/');

    if (!path) {
        return redirect(301, '/');
    }

    return {
        path,
        parent,
        levelArray
    };
};