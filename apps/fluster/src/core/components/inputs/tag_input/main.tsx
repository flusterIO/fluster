import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/shad/form";
import { Input } from "@/components/ui/shad/input";
import { cn } from "@/lib/utils";
import React, { useState, type ReactNode } from "react";
import {
    FieldValue,
    FieldValues,
    Path,
    PathValue,
    useForm,
    UseFormReturn,
} from "react-hook-form";
import { Label } from "recharts";
import { FormInputProps } from "../types";
import { Badge } from "@/components/ui/shad/badge";

interface TagInputProps<T extends FieldValues> extends FormInputProps<T> {
    classes: {
        formItem?: string;
        input?: string;
        tagList?: string;
    };
    label?: string;
    desc?: ReactNode;
}

const TagInput = <T extends FieldValues>({
    classes,
    label = "Tags",
    form,
    name,
    desc,
}: TagInputProps<T>): ReactNode => {
    const [inputValue, setInputValue] = useState("");
    const items = form.watch(name);
    const appendItem = (): void => {
        console.log(`Appending item`);
        form.setValue(name, [...items, inputValue] as PathValue<T, typeof name>);
        setInputValue("");
    };
    const removeItemByIndex = (idx: number): void => {
        form.setValue(
            name,
            items.filter((_: string, i: number) => i !== idx) as PathValue<
                T,
                typeof name
            >
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
                            placeholder="shadcn"
                            className={classes.input}
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter" &&
                                    (e.target as HTMLInputElement)?.value.length > 0
                                ) {
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

export default TagInput;
