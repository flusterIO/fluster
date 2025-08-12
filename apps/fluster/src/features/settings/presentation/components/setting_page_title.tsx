import { cn, H3 } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

interface SettingPageTitleProps {
  title: string;
  subtitle?: string;
  subtitleClasses?: string;
}

export const SettingPageTitle = (props: SettingPageTitleProps): ReactNode => {
  return (
    <div className="w-full h-fit mb-8">
      <H3>{props.title}</H3>
      {props.subtitle && (
        <p className={cn("text-muted-foreground", props.subtitleClasses)}>
          {props.subtitle}
        </p>
      )}
    </div>
  );
};

SettingPageTitle.displayName = "SettingPageTitle";
