import { documentation } from "../../../../../.source/";
import { loader } from "fumadocs-core/source";

export const source = loader({
    baseUrl: "/docs",
    source: documentation.toFumadocsSource(),
});

// export const myWorkSource = loader({
//     baseUrl: "/myWork",
//     source: myWork.toFumadocsSource(),
// });
