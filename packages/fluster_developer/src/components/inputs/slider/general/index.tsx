import React, { ComponentProps, type ReactNode } from "react";
import { FormInputProps } from "../../types";
import { FieldValues } from "react-hook-form";
import {
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../shad/form";
import { Slider } from "../../../shad/slider";
import { cn } from "../../../../utils/cn";

interface GeneralSliderProps<T extends FieldValues> extends FormInputProps<T> {
    classes?: {
        formItem?: string;
        label?: string;
        desc?: string;
    };
    sliderProps?: Omit<ComponentProps<typeof Slider>, "value" | "onValueChange">;
    showValue?: boolean;
}

export const GeneralSlider = <T extends FieldValues>({
    label,
    desc,
    form,
    name,
    classes = {},
    sliderProps,
    showValue,
}: GeneralSliderProps<T>): ReactNode => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={classes.formItem}>
                    {showValue ? (
                        <div className="w-full relative">
                            <FormLabel className={cn("inline pr-8", classes.label)}>
                                {label}
                            </FormLabel>
                            <span className="absolute right-0 text-muted-foreground text-sm">
                                {form.watch(name)}
                            </span>
                        </div>
                    ) : (
                        <FormLabel className={classes.label}>{label}</FormLabel>
                    )}
                    <Slider
                        {...sliderProps}
                        value={
                            typeof field.value === "number" ? [field.value] : field.value
                        }
                        onValueChange={(c) =>
                            form.setValue(name, c as Parameters<typeof form.setValue>[1])
                        }
                    />
                    {desc?.length && (
                        <FormDescription className={classes.desc}>{desc}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

GeneralSlider.displayName = "GeneralSlider";
