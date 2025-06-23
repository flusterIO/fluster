import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { FieldValues, PathValue } from "react-hook-form";
import { FormInputProps } from "../../types";
import { FormField } from "../../../shad/form";
import { Label } from "../../../shad/label";
import {
    Popover,
    PopoverContentNoPortal,
    PopoverTrigger,
} from "../../../shad/popover";
import { Button } from "../../../shad/button";
import { cn } from "../../../../utils/cn";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../../shad/command";

export interface GeneralComboboxProps<T extends FieldValues>
    extends Omit<FormInputProps<T>, "desc"> {
    ids?: {
        button?: string;
        popover?: string;
        commandItem?: string;
        popoverContainer?: string;
        commandInput?: string;
        label?: string;
    };
    classes?: {
        button?: string;
        popover?: string;
        commandItem?: string;
        popoverContainer?: string;
        commandInput?: string;
        label?: string;
    };
    /// The button text while the component is in a closed state.
    placeholder: string;
    /// The input placeholder while the component is in a closed state.
    inputPlaceholder?: string;
    noneFoundText?: string;
    items: {
        label: string;
        value: string;
    }[];
}

export const GeneralCombobox = <T extends FieldValues>({
    name,
    label,
    form,
    items,
    placeholder,
    inputPlaceholder,
    noneFoundText,
    classes = {},
    ids = {},
}: GeneralComboboxProps<T>): ReactNode => {
    const [width, setWidth] = useState(0);
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null!);
    const inputRef = useRef<HTMLInputElement>(null!);
    const handleResize = () => {
        console.log(
            "buttonRef.current?.getBoundingClientRect().width: ",
            buttonRef.current?.getBoundingClientRect().width
        );
        setWidth(buttonRef.current?.getBoundingClientRect().width ?? 0);
    };
    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.addEventListener("resize", handleResize);
        }
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <FormField
            name={name}
            control={form.control}
            render={({ field }) => {
                return (
                    <>
                        <Label id={ids.label} className={cn("mb-2", classes.label)}>
                            {label}
                        </Label>
                        <Popover
                            open={open}
                            onOpenChange={(newOpen) => {
                                // If the options will be shown, quickly get the width first with handleResize.
                                if (newOpen) {
                                    handleResize();
                                    setOpen(true);
                                } else {
                                    setOpen(false);
                                }
                            }}
                        >
                            <PopoverTrigger
                                id={ids.popover}
                                asChild
                                className={classes.popover}
                            >
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    id={ids.button}
                                    aria-expanded={open}
                                    className={cn(
                                        "min-w-[200px] justify-between",
                                        classes.button
                                    )}
                                    ref={buttonRef}
                                >
                                    {field.value
                                        ? items.find((x) => x.value === field.value)?.label
                                        : placeholder}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContentNoPortal
                                id={ids.popoverContainer}
                                className={cn(
                                    "w-[200px] p-0 [&_svg]:text-muted-foreground",
                                    classes.popoverContainer
                                )}
                                style={{
                                    width: `${width}px`,
                                }}
                            >
                                <Command>
                                    <CommandInput
                                        id={ids.commandInput}
                                        placeholder={inputPlaceholder ?? "Search..."}
                                        className={cn(
                                            "w-full focus-visible:outline-none text-foreground",
                                            classes.commandInput
                                        )}
                                        ref={inputRef}
                                        onKeyDown={(e) => {
                                            if (
                                                (inputRef.current.value === "" &&
                                                    e.key === "Backspace" &&
                                                    open) ||
                                                e.key === "Escape"
                                            ) {
                                                setOpen(false);
                                            }
                                        }}
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            {noneFoundText ?? "Nothing was found"}
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {items.map((lang) => (
                                                <CommandItem
                                                    id={ids.commandItem}
                                                    className={cn("z-10", classes.commandItem)}
                                                    key={lang.value}
                                                    value={lang.value}
                                                    onSelect={(currentValue) => {
                                                        form.setValue(
                                                            name,
                                                            (currentValue === field.value
                                                                ? ""
                                                                : currentValue) as PathValue<T, typeof name>
                                                        );
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value === lang.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {lang.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContentNoPortal>
                        </Popover>
                    </>
                );
            }}
        />
    );
};
