import React, { useState, type ReactNode } from "react";
import {
    Button,
    DateTimeInput,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    useEventListener,
} from "@fluster.io/dev";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
                            console.log("form.getValue(): ", form.getValues());
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
