import React, { useMemo, type ReactNode } from "react";
import { Checkbox } from "../../shad/checkbox";
import { Label } from "../../shad/label";
import { FormInputProps } from "../types";
import { FieldValues, PathValue } from "react-hook-form";
import { H4 } from "../../typography/typography";

type ValidValue = number | string;

export interface CheckboxGroupItem<J extends ValidValue> {
    label: ReactNode;
    desc: ReactNode;
    value: J;
}

interface CheckboxGroupProps<T extends FieldValues, J extends ValidValue>
    extends FormInputProps<T> {
    items: CheckboxGroupItem<J>[];
}


export const CheckboxGroup = <T extends FieldValues, J extends ValidValue>(
    props: CheckboxGroupProps<T, J>
): ReactNode => {
    return (
        <div className="w-full flex flex-col">
            <H4 className={props.desc ? "mb-2" : "mb-4"}>{props.label}</H4>
            {props.desc ? (
                <p className="text-sm text-muted-foreground mb-4">{props.desc}</p>
            ) : null}
            <div className="w-full flex flex-col gap-6">
                {props.items.map((item) => {
                    return (
                        <div
                            key={`checkbox-item-${item.label}-${item.value}`}
                            className="flex items-start gap-3"
                        >
                            <Checkbox
                                id="terms-2"
                                checked={props.form.watch(props.name) === item.value}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        props.form.setValue(
                                            props.name,
                                            item.value as PathValue<T, typeof props.name>
                                        );
                                    }
                                }}
                            />
                            <div className="grid gap-2">
                                <Label htmlFor="terms-2">{item.label}</Label>
                                {item.desc ? (
                                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                                ) : null}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

CheckboxGroup.displayName = "CheckboxGroup";
