import type { PageLoad } from "./$types";

export const load: PageLoad = ({ url }) => {

    const depth = url.searchParams.get('depth');

    const levelArray = [];

    if (depth) {
        for (let i = 1; i <= Number(depth); ++i) {
            levelArray.push(i);
        }
    }

    return {
        levelArray
    };
};