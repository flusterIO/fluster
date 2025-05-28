// .source folder will be generated when you run `next dev`
import { docs } from "../../../../.source";
import { loader } from "fumadocs-core/source";
import { BookOpen } from "lucide-react";
export const docsSource = loader({
    baseUrl: "/docs",
    source: docs.toFumadocsSource(),
    icon: () => <BookOpen />,
});
