import React, { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import {
    Button,
    FileExtensionGlobSelect,
    Form,
    useEventListener,
} from "@fluster.io/dev";
import ModalBackdrop from "@/components/util/modal_backdrop";
import { BodyPortal } from "@/components/body_portal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { BibEntryModel, commands } from "@/lib/bindings";
import { showToast } from "#/toast_notification/data/events/show_toast";
import { BibEntryParsed } from "#/bibliography/data/models/bib_entry_parsed";

export interface ShowLinkPdfModalEventProps {
    item: BibEntryModel;
}

declare global {
    interface WindowEventMap {
        "show-link-pdf-modal": CustomEvent<ShowLinkPdfModalEventProps>;
    }
}

const formSchema = z.object({
    value: z.string(),
});

const connector = connect((state: AppState) => ({
    basePath: state.core.notesDirectory,
}));

export const LinkPdfToBibModal = connector(
    ({
        setItem,
        basePath,
        item,
    }: {
        setItem: (newItem: BibEntryParsed) => void;
        basePath: string;
        item: BibEntryParsed;
    }): ReactNode => {
        const [open, setOpen] = useState(false);
        const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                value: "",
            },
        });

        useEventListener("show-link-pdf-modal", () => {
            setOpen(true);
        });

        useEffect(() => {
            if (open) {
                document.getElementById("select-pdf-button")?.focus();
            }
        }, [open]);

        const handleSave = async (): Promise<void> => {
            const val = form.getValues("value");
            if (val.length) {
                const data: BibEntryModel = {
                    ...item.model,
                    // The date is iso formatted during deserialization, but needs to be provided as a stringified unix timestamp.
                    ctime: new Date(item.model.ctime).valueOf().toString(),
                    pdf_path: val,
                };
                const res = await commands.saveBibEntries([data]);
                if (res.status === "ok") {
                    showToast({
                        title: "Success",
                        body: "Your bibliography entry is now linked with this pdf.",
                        duration: 5000,
                        variant: "Success",
                    });
                    setOpen(false);
                    window.dispatchEvent(new CustomEvent("request-bib-table-refresh"));
                    setItem({
                        ...item,
                        model: {
                            ...item!.model,
                            pdf_path: val,
                        },
                    });
                } else {
                    console.error(
                        `An error occurred while linking this pdf to your bib entry.`,
                        res.error
                    );
                }
            }
        };

        return (
            <BodyPortal>
                <ModalBackdrop
                    hide={!open}
                    className="z-20"
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        initial="hide"
                        animate={open ? "show" : "hide"}
                        variants={{
                            hide: {
                                scale: 0,
                                opacity: 0,
                            },
                            show: {
                                scale: 1,
                                opacity: 1,
                            },
                        }}
                        className="border rounded p-4 bg-card z-10"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                    >
                        <Form {...form}>
                            <FileExtensionGlobSelect
                                placeholder="Pdf File"
                                basePath={basePath}
                                glob="pdf"
                                label="Pdf"
                                form={form}
                                name="value"
                                inputPlaceholder={"Search pdf files"}
                                ids={{
                                    button: "select-pdf-button",
                                }}
                                formatOption={
                                    basePath.length ? (x) => x.replace(basePath, "") : undefined
                                }
                                classes={{
                                    button: "w-[min(1080px,90vw)]",
                                    popover: "min-w-[400px]",
                                    popoverContainer: "min-w-[400px]",
                                }}
                            />
                        </Form>
                        <div className="w-full flex flex-row justify-end items-center mt-4">
                            <Button onClick={handleSave}>Save</Button>
                        </div>
                    </motion.div>
                </ModalBackdrop>
            </BodyPortal>
        );
    }
);

LinkPdfToBibModal.displayName = "LinkPdfToBibModal";
