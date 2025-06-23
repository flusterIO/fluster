import React, { type ReactNode } from "react";
import AdmonitionVariantIcon from "./variant_icon";
import { getTitleVariantClasses } from "./utils";
import { AdmonitionTitleProps } from "./types";
import { cn } from "../../utils/cn";

interface Props extends AdmonitionTitleProps {
  children: ReactNode;
}

export const admonitionTitleIconClasses =
  "inline-block mr-2 mt-[0.4rem] float-left w-4 h-4";

const AdmonitionTitle = (props: Props): ReactNode => {
  return (
    <div
      className={cn(
        "w-full pl-2 pr-4 py-2 rounded-tl rounded-tr relative z-[1]",
        getTitleVariantClasses(props.type)
      )}
    >
      <AdmonitionVariantIcon
        className={admonitionTitleIconClasses}
        variant={props.type}
      />
      <span className="w-full">{props.children}</span>
    </div>
  );
};

AdmonitionTitle.displayName = "AdmonitionTitle";

export default AdmonitionTitle;
