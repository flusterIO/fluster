import { H2 } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

export const NoBookmarksFound = (): ReactNode => {
    return (
        <div className="w-full h-full min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center gap-4">
            <H2>No Bookmarks</H2>
            <p className="max-w-[350px] text-center text-foreground/80">
                Use the right panel when viewing a note to set it's bookmarked status.
            </p>
        </div>
    );
};

NoBookmarksFound.displayName = "NoBookmarksFound";
