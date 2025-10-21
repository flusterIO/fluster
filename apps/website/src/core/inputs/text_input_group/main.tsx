import React, { type ComponentProps, type ReactNode } from "react";
import { Input } from "../../shad/ui/input";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../shad/ui/form";
import { FormInputProps } from "../types";
import { FieldValues } from "react-hook-form";
import { cn } from "#/core/utils/cn";

interface TextInputGroupProps<T extends FieldValues> extends FormInputProps<T> {
    inputProps?: Omit<
        ComponentProps<typeof Input>,
        "onChange" | "value" | "className"
    >;
    ids?: {
        formItem?: string;
        container?: string;
        input?: string;
    };
    classes?: {
        formItem?: string;
        container?: string;
        input?: string;
        label?: string;
    };
}

export const TextInputGroup = <T extends FieldValues>({
    form,
    label,
    name,
    desc,
    classes = {},
    ids = {},
    inputProps,
}: TextInputGroupProps<T>): ReactNode => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem
                        id={ids.formItem}
                        className={cn("w-full max-w-[600px]", classes.formItem)}
                    >
                        <FormLabel className={cn("mb-0", classes.label)}>{label}</FormLabel>
                        <FormControl>
                            <div
                                id={ids.container}
                                className={cn("w-full max-w-[600px] mt-2", classes.container)}
                            >
                                <Input
                                    {...inputProps}
                                    value={field.value}
                                    id={ids.input}
                                    onChange={(e) =>
                                        form.setValue(
                                            name,
                                            e.target.value as Parameters<typeof form.setValue>[1]
                                        )
                                    }
                                    className={classes.input}
                                />
                                {desc?.length ? (
                                    <FormDescription className="mt-2">{desc}</FormDescription>
                                ) : null}
                                <FormMessage />
                            </div>
                        </FormControl>
                    </FormItem>
                );
            }}
        />
    );
};

TextInputGroup.displayName = "TextInputGroup";
