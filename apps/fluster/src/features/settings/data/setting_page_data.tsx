import { Book, Code, FunctionSquareIcon, Settings } from "lucide-react";

export enum CategoryId {
    general = "General",
    code = "Code",
    bib = "Bibliography",
    math = "Math",
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
        label: "Bibliography",
        category_id: CategoryId.bib,
        icon: Book,
    },
    {
        label: "Code",
        category_id: CategoryId.code,
        icon: Code,
    },
    {
        label: "Math",
        category_id: CategoryId.math,
        icon: FunctionSquareIcon,
    },
];
