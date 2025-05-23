import PanelContainer from "@/components/util/panel_container";
import { type ReactNode } from "react";
import { SnippetProvider } from "../state/snippets_provider";

const SnippetsPage = (): ReactNode => {
  return (
    <SnippetProvider>
      <PanelContainer>Snippets</PanelContainer>
    </SnippetProvider>
  );
};

SnippetsPage.displayName = "SnippetsPage";

export default SnippetsPage;
