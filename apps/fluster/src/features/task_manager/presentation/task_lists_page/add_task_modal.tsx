import { useEventListener } from "@/hooks/use_event_listener";
import React, { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import ModalBackdrop from "@/components/util/modal_backdrop";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, TextAreaInput, TextInputGroup } from "@fluster.io/dev";
import { IconPlus } from "@tabler/icons-react";
import { onEnter } from "@/events/on_enter";
import { commands, TaskTagModel } from "@/lib/bindings";
import { useSearchParams } from "react-router";
import { refreshTaskList } from "#/task_manager/state/refresh_task_list";

declare global {
    interface WindowEventMap {
        "show-add-task-modal": CustomEvent<{ listId: string }>;
    }
}

/* TODO: Implement tags in UI here so they can be passed to rust. */
const addTaskSchema = z.object({
    id: z.string().nullable(),
    label: z.string().min(3, "Please provide a label."),
    note: z.string().nullable(),
    tags: z.string().array().default([]),
});

const Modal = ({
    close,
    listId,
}: {
    close: () => void;
    listId: string;
}): ReactNode => {
    const firstInputId = useId();
    const [searchParams] = useSearchParams();
    const form = useForm({
        resolver: zodResolver(addTaskSchema),
        defaultValues: {
            id: null,
            label: "",
            note: "",
        },
    });
    const isValidInput = (label: string): boolean => {
        return label.length >= 3;
    };
    const labelValue = form.watch("label");
    const handleCreate = async (): Promise<void> => {
        if (!listId) {
            return;
        }
        const data = form.getValues();
        const id = data.id ?? (await commands.getUniqueId());
        const now = new Date().valueOf().toString();
        const res = await commands.createTask(
            {
                id,
                label: data.label ?? "",
                complete: false,
                ctime: now,
                due_at: null,
                notes: data.note ?? "",
                task_list_id: listId,
            },
            data.tags
                ? data.tags.map((t) => {
                    return {
                        tag_value: t,
                        task_id: id,
                    } satisfies TaskTagModel;
                })
                : []
        );
        if (res.status === "ok") {
            form.reset({
                note: "",
                label: "",
                id: null,
            });
            close();
            refreshTaskList(searchParams.get("listId"));
        } else {
            console.error("An error occurred while creating that task.");
        }
    };
    useEffect(() => {
        document.getElementById(firstInputId)?.focus();
        /* eslint-disable-next-line  --  */
    }, []);
    return (
        <ModalBackdrop onClick={() => close()}>
            <motion.div
                className="px-4 py-3 md:px-6 md:py-4 rounded border text-foreground bg-popover w-[min(90%,540px)]"
                animate="show"
                initial="initial"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                variants={{
                    initial: {
                        y: -200,
                        opacity: 0,
                    },
                    show: {
                        y: 0,
                        opacity: 1,
                    },
                }}
            >
                <h2 className="font-bold text-lg mb-4">
                    <IconPlus className="inline mr-2" />
                    Add a task
                </h2>
                <Form {...form}>
                    <div className="space-y-6">
                        <TextInputGroup
                            ids={{
                                input: firstInputId,
                            }}
                            inputProps={{
                                onKeyDown: (e) =>
                                    onEnter(
                                        e,
                                        () => {
                                            handleCreate();
                                        },
                                        "onEnter"
                                    ),
                            }}
                            form={form}
                            name="label"
                            label="Label"
                        />
                        <TextAreaInput
                            desc={"All fields can contain mdx."}
                            form={form}
                            name="note"
                            label="Notes (optional)"
                        />
                    </div>
                </Form>
                <div className="w-full flex flex-row justify-end items-center mt-4">
                    <Button
                        onClick={() => handleCreate()}
                        disabled={!isValidInput(labelValue)}
                    >
                        Create
                    </Button>
                </div>
            </motion.div>
        </ModalBackdrop>
    );
};

export const AddTaskModal = (): ReactNode => {
    // The list id if it should be open
    const [open, setOpen] = useState<false | string>(false);
    useEventListener("show-add-task-modal", (e) => {
        console.log("e: ", e);
        setOpen(e.detail.listId);
    });
    if (open) {
        return createPortal(
            <Modal close={() => setOpen(false)} listId={open} />,
            document.body
        );
    } else {
        return null;
    }
};

AddTaskModal.displayName = "AddTaskModal";
