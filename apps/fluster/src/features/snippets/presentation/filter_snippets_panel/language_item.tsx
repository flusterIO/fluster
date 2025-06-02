import { getSupportedProgrammingLanguages } from "#/snippets/data/get_supported_languages";
import {
    SnippetActions,
    useSnippetContext,
    useSnippetDispatch,
} from "#/snippets/state/snippet_context";
import { Checkbox } from "@fluster.io/dev";
import React, { useCallback, type ReactNode } from "react";

interface LanguageFilterItemProps {
    lang: string;
}

const isAll = (data: Record<string, boolean>): boolean => {
    for (const k in data) {
        if (!data[k]) {
            return false;
        }
    }
    return true;
};

const LanguageFilterItem = ({ lang }: LanguageFilterItemProps): ReactNode => {
    const context = useSnippetContext();
    const dispatch = useSnippetDispatch();

    const toggleLang = useCallback(() => {
        if (lang === "All") {
            const m: Record<string, boolean> = {};
            const newVal =
                lang in context.languageFilter ? !context.languageFilter[lang] : false;
            const langs = getSupportedProgrammingLanguages();
            for (const newLang of langs) {
                m[newLang] = newVal;
            }
            m.All = newVal;
            dispatch({
                type: SnippetActions.setLanguageFilters,
                payload: m,
            });
            return;
        }
        const payload = {
            ...context.languageFilter,
            [lang]: !context.languageFilter[lang],
        };
        console.log("payload: ", payload);
        dispatch({
            type: SnippetActions.setLanguageFilters,
            payload,
        });
        window.dispatchEvent(
            new CustomEvent("reload-snippet-list", {
                detail: {
                    langs: payload,
                },
            })
        );
    }, [context.languageFilter]);

    return (
        <div className="w-full grid grid-cols-[64px_1fr] border-b">
            <div className="w-full h-full flex justify-center items-center">
                <Checkbox
                    checked={
                        lang === "All"
                            ? isAll(context.languageFilter)
                            : context.languageFilter[lang]
                    }
                    onClick={toggleLang}
                />
            </div>
            <div>{lang}</div>
        </div>
    );
};

LanguageFilterItem.displayName = "LanguageFilterItem";

export default LanguageFilterItem;
