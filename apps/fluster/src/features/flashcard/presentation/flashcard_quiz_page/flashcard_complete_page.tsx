import {
    useFlashcardQuizContext,
    useFlashcardQuizDispatch,
} from "#/flashcard/state/context/flashcard_quiz_context/context";
import { Button, H1 } from "@fluster.io/dev";
import { CheckCircle, RotateCcw } from "lucide-react";
import React, { type ReactNode } from "react";

const DataCard = ({
    body,
    title,
}: {
    body: string;
    title: string;
}): ReactNode => {
    return (
        <div className="bg-primary/20 px-6 py-3 w-full h-full rounded-2xl">
            <div className="flex flex-col justify-center items-center">
                <div className="text-lg font-bold">{body}</div>
                <div className="text-foreground/70">{title}</div>
            </div>
        </div>
    );
};

export const FlashcardQuizCompletePage = (): ReactNode => {
    const { activeIndex, ids, correct_count } = useFlashcardQuizContext();
    const dispatch = useFlashcardQuizDispatch();
    if (activeIndex < ids.length) {
        return null;
    }
    const greetings = [
        "Great job studying hard.",
        "Great job studying!",
        "You're doing amazing!",
        "Keep up the fantastic work!",
        "Awesome effort!",
        "You're a study superstar!",
        "Brilliant progress!",
        "Way to go, scholar!",
        "Fantastic dedication!",
        "You're crushing it!",
        "Excellent focus!",
        "Studying pays off!",
        "So proud of your effort!",
        "You're learning so much!",
        "Keep that brain active!",
        "Smart work!",
        "Your hard work shines!",
        "Making great strides!",
        "You're a true learner!",
        "Inspiring dedication!",
        "Keep growing!",
    ];
    return (
        <div className="flex flex-col justify-center items-center border shadow rounded-2xl py-6 px-5">
            <div className="bg-primary/30 rounded-full">
                <CheckCircle className="text-primary p-2 w-16 h-16" />
            </div>
            <H1>Quiz Complete</H1>
            <div className="text-foreground/70">
                {greetings[Math.floor(Math.random() * greetings.length)]}
            </div>
            <div className="grid grid-cols-3 gap-x-4 mt-3">
                <DataCard title="Total Cards" body={`${ids.length}`} />
                <DataCard title="Correct" body={`${correct_count}`} />
                <DataCard
                    title="Accuracy"
                    body={`${Math.round((correct_count / ids.length) * 100)}%`}
                />
            </div>
            <Button
                className="w-full mt-4"
                onClick={() =>
                    dispatch({
                        type: "restart_quiz",
                        payload: undefined,
                    })
                }
            >
                <RotateCcw />
                Restart
            </Button>
        </div>
    );
};

FlashcardQuizCompletePage.displayName = "FlashcardQuizCompletePage";
