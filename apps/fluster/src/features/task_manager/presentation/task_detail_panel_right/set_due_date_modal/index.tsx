import React, { useState, type ReactNode } from "react";
import {
    Button,
    DateTimeInput,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    showToast,
    useEventListener,
} from "@fluster.io/dev";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commands } from "@/lib/bindings";
import { refreshTaskList } from "#/task_manager/state/refresh_task_list";

interface SetDueAtEventProps {
    /// Any unique string to be used for identifying the subsequent 'task-due-at-result' event.
    id: string;
}

declare global {
    interface WindowEventMap {
        "show-set-due-at-modal": CustomEvent<SetDueAtEventProps>;
        "task-due-at-result": CustomEvent<
            SetDueAtEventProps & {
                /// THe dueAt field stringified as a unix timestamp string to be compatible with the rust interface.
                dueAt: string | null;
            }
        >;
    }
}

const schema = z.object({
    date: z.coerce.date(),
});

export const SetDueAtModal = (): ReactNode => {
    const [open, setOpen] = useState<false | string>(false);

    useEventListener("show-set-due-at-modal", (e) => {
        setOpen(e.detail.id);
    });

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            date: new Date(),
        },
    });

    const setDueDate = async (task_id: string): Promise<void> => {
        const due_at = form.getValues("date").valueOf().toString();
        const res = await commands.getTaskById(task_id);
        if (res.status !== "ok") {
            return showToast({
                title: "Something went wrong",
                body: "We cannot update this task. An error occurred.",
                variant: "Error",
                duration: 5000,
            });
        }
        const updateRes = await commands.createTask(
            {
                ...res.data,
                ctime: new Date(res.data.ctime).valueOf().toString(),
                due_at,
            },
            []
        );

        if (updateRes.status === "ok") {
            showToast({
                title: "Success",
                body: "Your task has been updated",
                duration: 3000,
                variant: "Info",
            });
            setOpen(false);
            refreshTaskList(res.data.task_list_id);
        }
    };

    return (
        <Dialog
            open={Boolean(open)}
            onOpenChange={(newOpen) => {
                if (!newOpen) {
                    setOpen(false);
                }
            }}
        >
            <DialogHeader>
                <DialogTitle>Set Due Date</DialogTitle>
            </DialogHeader>
            <DialogContent>
                <DateTimeInput form={form} name="date" />
                <DialogFooter>
                    <Button
                        onClick={async () => {
                            if (open) {
                                await setDueDate(open);
                            }
                        }}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

SetDueAtModal.displayName = "SetDueAtModal";
