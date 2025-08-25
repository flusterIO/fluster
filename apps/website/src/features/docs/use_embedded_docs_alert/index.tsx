import { buttonVariants } from "#/core/shad/ui/button";
import Link from "next/link";
import React, { type ReactNode } from "react";

export const UseEmbeddedDocsPage = (): ReactNode => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="max-w-[min(90vw,540px)] space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold">Documentation</h2>
                <div className="">
                    Fluster includes it&apos;s own set of embedded documentation. This
                    documentation is available from anywhere within the app via the
                    command palette (cmd+p by default).
                </div>
                <div>
                    {" "}
                    Until I have time to create proper online documentation, please refer
                    to the embedded docs for more information.
                </div>
                <div className="w-full flex flex-row justify-end items-center">
                    <Link href="/" className={buttonVariants()}>
                        Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

UseEmbeddedDocsPage.displayName = "UseEmbeddedDocsPage";
