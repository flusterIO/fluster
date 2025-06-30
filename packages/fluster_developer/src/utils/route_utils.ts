import { AppRoutes } from "../types/app_routes";

/// docId a key of the InternalEmbeddedDocsId  enum. I'll handle the types in the developer package later.
export const getEmbeddedDocUrl = (docId: string) =>
    `${AppRoutes.embeddedDocs.toString()}/${encodeURI(docId)}`;

export const getByEquationUrl = (equationId: string): string => {
    const sp = new URLSearchParams();
    sp.set("by_equation", equationId);
    return `${AppRoutes.search}?${sp.toString()}`;
};
