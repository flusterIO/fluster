import { FlashcardDataSchema } from "#/flashcard/data/add_flashcard_schema";
import { FlashcardMode } from "#/flashcard/data/types";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { TagBadge } from "#/search/presentation/utils/tag_badge";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    cn,
} from "@fluster.io/dev";
import React, { type ReactNode } from "react";

interface QuestionCardProps {
    isPreview?: boolean;
    item: FlashcardDataSchema;
    classes?: {
        card?: string;
    };
}

export const QuestionCard = ({
    item,
    isPreview,
    classes = {},
}: QuestionCardProps): ReactNode => {
    const handleViewAnswer = (): void => {
        window.dispatchEvent(
            new CustomEvent("set-flashcard-preview-mode", {
                detail: "answer" satisfies FlashcardMode,
            })
        );
    };
    return (
        <Card
            className={cn(
                "w-full max-w-[min(768px,90%)] max-h-[min(80vh,768px)]",
                classes.card
            )}
        >
            <CardHeader>
                <CardTitle>
                    <InlineMdxContent abortIfNoMath mdx={item.label} />
                    {item.question_description.length ? (
                        <CardDescription className="mt-1">
                            <InlineMdxContent abortIfNoMath mdx={item.question_description} />
                        </CardDescription>
                    ) : null}
                    {item.tags.length ? (
                        <div className="flex flex-row justify-start items-center gap-x-4 gap-y-2 flex-wrap mt-2">
                            {item.tags.map((tag) => {
                                return <TagBadge tagValue={tag} />;
                            })}
                        </div>
                    ) : null}
                </CardTitle>
                <CardContent className="overflow-y-auto overflow-x-hidden">
                    <InlineMdxContent mdx={item.question} />
                </CardContent>
            </CardHeader>
            <CardFooter className="flex flex-row justify-end items-center gap-x-4">
                {isPreview ? null : <Button variant={"secondary"}>Next</Button>}
                <Button onClick={handleViewAnswer}>View Answer</Button>
            </CardFooter>
        </Card>
    );
};

QuestionCard.displayName = "QuestionCard";
