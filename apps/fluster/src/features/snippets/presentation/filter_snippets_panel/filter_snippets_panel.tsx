import { getSupportedProgrammingLanguages } from "#/snippets/data/get_supported_languages";
import SidePanelContainer from "@/components/side_panel_container";
import { useMemo, type ReactNode } from "react";
import LanguageFilterItem from "./language_item";

const SnippetsFilterPanel = (): ReactNode => {
    const languages = useMemo(
        () => ["All", ...getSupportedProgrammingLanguages()],
        []
    );
    return (
        <SidePanelContainer label="Filter Snippets">
            <div className="flex flex-col justify-start items-center gap-2 w-full max-w-[600px]">
                {languages.map((k) => (
                    <LanguageFilterItem lang={k} key={`cmd-item-${k}`} />
                ))}
            </div>
        </SidePanelContainer>
    );
};

SnippetsFilterPanel.displayName = "SnippetsFilterPanel";

export default SnippetsFilterPanel;
