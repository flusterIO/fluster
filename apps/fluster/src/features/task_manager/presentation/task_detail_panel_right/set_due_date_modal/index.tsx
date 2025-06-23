import React, { useState, type ReactNode } from "react";
import {
    Button,
    Calendar,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    useEventListener,
} from "@fluster.io/dev";
import { ChevronDownIcon } from "lucide-react";

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

export const SetDueAtModal = (): ReactNode => {
    const [open, setOpen] = useState<false | string>(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    useEventListener("show-set-due-at-modal", (e) => {
        setOpen(e.detail.id);
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
                <div className="flex gap-4">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="date-picker" className="px-1">
                            Date
                        </Label>
                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date-picker"
                                    className="w-32 justify-between font-normal"
                                >
                                    {date ? date.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setDate(date);
                                        setOpen(false);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="time-picker" className="px-1">
                            Time
                        </Label>
                        <Input
                            type="time"
                            id="time-picker"
                            step="1"
                            defaultValue="10:30:00"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

SetDueAtModal.displayName = "SetDueAtModal";
