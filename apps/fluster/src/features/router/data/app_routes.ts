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
    embeddedDocs = "/embedded_docs",
    bookmarks = "/bookmarks",
    taskLists = "/taskLists",
    onboarding = "/onboarding",
}

export enum ResourceRoutes {
    mathjaxFonts = "/assets/mathjax_fonts",
    mathjax = "/assets/mathjax",
}

export const getMdxNoteByIdRoute = (noteId: number) => `/mdx?noteId=${noteId}`;
export const getMdxNoteFromFsRoute = (fsPath: string): string => {
    const sp = new URLSearchParams();
    sp.set("fsPath", fsPath);
    return `/mdx?${sp.toString()}`;
};
