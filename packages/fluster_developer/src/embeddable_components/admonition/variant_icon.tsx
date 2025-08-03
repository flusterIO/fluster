import React, { type ReactNode } from "react";
import { AdmonitionVariant } from "./types";
import { CircleCheck, Hand, Info, TriangleAlertIcon } from "lucide-react";

interface AdmonitionVariantIconProps {
    variant: AdmonitionVariant;
    className?: string;
}

const AdmonitionVariantIcon = (
    props: AdmonitionVariantIconProps
): ReactNode => {
    switch (props.variant) {
        case "info":
            return <Info className={props.className} />;
        case "warn":
            return <TriangleAlertIcon className={props.className} />;
        case "error":
            return <Hand className={props.className} />;
        case "success":
            return <CircleCheck className={props.className} />;
        case "primary":
            return <Info className={props.className} />;
    }
};

AdmonitionVariantIcon.displayName = "AdmonitionVariantIcon";

export default AdmonitionVariantIcon;
