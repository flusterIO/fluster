import React, { type ReactNode } from "react";
import DesktopSettingsSidebar from "./components/settings_sidebar";
import SettingsPageContentSwitch from "./components/settings_page_content_switch";

const SettingsPage = (): ReactNode => {
    return (
        <div className="w-full h-full flex flex-row justify-center items-center">
            <DesktopSettingsSidebar />
            <div className="flex-grow w-full h-full flex flex-col justify-start items-start overflow-y-auto px-6 md:px-8 py-8">
                <SettingsPageContentSwitch />
            </div>
        </div>
    );
};

SettingsPage.displayName = "SettingsPage";

export default SettingsPage;
