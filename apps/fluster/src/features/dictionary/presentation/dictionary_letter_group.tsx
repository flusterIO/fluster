import { H3, LargeText } from "@/components/typography/typography";
import { DictionaryEntry } from "@/lib/bindings";
import React, { type ReactNode } from "react";
import DictionaryEntryComponent from "./dictionary_entry_component";

interface DictionaryLetterGroupProps {
    letter: string;
    items: DictionaryEntry[];
}

const DictionaryLetterGroup = ({
    letter,
    items,
}: DictionaryLetterGroupProps): ReactNode => {
    return (
        <div className="grid grid-cols-[120px_1fr]">
            <div className="w-full h-full flex flex-col justify-start items-center">
                <H3>{letter.toUpperCase()}</H3>
            </div>
            <div className="w-full flex flex-col justify-center items-start">
                {items.map((k) => (
                    <DictionaryEntryComponent
                        key={`dictionary-entry-${k.label}`}
                        item={k}
                    />
                ))}
            </div>
        </div>
    );
};

DictionaryLetterGroup.displayName = "DictionaryLetterGroup";

export default DictionaryLetterGroup;
