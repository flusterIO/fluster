import { type ReactNode } from "react";
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
import { EditableMathField } from "react-mathquill";

export type MathTextInputProps<T extends FieldValues> = FormInputProps<T>;

/**
 * This plays the traditional role of a text input (not textarea) that uses the mathquill library to allow more natural writing of latex equations.
 */
export const MathTextInput = <T extends FieldValues>(
    props: MathTextInputProps<T>
): ReactNode => {
    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <EditableMathField
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
