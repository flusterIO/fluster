import { H3 } from "@/components/typography/typography";
import { SnippetItem } from "@/lib/bindings";
import React, { type ReactNode } from "react";
import CodeBlock from "../code_block/main";
import { Button } from "@/components/ui/shad/button";

interface SnippetItemComponentProps {
    item: SnippetItem;
}

const SnippetListItem = ({ item }: SnippetItemComponentProps): ReactNode => {
    return (
        <div className="w-[min(90%,1080px)] h-fit px-6 pb-6 pt-4 border rounded">
            <H3 className="mb-2">{item.label}</H3>
            <div className="text-sm text-muted-foreground">{item.lang}</div>
            {item.desc && item.desc !== "" && <div className="mb-4">{item.desc}</div>}
            <CodeBlock lang={item.lang} code={item.body} />
            <div className="flex flex-row justify-end items-center gap-4 w-full mt-4">
                <Button variant={"destructive"}>Delete</Button>
                <Button>Copy</Button>
            </div>
        </div>
    );
};

SnippetListItem.displayName = "SnippetListItem";

export default SnippetListItem;
