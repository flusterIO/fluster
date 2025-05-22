import { LargeText } from "@/components/typography/typography";
import { DictionaryEntry } from "@/lib/bindings";
import { type ReactNode } from "react";

interface DictionaryEntryComponentProps {
    item: DictionaryEntry;
}

const DictionaryEntryComponent = ({
    item,
}: DictionaryEntryComponentProps): ReactNode => {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-4 mb-6">
            <LargeText>{item.label}</LargeText>
            <div className="px-6">{item.body}</div>
        </div>
    );
};

DictionaryEntryComponent.displayName = "DictionaryEntryComponent";

export default DictionaryEntryComponent;
