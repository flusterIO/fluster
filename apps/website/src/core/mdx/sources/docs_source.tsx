// .source folder will be generated when you run `next dev`
import { createMDXSource } from "@fumadocs/content-collections";
import { allDocs, allMetas } from "content-collections";
import { loader } from "fumadocs-core/source";
import { BookOpen } from "lucide-react";

export const docsSource = loader({
    baseUrl: "/docs",
    source: createMDXSource(allDocs, allMetas),
    icon: () => <BookOpen />,
});
