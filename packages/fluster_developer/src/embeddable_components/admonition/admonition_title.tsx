import React, { type ReactNode } from "react";
import AdmonitionVariantIcon from "./variant_icon";
import { getTitleVariantClasses } from "./utils";
import { AdmonitionTitleProps } from "./types";
import { cn } from "../../utils/cn";

interface Props extends AdmonitionTitleProps {
    children: ReactNode;
}

const AdmonitionTitle = (props: Props): ReactNode => {
    return (
        <div
            className={cn(
                "w-full px-4 py-2 rounded-tl rounded-tr relative",
                getTitleVariantClasses(props.type)
            )}
        >
            <AdmonitionVariantIcon
                className="inline-block mr-2"
                variant={props.type}
            />
            <span className="w-full">{props.children}</span>
        </div>
    );
};

AdmonitionTitle.displayName = "AdmonitionTitle";

export default AdmonitionTitle;
