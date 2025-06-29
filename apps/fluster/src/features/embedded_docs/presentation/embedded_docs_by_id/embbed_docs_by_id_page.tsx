import { MdxContent } from "#/mdx/presentation/mdx_content";
import React, { type ReactNode } from "react";
import { useLoaderData } from "react-router";

const EmbeddedDocsByIdPage = (): ReactNode => {
    const data = useLoaderData();
    return (
        <div
            id="scroll-target"
            className={
                "w-full h-screen flex flex-col justify-start items-center py-16 px-6 md:px-8 overflow-y-auto"
            }
        >
            <div className="w-[min(1080px,90%)]">
                <MdxContent mdx={data.content} />
            </div>
        </div>
    );
};

EmbeddedDocsByIdPage.displayName = "EmbeddedDocsByIdPage";

export default EmbeddedDocsByIdPage;
