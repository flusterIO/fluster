import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../shad/form";
import { Input } from "../../shad/input";
import React, { useState, type ReactNode } from "react";
import { FieldValues } from "react-hook-form";
import { Badge } from "../../shad/badge";
import { FormInputProps } from "../types";
import { cn } from "../../../utils/cn";

interface TagInputProps<T extends FieldValues> extends FormInputProps<T> {
    classes?: {
        formItem?: string;
        input?: string;
        tagList?: string;
    };
    placeholder?: string;
}

export const TagInput = <T extends FieldValues>({
    classes = {},
    label = "Tags",
    form,
    name,
    desc,
    placeholder = "Homework",
}: TagInputProps<T>): ReactNode => {
    const [inputValue, setInputValue] = useState("");
    const items = form.watch(name);
    const appendItem = (): void => {
        form.setValue(name, [...items, inputValue] as Parameters<
            typeof form.setValue
        >[1]);
        setInputValue("");
    };
    const removeItemByIndex = (idx: number): void => {
        form.setValue(
            name,
            items.filter((_: string, i: number) => i !== idx)
        );
    };
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={classes.formItem}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={placeholder}
                            className={classes.input}
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter" &&
                                    (e.target as HTMLInputElement)?.value.length > 0
                                ) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    appendItem();
                                }
                            }}
                        />
                    </FormControl>
                    {desc && <FormDescription>{desc}</FormDescription>}
                    <div
                        className={cn(
                            "flex flex-row justify-start items-center gap-2 flex-wrap",
                            classes.tagList
                        )}
                    >
                        {items.map((x: string, i: number) => (
                            <Badge
                                className="cursor-pointer"
                                role="button"
                                key={`tag-${x}`}
                                onClick={() => removeItemByIndex(i)}
                            >
                                {x}
                            </Badge>
                        ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

TagInput.displayName = "TagInput";
