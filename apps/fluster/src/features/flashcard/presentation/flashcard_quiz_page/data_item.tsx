import { Card, CardContent } from "@fluster.io/dev";
import React, { FC, type ReactNode } from "react";

interface FlashcardQuizDataItemProps {
    title: string;
    body: string;
    Icon?: FC<{ className?: string }>;
}

export const FlashcardQuizDataItem = ({
    title,
    body,
    Icon,
}: FlashcardQuizDataItemProps): ReactNode => {
    return (
        <Card className="rounded-lg border w-full h-full shadow">
            <CardContent>
                <div className="font-thin">{title}</div>
                <div className="flex flex-row justify-start items-center gap-2">
                    {Icon ? <Icon className="w-4 h-4" /> : null}
                    <div className="font-bold text-xl">{body}</div>
                </div>
            </CardContent>
        </Card>
    );
};

FlashcardQuizDataItem.displayName = "FlashcardQuizDataItem";
