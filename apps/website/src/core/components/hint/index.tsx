import React, { HTMLProps, useMemo } from "react";
import clsx from "clsx";
import { cn } from "#/core/utils/cn";

enum booleanValueLabels {
    developer = "Developers",
    note = "Note",
    alias = "Alias",
    estimatedTime = "Estimated Time",
}

type K = { [K in keyof typeof booleanValueLabels]?: boolean };

interface HintProps extends HTMLProps<HTMLDivElement>, K {
    label?: string;
}

export const Hint = ({ children, label: _label, ...props }: HintProps) => {
    console.log("props: ", props);
    const k = useMemo((): keyof typeof booleanValueLabels | null => {
        if (props.developer) {
            return "developer";
        }
        if (props.note) {
            return "note";
        }
        if (props.alias) {
            return "alias";
        }
        if (props.estimatedTime) {
            return "estimatedTime";
        }
        return null;
    }, [props]);
    const classes: Record<string, string> = {
        [booleanValueLabels.alias]: "text-violet-500 dark:text-violet-400",
        [booleanValueLabels.developer]: "text-orange-500 dark:text-orange-400",
        Hint: "text-hint",
    };
    const label = _label ? _label : k ? booleanValueLabels[k] : "Hint";
    /* eslint-disable-next-line  --  */
    const { developer, alias, note, estimatedTime, ..._props } = props;
    return (
        <div {..._props} className={cn("text-sm mb-6", props.className)}>
            <span className={clsx("font-bold", classes[label])}>{`${label}:`}</span>
            <span className={"text-sm pl-2 [&_*]:inline whitespace-break-spaces"}>
                {children}
            </span>
        </div>
    );
};

Hint.displayName = "Hint";
