import { getSupportedProgrammingLanguages } from "#/snippets/data/get_supported_languages";
import {
    SnippetActions,
    useSnippetContext,
    useSnippetDispatch,
} from "#/snippets/state/snippets_provider";
import { Checkbox } from "@fluster/dev";
import { type ReactNode } from "react";

interface LanguageFilterItemProps {
    lang: string;
}

const LanguageFilterItem = ({ lang }: LanguageFilterItemProps): ReactNode => {
    const context = useSnippetContext();
    const dispatch = useSnippetDispatch();

    const toggleLang = (): void => {
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
        dispatch({
            type: SnippetActions.setLanguageFilters,
            payload: {
                ...context.languageFilter,
                [lang]:
                    lang in context.languageFilter
                        ? !context.languageFilter[lang]
                        : false,
            },
        });
    };
    return (
        <div className="w-full grid grid-cols-[64px_1fr] border-b">
            <div className="w-full h-full flex justify-center items-center">
                <Checkbox
                    checked={
                        lang in context.languageFilter ? context.languageFilter[lang] : true
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
