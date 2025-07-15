import React, { useEffect, useState, type ReactNode } from "react";
import { FormInputProps } from "../types";
import { FieldValues, PathValue } from "react-hook-form";
import { Label } from "../../shad/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../shad/popover";
import { Button } from "../../shad/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../../shad/calendar";
import { Input } from "../../shad/input";
import { cn } from "../../../utils/cn";
import dayjs from "dayjs";

interface DateTimeInputProps<T extends FieldValues>
    extends Omit<FormInputProps<T>, "label" | "desc"> {
    classes?: {
        container?: string;
        dateFormItem?: string;
        calendar?: string;
        calendarPopoverContent?: string;
        calendarPopover?: string;
        calendarButton?: string;
        timeInput?: string;
        timeInputLabel?: string;
        calendarInputLabel?: string;
        calendarInputContainer?: string;
        timeInputContainer?: string;
    };
}

export const DateTimeInput = <T extends FieldValues>({
    form,
    name,
    classes = {},
}: DateTimeInputProps<T>): ReactNode => {
    const formValue = form.watch(name);
    const now = formValue ? (formValue as Date) : new Date();
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(
        new Date(`${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`)
    );
    const [time, setTime] = useState<string | undefined>("09:00:00");
    const handleDateTime = (): void => {
        if (!time || !date) {
            return;
        }
        const [hours, minutes, seconds] = time.split(":");
        let d = dayjs(date);
        d = d.add(parseInt(hours), "hours");
        d = d.add(parseInt(minutes), "minutes");
        d = d.add(parseInt(seconds), "seconds");
        console.log("d.toDate(): ", d.toDate());
        form.setValue(name, d.toDate() as PathValue<T, typeof name>);
    };
    useEffect(() => {
        handleDateTime();
        /* eslint-disable-next-line  --  */
    }, [date, time]);

    return (
        <div className={cn("flex gap-4", classes.container)}>
            <div
                className={cn("flex flex-col gap-3", classes.calendarInputContainer)}
            >
                <Label
                    htmlFor="date-picker"
                    className={cn("px-1", classes.calendarInputLabel)}
                >
                    Date
                </Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className={cn(
                                "w-32 justify-between font-normal",
                                classes.calendarButton
                            )}
                        >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className={cn(
                            "w-auto overflow-hidden p-0",
                            classes.calendarPopover
                        )}
                        align="start"
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            className={classes.calendar}
                            onSelect={(date) => {
                                setDate(date);
                                /* setOpen(false); */
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className={cn("flex flex-col gap-3", classes.timeInputContainer)}>
                <Label
                    htmlFor="time-picker"
                    className={cn("px-1", classes.timeInputLabel)}
                >
                    Time
                </Label>
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue={time}
                    className={cn(
                        "bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
                        classes.timeInput
                    )}
                    onChange={(e) => {
                        setTime(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

DateTimeInput.displayName = "DateTimeInput";
