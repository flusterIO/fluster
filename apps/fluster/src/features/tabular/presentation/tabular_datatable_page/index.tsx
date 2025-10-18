import { commands } from "@/lib/bindings";
import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";

import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
import { H4, showToast } from "@fluster.io/dev";
import { DynamicDataTable } from "./dynamic_data_table";
import { LoadingComponent } from "@/components/loading_screen";

const connector = connect((state: AppState) => ({
    notesDirectory: state.core.notesDirectory,
}));

export const TabularDataTablePage = connector(
    ({ notesDirectory }: { notesDirectory: string }): ReactNode => {
        const [sp] = useSearchParams();
        const relativeFilePath = useMemo(() => {
            return sp.get("file");
        }, [sp]);
        const [data, setData] = useState<object[] | null>(null);
        const getData = async (fp: string, bp: string): Promise<void> => {
            const res = await commands.loadTabularFile(fp, bp);
            if (res.status === "ok") {
                setData(res.data);
            } else {
                showToast({
                    title: "Something went wrong",
                    body: `Fluster could not load the file: ${fp}`,
                    variant: "Error",
                    duration: 5000,
                });
            }
        };

        useEffect(() => {
            if (relativeFilePath) {
                getData(relativeFilePath, notesDirectory);
            } else {
                showToast({
                    title: "No file found",
                    body: "This route requires a 'file' search parameter.",
                    variant: "Error",
                    duration: 5000,
                });
            }
            /* eslint-disable-next-line  -- Don't want to include unecessary dependencies. I hate this fucking rule. */
        }, [relativeFilePath]);

        if (data === null) {
            return (
                <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
                    <LoadingComponent />
                </div>
            );
        }
        if (!data.length) {
            return (
                <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
                    <H4>No data found.</H4>
                </div>
            );
        }
        return (
            <div className="w-full h-fit min-h-screen flex flex-col justify-center items-center px-8">
                <div className="max-w-[1080px] w-full my-16">
                    <DynamicDataTable items={data} />
                </div>
            </div>
        );
    }
);

TabularDataTablePage.displayName = "TabularDataTablePage";
