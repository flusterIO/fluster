import React, { type ReactNode } from "react";

const PageNotYetBuilt = (): ReactNode => {
    return (
        <div className="w-[min(90vw,640px)] h-fit border rounded p-6 [&>p]:my-2 [&>p]:indent-4">
            <h3 className="text-3xl font-bold">{"You're early!"}</h3>
            <p>
                {"This project has been under active development for well over a year, but it's currently undergoing a massive rewrite."}
            </p>
            <p>
                {
                    "Don't worry, this rewrite in rust will make Fluster an irreplacable tool once it is complete, but we're not quite there yet."
                }
            </p>
            <p>
                {
                    "When a beta is ready, Fluster will follow a 'build in public' approach, releasing a new build multiple times per week. Check back often, as a hopeful release date is planned for this August, just weeks away."
                }
            </p>
        </div>
    );
};

PageNotYetBuilt.displayName = "PageNotYetBuilt";

export default PageNotYetBuilt;
