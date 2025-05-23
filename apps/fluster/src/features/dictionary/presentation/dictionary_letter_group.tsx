import { H3 } from "@/components/typography/typography";
import { DictionaryEntry } from "@/lib/bindings";
import { useMemo, type ReactNode } from "react";
import DictionaryEntryComponent from "./dictionary_entry_component";

interface DictionaryLetterGroupProps {
    letter: string;
    items: DictionaryEntry[];
}

const DictionaryLetterGroup = ({
    letter,
    items,
}: DictionaryLetterGroupProps): ReactNode => {
    const sortedItems = useMemo(() => {
        return items.sort((a, b) => (a.label > b.label ? 1 : -1));
    }, [items]);
    return (
        <div className="w-full grid grid-cols-[80px_1fr] max-w-[1080px]">
            <div className="w-full h-full flex flex-col justify-start items-center">
                <H3 className="w-full">{letter.toUpperCase()}</H3>
            </div>
            <div className="w-full flex flex-col flex-grow justify-center items-start">
                {sortedItems.map((k) => (
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
