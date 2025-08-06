// .source folder will be generated when you run `next dev`
import { createMDXSource } from "@fumadocs/content-collections";
import { allMyWorks, allMetas } from "content-collections";
import { loader } from "fumadocs-core/source";
import { TestTube } from "lucide-react";

export const myWorkSource = loader({
    baseUrl: "/my_work",
    source: createMDXSource(allMyWorks, allMetas),
    icon: () => <TestTube />,
});
