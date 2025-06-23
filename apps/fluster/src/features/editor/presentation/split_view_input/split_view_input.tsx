import {
    cn,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Textarea,
} from "@fluster.io/dev";
import React, { useEffect, useState, type ReactNode } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import SplitViewContainer from "../split_view/split_view_scaffold";
import { BundledLanguage } from "shiki";
import { BodyPortal } from "@/components/body_portal";

interface SplitViewTextAreaInputProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: ReactNode;
    rows?: number;
    desc?: string;
    language?: BundledLanguage;
    classes?: {
        formItem?: string;
        container?: string;
        textArea?: string;
    };
    initialValue: string;
}

export const SplitViewTextAreaInput = <T extends FieldValues>({
    form,
    name,
    label,
    desc = "Use cmd+shift+Enter to open a full screen editor.",
    rows = 5,
    language = "mdx",
    classes = {},
    initialValue,
}: SplitViewTextAreaInputProps<T>): ReactNode => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        form.setValue(name, value as Parameters<typeof form.setValue>[1]);
        /* eslint-disable-next-line  --  */
    }, [value]);
    return (
        <>
            {open && (
                <BodyPortal>
                    <div className="absolute w-screen h-screen top-0 left-0 right-0 bottom-0">
                        <SplitViewContainer
                            autoSaveId="textarea-input-splitview"
                            language={language}
                            value={value}
                            onChange={(v) => setValue(v)}
                            onCmdEnter={() => {
                                setOpen(false);
                            }}
                        />
                    </div>
                </BodyPortal>
            )}
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
                                        value={value}
                                        onChange={(e) => {
                                            form.setValue(
                                                field.name,
                                                e.target.value as Parameters<typeof form.setValue>[1]
                                            );
                                            setValue(e.target.value);
                                        }}
                                        rows={rows}
                                        className={classes.textArea}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && e.shiftKey && e.metaKey) {
                                                setOpen(true);
                                            }
                                        }}
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
        </>
    );
};

SplitViewTextAreaInput.displayName = "SplitViewTextAreaInput";
