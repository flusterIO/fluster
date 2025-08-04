import { AppRoutes } from "@fluster.io/dev";

export const getHtmlFileURl = (pdfPath: string): string => {
    const sp = new URLSearchParams();
    sp.set("fsPath", pdfPath);
    return `${AppRoutes.htmlFile}?${sp.toString()}`;
};
