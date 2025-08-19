import { commands } from "@/lib/bindings";
import { GeneralSelectInput, GeneralSelectInputProps } from "@fluster.io/dev";
import React, { useEffect, useState, type ReactNode } from "react";
import { FieldValues } from "react-hook-form";

type LocalModelSelectInputProps<T extends FieldValues> = Omit<
    GeneralSelectInputProps<T, string>,
    "items"
>;

export const LocalModelSelectInput = <T extends FieldValues>(
    props: LocalModelSelectInputProps<T>
): ReactNode => {
    const [items, setItems] = useState<
        GeneralSelectInputProps<T, string>["items"]
    >([]);
    const getData = async (): Promise<void> => {
        const res = await commands.getLocalOllamaModels();
        if (res.status === "ok") {
            setItems(
                res.data.map((x) => {
                    return {
                        label: x.name,
                        value: x.name,
                    };
                })
            );
        } else {
            console.error(
                "An error occurred while gathering local models: ",
                res.error
            );
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return <GeneralSelectInput {...props} items={items} />;
};

LocalModelSelectInput.displayName = "LocalModelSelectInput";
