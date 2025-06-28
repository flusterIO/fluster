import { MdxContent } from "#/mdx/presentation/mdx_content";
import { LoadingComponent } from "@/components/loading_screen";
import { commands } from "@/lib/bindings";
import React, { useEffect, useState, type ReactNode } from "react";

interface EmbeddedDocsByFilePathProps {
    filePath: string;
}

export const EmbeddedDocsByFilePath = ({
    filePath,
}: EmbeddedDocsByFilePathProps): ReactNode => {
    const [content, setContent] = useState<string | null>();
    const getData = async (fp: string): Promise<void> => {
        const res = await commands.getEmbeddedDocByRelativePath(fp);
        setContent(res);
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
                "w-full h-screen flex flex-col justify-start items-center py-12 px-6 md:px-8 overflow-y-auto"
            }
        >
            <div className="w-[min(1080px,90%)]">
                <MdxContent mdx={content} />
            </div>
        </div>
    );
};

EmbeddedDocsByFilePath.displayName = "EmbeddedDocsByFilePath";
