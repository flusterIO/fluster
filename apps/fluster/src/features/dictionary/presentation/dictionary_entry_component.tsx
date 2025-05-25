import MdxContent from "#/mdx/presentation/mdx_content";
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
      <MdxContent
        mdx={`## ${item.label}

${item.body}`}
      />
    </div>
  );
};

DictionaryEntryComponent.displayName = "DictionaryEntryComponent";

export default DictionaryEntryComponent;
