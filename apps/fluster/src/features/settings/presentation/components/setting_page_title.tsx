import { H3 } from "@/components/typography/typography";
import React, { type ReactNode } from "react";

interface SettingPageTitleProps {
    title: string;
    subtitle?: string;
}

export const SettingPageTitle = (props: SettingPageTitleProps): ReactNode => {
    return (
        <div className="w-full h-fit mb-8">
            <H3>{props.title}</H3>
            {props.subtitle && <p>{props.subtitle}</p>}
        </div>
    );
};

SettingPageTitle.displayName = "SettingPageTitle";
