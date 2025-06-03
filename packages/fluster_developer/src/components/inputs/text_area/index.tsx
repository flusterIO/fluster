import React, { type ReactNode } from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../shad/form";
import { Textarea } from "../../shad/textarea";
import { FormInputProps } from "../types";
import { FieldValues } from "react-hook-form";
import { cn } from "../../../utils/cn";

interface TextAreaInputProps<T extends FieldValues> extends FormInputProps<T> {
    classes?: {
        formItem?: string;
        textArea?: string;
        container?: string;
    };
    rows?: number;
}

export const TextAreaInput = <T extends FieldValues>({
    label,
    form,
    name,
    desc,
    rows = 4,
    classes = {},
}: TextAreaInputProps<T>): ReactNode => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem className={cn("w-full max-w-[600px]", classes.formItem)}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <div className={cn("w-full max-w-[600px]", classes.container)}>
                                <Textarea
                                    value={field.value}
                                    onChange={(e) =>
                                        form.setValue(field.name, e.target.value as any)
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
