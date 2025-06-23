import React, { useEffect, useState, type ReactNode } from "react";
import { FieldValues } from "react-hook-form";
import { commands } from "../../../../lib/bindings";
import { GeneralCombobox, GeneralComboboxProps } from "../general_combobox";

interface FileExtensionGlobSelectProps<T extends FieldValues>
    extends Omit<GeneralComboboxProps<T>, "items"> {
    /// The glob must be a file extension, without the leading '.'. A more general FileExtension select is on the to-do list.
    glob: string;
    /// The notes root directory.
    basePath: string;
    nThreads?: number;
    formatOption?: (absoluteFilePath: string) => string;
}

export const FileExtensionGlobSelect = <T extends FieldValues>({
    glob,
    formatOption,
    basePath,
    nThreads = 8,
    ...props
}: FileExtensionGlobSelectProps<T>): ReactNode => {
    const [items, setItems] = useState<{ label: string; value: string }[]>([]);
    const getData = async (): Promise<void> => {
        const res = await commands.fsFileExtensionGlob(
            glob,
            basePath,
            `${nThreads}`
        );
        if (res.status === "ok") {
            setItems(
                res.data.map((x) => {
                    return {
                        value: x,
                        label: formatOption ? formatOption(x) : x,
                    };
                })
            );
        }
    };
    useEffect(() => {
        getData();
        /* eslint-disable-next-line  --  */
    }, []);
    return <GeneralCombobox items={items} {...props} />;
};

FileExtensionGlobSelect.displayName = "FileExtensionGlobSelect";
