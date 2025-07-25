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
    InlineMdxContent: FC<{ mdx: string; abortIfNoMath?: boolean }>;
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
                        <CardTitle className="[&_p]:font-semibold [&_p]:leading-none">
                            <InlineMdxContent abortIfNoMath mdx={title} />
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
