import { MdxContent } from "#/mdx/presentation/mdx_content";
import { MdxProviderGroup } from "#/mdx/presentation/mdx_provider_group";
import React, { type ReactNode } from "react";
import { useLoaderData } from "react-router";

const EmbeddedDocsByIdPage = (): ReactNode => {
    const data = useLoaderData();
    return (
        <div
            /* id="scroll-target-ocs" */
            className={
                "w-full flex flex-col justify-start items-center py-16 px-6 md:px-8"
            }
        >
            <div className="w-[min(1080px,90%)]">
                <MdxProviderGroup>
                    <MdxContent mdx={data.content} />
                </MdxProviderGroup>
            </div>
        </div>
    );
};

EmbeddedDocsByIdPage.displayName = "EmbeddedDocsByIdPage";

export default EmbeddedDocsByIdPage;
