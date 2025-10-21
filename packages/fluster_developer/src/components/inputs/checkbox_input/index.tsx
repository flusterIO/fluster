import React, { type ReactNode } from "react";
import { FieldValues, PathValue } from "react-hook-form";
import { FormInputProps } from "../types";
import { Checkbox } from "../../shad/checkbox";
import { Label } from "../../shad/label";
import { cn } from "../../../utils/cn";

interface CheckboxInputProps<T extends FieldValues> extends FormInputProps<T> {
    label: ReactNode;
    classes?: {
        container?: string;
        checkbox?: string;
    };
}

export const CheckboxInput = <T extends FieldValues>(
    props: CheckboxInputProps<T>
): ReactNode => {
    return (
        <div className={cn("flex items-start gap-3", props.classes?.container)}>
            <Checkbox
                id="terms-2"
                className={cn("border border-foreground/30", props.classes?.checkbox)}
                checked={props.form.watch(props.name)}
                onCheckedChange={(checked) => {
                    props.form.setValue(
                        props.name,
                        checked as PathValue<T, typeof props.name>
                    );
                }}
            />
            <div className="grid gap-2">
                <Label htmlFor="terms-2">{props.label}</Label>
                {props.desc ? (
                    <p className="text-muted-foreground text-sm">{props.desc}</p>
                ) : null}
            </div>
        </div>
    );
};

CheckboxInput.displayName = "CheckboxInput";
