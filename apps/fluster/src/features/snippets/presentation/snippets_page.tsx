import PanelContainer from "@/components/util/panel_container";
import { type ReactNode } from "react";
import { SnippetProvider } from "../state/snippets_provider";
import SnippetsResultsList from "./snippets_results_list";

const SnippetsPage = (): ReactNode => {
    return (
        <SnippetProvider>
            <PanelContainer>
                <SnippetsResultsList />
            </PanelContainer>
        </SnippetProvider>
    );
};

SnippetsPage.displayName = "SnippetsPage";

export default SnippetsPage;
