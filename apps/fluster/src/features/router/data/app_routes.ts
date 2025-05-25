export enum AppRoutes {
    dashboard = "/",
    settings = "/settings",
    bibliography = "/bibliography",
    dictionary = "/dictionary",
    snippets = "/snippets",
    kanbanBoards = "/kanban-boards",
    mdxNotes = "/mdx",
    splitViewEditMdx = "/mdx-split-view",
}

export const getMdxNoteByIdRoute = (noteId: number) => `/mdx?noteId=${noteId}`;
export const getMdxNoteFromFsRoute = (fsPath: string): string => {
    let sp = new URLSearchParams();
    sp.set("fsPath", fsPath);
    return `/mdx?${sp.toString()}`;
};
