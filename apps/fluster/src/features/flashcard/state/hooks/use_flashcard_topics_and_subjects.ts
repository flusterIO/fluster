import { commands, FlashcardTopicSubjectData } from "@/lib/bindings";
import { showToast, useEventListener } from "@fluster.io/dev";
import { useEffect, useState } from "react";

export const useFlashcardTopicsAndSubjects = () => {
    const [data, setData] = useState<FlashcardTopicSubjectData>({
        topics: [],
        subjects: [],
    });

    const getData = async (): Promise<void> => {
        const res = await commands.getFlashcardTopicsAndSubjects();
        if (res.status === "ok") {
            setData(res.data);
        } else {
            showToast({
                title: "Something went wrong",
                body: "Fluster could not gather the necessary data. If this persists, please file an issue on Github.",
                variant: "Error",
                duration: 5000,
            });
            setData({
                topics: [],
                subjects: [],
            });
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEventListener("database-sync-success", getData);
    useEventListener("flashcard-save-success", getData);

    return data;
};
