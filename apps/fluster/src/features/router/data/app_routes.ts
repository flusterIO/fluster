export { type AppRoutes } from "@fluster.io/dev";
export enum ResourceRoutes {
    mathjax = "/mathjax",
    mathjaxFonts = "/mathjax/output/chtml/fonts/woff-v2/",
}

export const getMdxNoteByIdRoute = (noteId: number) => `/mdx?noteId=${noteId}`;
export const getMdxNoteFromFsRoute = (fsPath: string): string => {
    const sp = new URLSearchParams();
    sp.set("fsPath", fsPath);
    return `/mdx?${sp.toString()}`;
};
