import { PdfView } from "#/pdf/state/provider/pdf_context";
import { Button, Form, GeneralSelectInput, showToast } from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
import { openPath } from "@tauri-apps/plugin-opener";
import React, { useEffect, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";

const formSchema = z.object({
    view: z.nativeEnum(PdfView),
});

export const PdfPagePanelRight = ({
    defaultView = PdfView.singlePage,
}: {
    defaultView?: PdfView;
}): ReactNode => {
    const [searchParams] = useSearchParams();
    const view = searchParams.get("pdfView");
    const fsPath = searchParams.get("fsPath");
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            view: PdfView.singlePage,
        },
    });
    form.watch((formState) => {
        if (formState.view && formState.view !== defaultView) {
            window.dispatchEvent(
                new CustomEvent("set-pdf-page-view", {
                    detail: {
                        view: formState.view,
                    },
                })
            );
        }
    });

    useEffect(() => {
        if (view && view !== form.getValues("view")) {
            form.setValue("view", view as PdfView);
        }
        /* eslint-disable-next-line  --  */
    }, [searchParams]);
    const handleOpen = async (): Promise<void> => {
        console.log("fsPath: ", fsPath);
        if (!fsPath) {
            return;
        }
        try {
            await openPath(fsPath);
        } catch (err) {
            console.error("Error: ", err);
            showToast({
                title: "Oh no",
                body: "This pdf cannot be opened due to a permissions issue.",
                duration: 3000,
                variant: "Error",
            });
        }
    };

    return (
        <Form {...form}>
            <div className="w-full h-full flex flex-col justify-between items-center max-w-[450px]">
                <GeneralSelectInput
                    form={form}
                    name="view"
                    placeholder="View"
                    label="Pdf View"
                    classes={{
                        formItem: "w-full [&>button]:w-full",
                        selectContent: "w-full",
                    }}
                    items={[
                        {
                            label: "Single Page",
                            value: PdfView.singlePage,
                        },
                        {
                            label: "Table of Contents",
                            value: PdfView.withToc,
                        },
                        {
                            label: "Grid View",
                            value: PdfView.grid,
                        },
                    ]}
                />
                <Button className="w-full" onClick={handleOpen} disabled={!fsPath}>
                    Open in default app
                </Button>
            </div>
        </Form>
    );
};

PdfPagePanelRight.displayName = "PdfPagePanelRight";
