import React, { type ReactNode } from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../shad/form";
import { FormInputProps } from "../../types";
import { FieldValues } from "react-hook-form";
import {
    Select,
    SelectContentNoPortal,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../shad/select";
import { cn } from "../../../../utils/cn";

export interface SelectOption<J extends string | number> {
    label: string;
    value: J;
}

interface GeneralSelectInputProps<
    T extends FieldValues,
    J extends string | number
> extends FormInputProps<T> {
    classes?: {
        label?: string;
        selectValue?: string;
        selectItem?: string;
        desc?: string;
        formItem?: string;
        selectTrigger?: string;
        selectContent?: string;
    };
    placeholder: string;
    items: SelectOption<J>[];
}

export const GeneralSelectInput = <
    T extends FieldValues,
    J extends string | number
>({
    form,
    name,
    desc,
    label,
    items,
    placeholder,
    classes = {},
}: GeneralSelectInputProps<T, J>): ReactNode => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={classes.formItem}>
                    <FormLabel className={classes.label}>{label}</FormLabel>
                    <Select
                        onValueChange={(val) => {
                            if (typeof items[0].value === "string") {
                                return val;
                            } else {
                                return parseFloat(val);
                            }
                        }}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className={classes.selectTrigger}>
                                <SelectValue
                                    className={classes.selectValue}
                                    placeholder={placeholder}
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContentNoPortal className={classes.selectContent}>
                            {items.map((x) => {
                                return (
                                    <SelectItem
                                        key={x.value}
                                        value={
                                            typeof x.value === "number" ? x.value.toString() : x.value
                                        }
                                        className={cn("text-foreground", classes.selectItem)}
                                    >
                                        {x.label}
                                    </SelectItem>
                                );
                            })}
                        </SelectContentNoPortal>
                    </Select>
                    {desc?.length && (
                        <FormDescription className={classes.desc}>{desc}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

GeneralSelectInput.displayName = "GeneralSelectInput";
