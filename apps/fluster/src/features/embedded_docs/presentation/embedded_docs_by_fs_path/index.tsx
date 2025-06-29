import { MdxContent } from "#/mdx/presentation/mdx_content";
import { LoadingComponent } from "@/components/loading_screen";
import { commands } from "@/lib/bindings";
import { AppRoutes, Button } from "@fluster.io/dev";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";

interface EmbeddedDocsByFilePathProps {
    filePath: string;
}

export const EmbeddedDocsByFilePath = ({
    filePath,
}: EmbeddedDocsByFilePathProps): ReactNode => {
    const [content, setContent] = useState<string | null>();
    const nav = useNavigate();
    const getData = async (fp: string): Promise<void> => {
        const res = await commands.getEmbeddedDocByRelativePath(fp);
        if (res.status === "ok") {
            const withoutFrontMatter = await commands.removeFrontMatter(res.data);
            setContent(withoutFrontMatter);
        } else {
            console.error(`An error occurred while loading documentation`);
            nav("/");
        }
    };
    useEffect(() => {
        getData(filePath);
    }, [filePath]);
    if (!content) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <LoadingComponent />
            </div>
        );
    }
    return (
        <div
            id="scroll-target"
            className={
                "w-full h-screen flex flex-col justify-start items-center py-16 px-6 md:px-8 overflow-y-auto"
            }
        >
            <div className="w-full h-fit flex flex-row justify-start items-center">
                <Button size="icon" onClick={() => nav(AppRoutes.embeddedDocs)}>
                    <ChevronLeft />
                </Button>
            </div>
            <div className="w-[min(1080px,90%)]">
                <MdxContent mdx={content} />
            </div>
        </div>
    );
};

EmbeddedDocsByFilePath.displayName = "EmbeddedDocsByFilePath";
