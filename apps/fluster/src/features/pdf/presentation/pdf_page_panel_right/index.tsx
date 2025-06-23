import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AppRoutes, Form, GeneralSelectInput } from "@fluster.io/dev";
import { PdfView, usePdfDispatch } from "#/pdf/state/provider/pdf_context";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { KeymapItem } from "#/keymap/data/models/keymap_item";
<<<<<<< HEAD
import { useNavigate, useSearchParams } from "react-router";
||||||| f36a7f4
=======
import { useSearchParams } from "react-router";
>>>>>>> feat/pdf

const formSchema = z.object({
    view: z.nativeEnum(PdfView),
});

const connector = connect((state: AppState) => ({
    pageLeftKeymap: state.keymap.selectLeft,
    pageRightKeymap: state.keymap.selectRight,
}));

export const PdfPagePanelRight = connector(
<<<<<<< HEAD
  ({
    defaultView,
    pageLeftKeymap,
    pageRightKeymap,
  }: {
    defaultView: PdfView;
    pageRightKeymap: string;
    pageLeftKeymap: string;
  }): ReactNode => {
    const dispatch = usePdfDispatch();
    const nav = useNavigate();
    const [searchParams] = useSearchParams();
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        view: typeof defaultView === "string" ? defaultView : PdfView.withToc,
      },
    });
    const view: PdfView =
      (searchParams.get("pdfView") as PdfView) ?? PdfView.withToc;
    useEffect(() => {
      if (view) {
        form.setValue("view", view);
      }
    }, [view]);
    form.watch((formState) => {
      if (formState.view && formState.view !== defaultView) {
        window.dispatchEvent(
          new CustomEvent("set-pdf-page-view", {
            detail: {
              view: formState.view,
||||||| f36a7f4
  ({
    defaultView,
    pageLeftKeymap,
    pageRightKeymap,
  }: {
    defaultView: PdfView;
    pageRightKeymap: string;
    pageLeftKeymap: string;
  }): ReactNode => {
    const dispatch = usePdfDispatch();
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        view: typeof defaultView === "string" ? defaultView : PdfView.withToc,
      },
    });
    form.watch((formState) => {
      if (formState.view && formState.view !== defaultView) {
        window.dispatchEvent(
          new CustomEvent("set-pdf-page-view", {
            detail: {
              view: formState.view,
=======
    ({
        defaultView = PdfView.singlePage,
        pageLeftKeymap,
        pageRightKeymap,
    }: {
        defaultView?: PdfView;
        pageRightKeymap: string;
        pageLeftKeymap: string;
    }): ReactNode => {
        const dispatch = usePdfDispatch();
        const [searchParams] = useSearchParams();
        const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                view:
                    typeof defaultView === "string" ? defaultView : PdfView.singlePage,
>>>>>>> feat/pdf
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

        const view = searchParams.get("pdfView");

        useEffect(() => {
            if (view && view !== form.getValues("view")) {
                form.setValue("view", view as PdfView);
            }
            /* eslint-disable-next-line  --  */
        }, [view]);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (pageLeftKeymap) {
                const pageLeft = KeymapItem.fromString(pageLeftKeymap);
                if (pageLeft.matches(e) || e.key === "ArrowLeft") {
                    console.log("decrementing");
                    dispatch({
                        type: "decrementPageNumber",
                    });
                }
            }
            if (pageRightKeymap) {
                const pageRight = KeymapItem.fromString(pageRightKeymap);
                if (pageRight.matches(e) || e.key === "ArrowRight") {
                    console.log("incrementing");
                    dispatch({
                        type: "incrementPageNumber",
                    });
                }
            }
        };

        useEffect(() => {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }, []);

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
<<<<<<< HEAD
        searchParams.set("pdfView", formState.view);
        nav(`${AppRoutes.pdf}?${searchParams.toString()}`);
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      const pageLeft = KeymapItem.fromString(pageLeftKeymap);
      if (pageLeft.matches(e) || e.key === "ArrowLeft") {
        dispatch({
          type: "decrementPageNumber",
        });
      }
      const pageRight = KeymapItem.fromString(pageRightKeymap);
      if (pageRight.matches(e) || e.key === "ArrowRight") {
        dispatch({
          type: "incrementPageNumber",
        });
      }
    };

    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

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
                label: "Table of Contents",
                value: PdfView.withToc,
              },
              {
                label: "Single Page",
                value: PdfView.singlePage,
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
  }
||||||| f36a7f4
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("pageLeftKeymap: ", pageLeftKeymap);
      if (pageLeftKeymap) {
        const pageLeft = KeymapItem.fromString(pageLeftKeymap);
        console.log("pageLeftMatches: ", pageLeft.matches(e));
        if (pageLeft.matches(e) || e.key === "ArrowLeft") {
          console.log("decrementing");
          dispatch({
            type: "decrementPageNumber",
          });
        }
      }
      if (pageRightKeymap) {
        const pageRight = KeymapItem.fromString(pageRightKeymap);
        if (pageRight.matches(e) || e.key === "ArrowRight") {
          console.log("incrementing");
          dispatch({
            type: "incrementPageNumber",
          });
        }
      }
    };

    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

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
                label: "Table of Contents",
                value: PdfView.withToc,
              },
              {
                label: "Single Page",
                value: PdfView.singlePage,
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
  }
=======
    }
>>>>>>> feat/pdf
);

PdfPagePanelRight.displayName = "PdfPagePanelRight";
