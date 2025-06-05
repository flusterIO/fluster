import { CategoryId } from "#/settings/data/setting_page_data";
import React, { type ReactNode } from "react";
import { useSearchParams } from "react-router";
import GeneralSettingsPage from "./pages/general";
import CodeSettingsPage from "./pages/code";
import { BibliographySettingsPage } from "./pages/bib";

const SettingsPageContentSwitch = (): ReactNode => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("category") ?? CategoryId.general;
  switch (id) {
    case CategoryId.general:
      return <GeneralSettingsPage />;
    case CategoryId.code:
      return <CodeSettingsPage />;
    case CategoryId.bib:
      return <BibliographySettingsPage />;
  }
};

SettingsPageContentSwitch.displayName = "SettingsPageContentSwitch";

export default SettingsPageContentSwitch;
