import { H3, H4 } from "@/components/typography/typography";
import React, { type ReactNode } from "react";

const SnippetsFilterPanel = (): ReactNode => {
    return (
        <div className="w-full h-full flex flex-col justify-start items-start">
            <H4>Filter Snippets</H4>
        </div>
    );
};

SnippetsFilterPanel.displayName = "SnippetsFilterPanel";

export default SnippetsFilterPanel;
