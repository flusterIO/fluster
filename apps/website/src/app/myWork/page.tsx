import { ClientMdxWrapper } from "#/core/mdx/client_mdx_wrapper";
import React, { type ReactNode } from "react";
import { myWorkSource } from "#/core/mdx/sources/my_work_source";
import { notFound } from "next/navigation";
import Link from "next/link";

const MyWorkPage = async (): Promise<ReactNode> => {
    const page = myWorkSource.getPages()[0];
    if (!page) {
        notFound();
    }
    return (
        <div className="w-full py-16 flex flex-col justify-start items-center">
            <div className="px-4 py-3 w-full flex flex-row justify-start items-center">
                <Link href="/" className="text-bold">
                    Fluster
                </Link>
            </div>
            <div className="prose dark:prose-invert prose-code:before:content-none prose-code:after:content-none prose-code:bg-[--shiki-light-bg] dark:prose-code:bg-[--shiki-dark-bg] [&_code_*]:text-[--shiki-light] dark:[&_code_*]:text-[--shiki-dark] max-w-[min(90vw,1080px)]">
                <ClientMdxWrapper body={page.data.body} />
            </div>
        </div>
    );
};

MyWorkPage.displayName = "MyWorkPage";

export default MyWorkPage;
