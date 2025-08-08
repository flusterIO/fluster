import { documentation } from "../../../../../.source/";
import { loader } from "fumadocs-core/source";

export const source = loader({
    baseUrl: "/docs",
    source: documentation.toFumadocsSource(),
});
