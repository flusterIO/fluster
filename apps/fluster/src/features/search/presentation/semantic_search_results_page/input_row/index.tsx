import { Input } from "@fluster.io/dev";
import { SearchIcon } from "lucide-react";
import React, { useState, type ReactNode } from "react";

export const SemanticSearchInputRow = (): ReactNode => {
    const [value, setValue] = useState("");
    return (
        <div className="w-full flex flex-row justify-between items-center gap-4 relative">
            <SearchIcon className="absolute left-3 top-[50%] translate-y-[-50%] text-foreground/80 w-4 h-4" />
            <Input
                className="w-full pr-3 pl-10 py-4"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

SemanticSearchInputRow.displayName = "SemanticSearchInputRow";
