import React, { type ReactNode } from "react";
import { FieldValues, PathValue } from "react-hook-form";
import { FormInputProps } from "../types";
import { Switch } from "../../shad/switch";
import { cn } from "../../../utils/cn";

interface SwitchInputProps<T extends FieldValues> extends FormInputProps<T> {
    classes?: {
        container?: string;
        switch?: string;
        title?: string;
        desc?: string;
        titleContainer?: string;
    };
}

export const SwitchInput = <T extends FieldValues>({
    form,
    name,
    label,
    desc,
    classes = {},
}: SwitchInputProps<T>): ReactNode => {
    const value = form.watch(name) as boolean;
    return (
        <div
            className={cn(
                "w-full p-4 rounded border bg-card text-card-foreground grid grid-cols-[auto_1fr] gap-x-8",
                classes.container
            )}
        >
            <div className="h-full w-fit flex flex-col justify-center items-center">
                <Switch
                    checked={value}
                    onCheckedChange={(newChecked) =>
                        form.setValue(name, newChecked as PathValue<T, typeof name>)
                    }
                />
            </div>
            <div
                className={cn(
                    "w-full flex flex-col justify-start items-start",
                    classes.titleContainer
                )}
            >
                <div className={cn("font-semibold", classes.title)}>{label}</div>
                {desc && (
                    <div className={cn("text-sm text-muted-foreground", classes.desc)}>
                        {desc}
                    </div>
                )}
            </div>
        </div>
    );
};

SwitchInput.displayName = "SwitchInput";
