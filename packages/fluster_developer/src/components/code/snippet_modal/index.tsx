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
        <Card className="bg-background flex flex-col justify-center items-start @[800px]:flex-row @[800px]:grid @[800px]:grid-cols-[1fr_2fr] w-[min(768px,90%)]">
            <CardHeader className="w-full @[800px]:w-fit @[800px]:min-w-[200px]">
                <CardTitle>{data.label}</CardTitle>
                {data.desc?.length ? (
                    <CardDescription>{data.desc}</CardDescription>
                ) : null}
            </CardHeader>
            <CardContent className="w-full @[800px]:flex-grow">
                <div className="flex flex-col justify-start items-center">
                    <CodeBlock
                        lang={data.lang}
                        code={data.body}
                        themes={themes}
                        darkMode={darkMode}
                        className="max-h-[400px] overflow-y-auto"
                    />
                    {
                        <div className="w-full flex flex-row justify-start items-center gap-x-4 gap-y-2 flex-wrap mt-4">
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
