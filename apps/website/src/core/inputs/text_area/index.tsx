import React, { type ReactNode } from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../shad/ui/form";
import { Textarea } from "../../shad/ui/textarea";
import { FormInputProps } from "../types";
import { FieldValues } from "react-hook-form";
import { cn } from "#/core/utils/cn";

interface TextAreaInputProps<T extends FieldValues> extends FormInputProps<T> {
    classes?: {
        formItem?: string;
        textArea?: string;
        container?: string;
        label?: string;
    };
    placeholder?: string;
    rows?: number;
}

export const TextAreaInput = <T extends FieldValues>({
    label,
    form,
    name,
    desc,
    rows = 4,
    placeholder,
    classes = {},
}: TextAreaInputProps<T>): ReactNode => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem className={cn("w-full max-w-[600px]", classes.formItem)}>
                        <FormLabel className={cn("mb-0", classes.label)}>{label}</FormLabel>
                        <FormControl>
                            <div
                                className={cn("w-full max-w-[600px] mt-2", classes.container)}
                            >
                                <Textarea
                                    value={field.value}
                                    placeholder={placeholder}
                                    onChange={(e) =>
                                        form.setValue(
                                            field.name,
                                            e.target.value as Parameters<typeof form.setValue>[1]
                                        )
                                    }
                                    rows={rows}
                                    className={classes.textArea}
                                />
                                {desc?.length ? (
                                    <FormDescription>{desc}</FormDescription>
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

TextAreaInput.displayName = "TextAreaInput";
