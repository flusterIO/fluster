import React, { type ReactNode } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../shad/card";
import { CodeBlock, CodeBlockProps } from "../../code/code_block";
import { Badge } from "../../shad/badge";

interface SnippetModalProps
    extends Pick<CodeBlockProps, "themes" | "darkMode"> {
    data: {
        label: string;
        body: string;
        desc: string | null;
        lang: string;
        ctime: string | null;
        utime: string | null;
        tags: string[];
    };
}

export const SnippetModal = ({
    data,
    themes,
    darkMode,
}: SnippetModalProps): ReactNode => {
    return (
        <Card className="bg-background flex flex-col justify-center items-start lg:flex-row lg:w-auto max-w-[min(90vw,1080px)]">
            <CardHeader className="w-full">
                <CardTitle>{data.label}</CardTitle>
                {data.desc?.length && <CardDescription>{data.desc}</CardDescription>}
            </CardHeader>
            <CardContent className="w-full">
                <div className="flex flex-col justify-start items-center">
                    <CodeBlock
                        lang={data.lang}
                        code={data.body}
                        themes={themes}
                        darkMode={darkMode}
                        className="max-h-[400px] overflow-y-auto"
                    />
                    {
                        <div className="w-full flex flex-row justify-start items-center gap-4 flex-wrap">
                            {data.tags.map((t) => {
                                return <Badge>{t}</Badge>;
                            })}
                        </div>
                    }
                </div>
            </CardContent>
        </Card>
    );
};

SnippetModal.displayName = "SnippetModal";
