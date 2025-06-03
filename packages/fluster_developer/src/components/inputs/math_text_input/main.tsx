"use client";
import React, { type ReactNode } from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../shad/form";
import { type FormInputProps } from "../types";
import { type FieldValues } from "react-hook-form";
import { EditableMathField, addStyles } from "react-mathquill";

export type MathTextInputProps<T extends FieldValues> = FormInputProps<T> & {
    classes?: {
        formItem?: string;
    };
};

/**
 * This plays the traditional role of a text input (not textarea) that uses the mathquill library to allow more natural writing of latex equations.
 */
export const MathTextInput = <T extends FieldValues>(
    props: MathTextInputProps<T>
): ReactNode => {
    addStyles();
    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem className={props.classes?.formItem}>
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <EditableMathField
                            className="px-2 py-4"
                            latex={field.value}
                            onChange={(mathField) => {
                                /* eslint-disable-next-line  --  */
                                props.form.setValue(props.name, mathField.latex() as any);
                            }}
                        />
                    </FormControl>
                    {props.desc && <FormDescription>{props.desc}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

MathTextInput.displayName = "MathTextInput";
