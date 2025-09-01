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
import { FieldValues, PathValue } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../shad/select";
import { cn } from "../../../../utils/cn";

export interface SelectOption<J extends string | number> {
    label: string;
    value: J;
}

export interface GeneralSelectInputProps<
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
    ids?: {
        trigger?: string;
    };
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
    ids = {},
}: GeneralSelectInputProps<T, J>): ReactNode => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={classes.formItem}>
                    <FormLabel className={classes.label}>{label}</FormLabel>
                    <Select
                        value={field.value}
                        onValueChange={(val) => {
                            if (typeof items[0].value === "string") {
                                form.setValue(
                                    field.name,
                                    val as PathValue<T, typeof field.name>
                                );
                            } else {
                                form.setValue(
                                    field.name,
                                    parseFloat(val) as PathValue<T, typeof field.name>
                                );
                            }
                        }}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger id={ids.trigger} className={classes.selectTrigger}>
                                <SelectValue
                                    className={classes.selectValue}
                                    placeholder={placeholder}
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className={classes.selectContent}>
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
                        </SelectContent>
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
