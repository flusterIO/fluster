import { commands } from "@/lib/bindings";
import { AppState } from "@/state/initial_state";
import { GeneralSelectInput, GeneralSelectInputProps } from "@fluster.io/dev";
import React, { useEffect, useState, type ReactNode } from "react";
import { FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";

type LocalModelSelectInputProps<T extends FieldValues> = Omit<
    GeneralSelectInputProps<T, string>,
    "items"
>;

export const LocalModelSelectInput = <T extends FieldValues>(
    props: LocalModelSelectInputProps<T>
): ReactNode => {
    const connectionData = useSelector(
        (appState: AppState) => appState.ai.ollamaConnection
    );
    const [items, setItems] = useState<
        GeneralSelectInputProps<T, string>["items"]
    >([]);
    const getData = async (): Promise<void> => {
        const res = await commands.getLocalOllamaModels(
            connectionData.useOllamaConnectionData ? connectionData : null
        );
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
        /* eslint-disable-next-line  -- I hate this stupid rule */
    }, []);
    return <GeneralSelectInput {...props} items={items} />;
};

LocalModelSelectInput.displayName = "LocalModelSelectInput";
