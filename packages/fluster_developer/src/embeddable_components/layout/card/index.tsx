import React, { FC, HTMLProps, type ReactNode } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/shad/card";

export interface EmbeddableCardProps extends HTMLProps<HTMLDivElement> {
    title?: string;
    desc?: string;
    InlineMdxContent: FC<{ mdx: string }>;
}

export const EmbeddableCard = ({
    title,
    desc,
    children,
    InlineMdxContent,
}: EmbeddableCardProps): ReactNode => {
    return (
        <Card className="gap-0">
            {Boolean(title || desc) && (
                <CardHeader>
                    {title && (
                        <CardTitle>
                            <InlineMdxContent mdx={title} />
                        </CardTitle>
                    )}
                    {desc && (
                        <CardDescription>
                            <InlineMdxContent mdx={desc} />
                        </CardDescription>
                    )}
                </CardHeader>
            )}
            <CardContent>{children}</CardContent>
        </Card>
    );
};

EmbeddableCard.displayName = "EmbeddableCard";
