import React, { type ReactNode } from "react";

interface DictionaryEntryProps {
    label: string;
    children: ReactNode;
}

export const DictionaryEntry = ({
    label,
    children,
}: DictionaryEntryProps): ReactNode => {
    return (
        <div className="w-full @[540px]/mdx:mx-8 @[540px]/mdx:w-[calc(100%-4rem)] border rounded not-prose px-4 py-3 bg-card text-card-foreground">
            <h2 className="text-xl font-bold">{label}</h2>
            <div>{children}</div>
        </div>
    );
};

DictionaryEntry.displayName = "DictionaryEntry";
