import React, { MouseEventHandler, type ReactNode } from "react";
import { FormInputProps } from "../types";
import { FieldValues, PathValue } from "react-hook-form";
import { Input } from "../../shad/input";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../shad/form";
import { cn } from "../../../utils/cn";
import { File, Folder } from "lucide-react";
import { Button } from "../../shad/button";

interface FilePathInputProps<T extends FieldValues> extends FormInputProps<T> {
    classes?: {
        formItem?: string;
        container?: string;
        input?: string;
    };
    dialogTitle?: string;
    /// True if the file dialog should prefer a directory instead of a file.
    directory?: boolean;
    defaultPath?: string;
    /// Allow the user to select multiple entries.
    multiple?: boolean;
}

export const FilePathInput = <T extends FieldValues>({
    name,
    form,
    label,
    desc,
    directory = false,
    defaultPath = undefined,
    dialogTitle,
    multiple = false,
    classes = {},
}: FilePathInputProps<T>): ReactNode => {
    const getValue = (x: string | string[]): string | string[] => {
        const isArray = Array.isArray(x);
        if (isArray) {
            return multiple ? x : x[0];
        } else {
            return multiple ? [x as string] : x;
        }
    };

    const openDialog: MouseEventHandler = async (e): Promise<void> => {
        e.preventDefault();
        e.stopPropagation();
        /* @ts-expect-error -- Not worth typing this dialog property right now. Come back to this in the future. */
        const { open } = window.__TAURI__.dialog;
        const res = await open({
            multiple,
            directory,
            defaultPath,
            title: dialogTitle,
        });
        console.error("Dialog response: ", res);
        if (res) {
            form.setValue(name, getValue(res) as PathValue<T, typeof name>);
        }
    };

    const value = form.watch(name);
    const Icon = directory ? Folder : File;

    return (
        <FormField
            name={name}
            control={form.control}
            render={() => {
                return (
                    <FormItem className={cn("w-full max-w-[600px]", classes.formItem)}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <div className={cn("w-full max-w-[600px]", classes.container)}>
                                <div className="w-full flex flex-row justify-center items-center gap-2">
                                    <Input
                                        id={"equation-name-input"}
                                        value={typeof value === "string" ? value : ""}
                                        onChange={(e) =>
                                            form.setValue(
                                                name,
                                                e.target.value as Parameters<typeof form.setValue>[1]
                                            )
                                        }
                                        className={cn("flex-grow", classes.input)}
                                    />
                                    <Button onClick={openDialog} size={"icon"}>
                                        <Icon />
                                    </Button>
                                </div>
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

FilePathInput.displayName = "FilePathInput";
