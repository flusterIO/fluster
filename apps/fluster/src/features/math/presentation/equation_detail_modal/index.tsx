import ModalBackdrop from "@/components/util/modal_backdrop";
import { commands, EquationModel } from "@/lib/bindings";
import {
    Button,
    buttonVariants,
    getByEquationUrl,
    showToast,
    useEventListener,
} from "@fluster.io/dev";
import React, { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { copyStringToClipboard } from "@/lib/copy_string_to_clipboard";
import { NavLink } from "react-router";

export const EquationDetailModal = (): ReactNode => {
    const [open, setOpen] = useState(false);
    const [equation, setEquation] = useState<
        (EquationModel & { tags: string[] }) | null
    >(null);

    const getEquation = async (
        /// The 'id' field of the equation, not the user provided id.
        equationId: string
    ): Promise<void> => {
        const res = await commands.getEquationById(equationId);
        if (res.status === "ok") {
            setEquation({
                ...res.data.equation,
                tags: res.data.tags.map((t) => t.value),
            });
        } else {
            console.error(
                `An error occurred while attempting to get data for an equation with id ${equationId}`
            );
        }
    };
    useEventListener("show-equation-detail-modal", (e) => {
        setOpen(true);
        getEquation(e.detail.id);
    });

    if (!open) {
        return null;
    }

    const close = (): void => {
        setOpen(false);
        setEquation(null);
    };

    return (
        <ModalBackdrop hide={!open} onClick={close}>
            <motion.div
                className="px-4 py-3 rounded-lg border z-[999] bg-card text-card-foreground gap-x-6"
                initial="hide"
                animate={equation ? "show" : "hide"}
                variants={{
                    show: {
                        scale: 1,
                        opacity: 1,
                    },
                    hide: {
                        scale: 0,
                        opacity: 0,
                    },
                }}
            >
                <div className="min-[768px]:grid min-[768px]:grid-cols-2 w-[min(768px,90vw)] flex flex-col justify-center items-center">
                    <div className="h-full w-full flex flex-col justify-start items-start">
                        <InlineMdxContent
                            className="[&_p]:text-foreground [&_p]:w-full [&_p]:text-xl [&_p]:font-semibold"
                            mdx={equation?.label ?? ""}
                        />
                        <div className="[&_p]:text-muted-foreground w-full">
                            <InlineMdxContent mdx={equation?.desc ?? ""} />
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col justify-center items-center min-h-[120px]">
                        <InlineMdxContent
                            className="w-fit"
                            mdx={equation?.body ? `$$${equation.body}$$` : ""}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-end items-center gap-4">
                    {equation && (
                        <NavLink
                            className={buttonVariants({
                                variant: "secondary",
                            })}
                            to={getByEquationUrl(equation?.id)}
                        >
                            Notes
                        </NavLink>
                    )}
                    <Button
                        onClick={async () => {
                            if (!equation?.body) {
                                showToast({
                                    title: "Something went wrong",
                                    body: "Your equation was not copied to your clipboard. If this continues, please file an issue on Github.",
                                    variant: "Error",
                                    duration: 10000,
                                });
                            } else {
                                const res = await copyStringToClipboard(equation.body);
                                if (res) {
                                    showToast({
                                        title: "Success",
                                        body: "Your equation was copied to your clipboard",
                                        duration: 3000,
                                        variant: "Success",
                                    });
                                } else {
                                    showToast({
                                        title: "Something went wrong",
                                        body: "Your equation was not copied to your clipboard. If this continues, please file an issue on Github.",
                                        variant: "Error",
                                        duration: 10000,
                                    });
                                }
                            }
                        }}
                    >
                        Copy Latex
                    </Button>
                </div>
            </motion.div>
        </ModalBackdrop>
    );
};

EquationDetailModal.displayName = "EquationDetailModal";
