import {
    FLASHCARD_LOCAL_STORAGE_ID,
    FlashcardLocalStorageData,
} from "#/flashcard/data/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useFlashcardLocalStorageIds = () => {
    const [sp] = useSearchParams();
    const byLocalStorage = sp.get("by_local_storage");
    const [data, setData] = useState<string[] | null>(null);

    useEffect(() => {
        if (byLocalStorage === "true") {
            const _data = window.localStorage.getItem(FLASHCARD_LOCAL_STORAGE_ID);
            if (_data) {
                const d = JSON.parse(_data) as FlashcardLocalStorageData;
                return setData(d.ids);
            }
        }
        setData(null);
    }, [byLocalStorage]);

    return data;
};
