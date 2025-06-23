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

interface GeneralSliderProps<T extends FieldValues> extends FormInputProps<T> {
  classes?: {
    formItem?: string;
    label?: string;
    desc?: string;
  };
  sliderProps?: ComponentProps<typeof Slider>;
}

export const GeneralSlider = <T extends FieldValues>({
  label,
  desc,
  form,
  name,
  classes = {},
}: GeneralSliderProps<T>): ReactNode => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={classes.formItem}>
          <FormLabel className={classes.label}>{label}</FormLabel>
          <Slider
            value={field.value}
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
