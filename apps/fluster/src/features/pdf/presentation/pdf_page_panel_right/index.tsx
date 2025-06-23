import { PdfView } from "#/pdf/state/provider/pdf_context";
import { Form, GeneralSelectInput } from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
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
            console.log("Setting value");
            form.setValue("view", view as PdfView);
        }
        /* eslint-disable-next-line  --  */
    }, [searchParams]);

    return (
        <Form {...form}>
            <div className="w-full flex flex-col justify-start items-center max-w-[450px]">
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
            </div>
        </Form>
    );
};

PdfPagePanelRight.displayName = "PdfPagePanelRight";
