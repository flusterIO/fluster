import { commands } from "@/lib/bindings";
import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";

import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
import { H4, showToast, Button } from "@fluster.io/dev";
import { DynamicDataTable } from "./dynamic_data_table";
import { LoadingComponent } from "@/components/loading_screen";

const connector = connect((state: AppState) => ({
    notesDirectory: state.core.notesDirectory,
}));

export const TabularDataTablePage = connector(
    ({ notesDirectory }: { notesDirectory: string }): ReactNode => {
        const [sp, setSp] = useSearchParams();
        /* const relativeFilePath = sp.get("file"); */
        const relativeFilePath = useMemo(() => {
            return sp.get("file")
        }, [sp])
        const hasHeader = useMemo(() => {
            const h = sp.get("hasHeader")
            if (h) {
                return h === "true"
            }
        }, [sp])
        const [data, setData] = useState<object[] | null | "parse-fail">(null);
        /* const */
        const getData = async (fp: string, bp: string, hh: boolean | undefined): Promise<void> => {
            const res = await commands.loadTabularFile(fp, bp, typeof hh === "boolean" ? hh : false);
            if (res.status === "ok") {
                setData(res.data);
            } else {
                const res2 = await commands.loadTabularFile(fp, bp, typeof hh === "boolean" ? !hh : true);
                if (res2.status === "ok") {
                    setData(res2.data);
                } else {
                    setData("parse-fail")
                    showToast({
                        title: "Something went wrong",
                        body: `Fluster could not load the file: ${fp}`,
                        variant: "Error",
                        duration: 5000,
                    });
                }
            }
        };

        useEffect(() => {
            if (relativeFilePath) {
                getData(relativeFilePath, notesDirectory, hasHeader);
            } else {
                showToast({
                    title: "No file found",
                    body: "This route requires a 'file' search parameter.",
                    variant: "Error",
                    duration: 5000,
                });
            }
            /* eslint-disable-next-line  -- Don't want to include unecessary dependencies. I hate this fucking rule. */
        }, [relativeFilePath, hasHeader]);

        if (data === null) {
            return (
                <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
                    <LoadingComponent />
                </div>
            );
        }
        if (data === "parse-fail") {
            return (
                <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
                    <div className="max-w-[min(450px,90vw)] flex flex-col justify-center items-center gap-4">
                        <H4>Something went wrong.</H4>
                        <p>Could not successfully parse file</p>
                        <div>
                            <Button
                                onClick={() => {
                                    sp.set("hasHeader", hasHeader ? "false" : "true")
                                    setSp(sp)
                                }}
                            >{`Try again ${hasHeader ? "without" : "with"} header`}</Button>
                        </div>
                    </div>
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
                <div className="max-w-[1080px] w-full my-16 @container/dynamic_table">
                    <DynamicDataTable items={data} />
                    <div className="mt-2 text-sm">
                        <span>File: </span>
                        <span className="text-muted-foreground">{relativeFilePath}</span>
                    </div>
                </div>
            </div>
        );
    }
);

TabularDataTablePage.displayName = "TabularDataTablePage";
