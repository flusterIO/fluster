import { CategoryId } from "#/settings/data/setting_page_data";
import React, { type ReactNode } from "react";
import { useSearchParams } from "react-router";
import GeneralSettingsPage from "./pages/general";
import CodeSettingsPage from "./pages/code";

const SettingsPageContentSwitch = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("category") ?? CategoryId.general;
    switch (id) {
        case CategoryId.general:
            return <GeneralSettingsPage />;
        case CategoryId.code:
            return <CodeSettingsPage />;
    }
    return <div></div>;
};

SettingsPageContentSwitch.displayName = "SettingsPageContentSwitch";

export default SettingsPageContentSwitch;
