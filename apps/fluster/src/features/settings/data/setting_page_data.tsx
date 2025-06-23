import { Book, Code, Settings } from "lucide-react";

export enum CategoryId {
    general = "General",
    code = "Code",
    bib = "Bibliography",
}

export interface SettingPageData {
    label: string;
    category_id: CategoryId;
    icon: typeof Settings;
}

export const settingPages: SettingPageData[] = [
    {
        label: "General",
        category_id: CategoryId.general,
        icon: Settings,
    },
    {
        label: "Code",
        category_id: CategoryId.code,
        icon: Code,
    },

    {
        label: "Bibliography",
        category_id: CategoryId.bib,
        icon: Book,
    },
];
