import { LoadingComponent } from "@/components/loading_screen";
import { commands } from "@/lib/bindings";
import { showToast } from "@fluster.io/dev";
import React, { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";

export const HtmlFilePage = (): ReactNode => {
    const [htmlData, setHtmlData] = useState<string | null>(null);
    const [sp] = useSearchParams();
    const getData = async (fsPath: string): Promise<void> => {
        const res = await commands.readUtf8File(fsPath);
        if (res.status === "ok") {
            setHtmlData(res.data);
        } else {
            showToast({
                title: "Could not load file",
                body: `Fluster could not load the html file ${sp.get("fsPath")}`,
                variant: "Error",
                duration: 5000,
            });
        }
    };
    useEffect(() => {
        const fsPath = sp.get("fsPath");
        if (fsPath) {
            getData(fsPath);
        }
        /* eslint-disable-next-line  --  */
    }, [sp]);
    if (htmlData === null) {
        return (
            <div className="w-full h-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
                <LoadingComponent />
            </div>
        );
    }
    return (
        <div className="py-8 px-6 flex flex-col justify-start items-center">
            <div
                className="max-w-[min(90%,1080px)]"
                dangerouslySetInnerHTML={{ __html: htmlData }}
            />
        </div>
    );
};

HtmlFilePage.displayName = "HtmlFilePage";
