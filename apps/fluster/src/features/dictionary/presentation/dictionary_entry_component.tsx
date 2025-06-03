import { MdxContent } from "#/mdx/presentation/mdx_content";
import { type ReactNode } from "react";
import { DictionaryEntryWithIdx } from "../types";

interface DictionaryEntryComponentProps {
    item: DictionaryEntryWithIdx;
}

const DictionaryEntryComponent = ({
    item,
}: DictionaryEntryComponentProps): ReactNode => {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-4 mb-6">
            <MdxContent
                mdx={`## ${item.label}

${item.body}`}
            />
        </div>
    );
};

DictionaryEntryComponent.displayName = "DictionaryEntryComponent";

export default DictionaryEntryComponent;
