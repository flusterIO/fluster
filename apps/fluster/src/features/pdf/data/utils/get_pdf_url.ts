import { AppRoutes } from "@fluster.io/dev";

export const getPdfUrl = (pdfPath: string): string => {
    const sp = new URLSearchParams();
    sp.set("fsPath", pdfPath);
    return `${AppRoutes.pdf}?${sp.toString()}`;
};
