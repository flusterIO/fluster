import React, { type ComponentProps, type ReactNode } from "react";
import { Input } from "../../shad/input";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../shad/form";
import { FormInputProps } from "../types";
import { FieldValues } from "react-hook-form";
import { cn } from "../../../utils/cn";

interface TextInputGroupProps<T extends FieldValues> extends FormInputProps<T> {
    inputProps?: Omit<ComponentProps<typeof Input>, "onChange" | "value">;
    classes?: {
        formItem?: string;
        container?: string;
        input?: string;
    };
}

export const TextInputGroup = <T extends FieldValues>({
    form,
    label,
    name,
    desc,
    classes = {},
}: TextInputGroupProps<T>): ReactNode => {
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
                                <Input
                                    id={"equation-name-input"}
                                    value={field.value}
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
