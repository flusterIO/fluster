import { AppRoutes } from "@fluster.io/dev";

export const getMdxNoteUrl = (fsPath: string): string => {
    const sp = new URLSearchParams();
    sp.set("fsPath", fsPath);
    return `${AppRoutes.viewMdxNote}?${sp.toString()}`;
};
