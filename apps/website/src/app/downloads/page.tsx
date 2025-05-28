import PageNotYetBuilt from "#/features/coming_soon/page_not_yet_built";
import React, { type ReactNode } from "react";

const DownloadsPage = (): ReactNode => {
    return (
        <div className="w-screen min-h-screen flex flex-col justify-center items-center">
            <PageNotYetBuilt />
        </div>
    );
};

DownloadsPage.displayName = "DownloadsPage";

export default DownloadsPage;
