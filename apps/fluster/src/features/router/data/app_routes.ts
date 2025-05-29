export enum AppRoutes {
    dashboard = "/",
    settings = "/settings",
    bibliography = "/bibliography",
    dictionary = "/dictionary",
    snippets = "/snippets",
    kanbanBoards = "/kanban-boards",
    equations = "/equations",
    viewMdxNote = "/mdx",
    splitViewEditMdx = "/mdx-split-view",
    embeddedDocs = "/docs",
    bookmarks = "/bookmarks",
    taskLists = "/taskLists",
}

export const getMdxNoteByIdRoute = (noteId: number) => `/mdx?noteId=${noteId}`;
export const getMdxNoteFromFsRoute = (fsPath: string): string => {
    const sp = new URLSearchParams();
    sp.set("fsPath", fsPath);
    return `/mdx?${sp.toString()}`;
};
