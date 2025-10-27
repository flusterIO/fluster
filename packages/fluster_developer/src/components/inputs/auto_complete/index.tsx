import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { FieldValues, PathValue } from "react-hook-form";
import { FormInputProps } from "../types";
import { Popover, PopoverContent, PopoverTrigger } from "../../shad/popover";
import {
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    Command,
} from "../../shad/command";
import { Button } from "../../shad/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../../utils/cn";
import { useEventListener } from "../../../hooks/use_event_listener";
import { FormDescription, FormItem, FormLabel } from "../../shad/form";

export interface AutoCompleteOption {
    value: string;
    label: string;
}

interface AutoCompleteInputProps<T extends FieldValues>
    extends FormInputProps<T> {
    options: AutoCompleteOption[];
    classes?: {
        input?: string;
        container?: string;
        button?: string;
        item?: string;
        command?: string;
        commandList?: string;
        popoverContent?: string;
        emptyItem?: string;
    };
    emptyValue?: string;
    defaultDisplayValue?: string;
    searchText?: string;
    onCreateItem: (value: string) => void;
}

export const AutoCompleteInput = <T extends FieldValues>({
    classes = {},
    label,
    desc,
    form,
    name,
    options,
    defaultDisplayValue = "Select item...",
    emptyValue = "None found",
    searchText = "Search items...",
    onCreateItem,
}: AutoCompleteInputProps<T>): ReactNode => {
    const value = form.watch(name);
    const [open, setOpen] = useState(false);
    const [width, setWidth] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const button = useRef<HTMLButtonElement>(null);
    const handleWidth = (): void => {
        setWidth(button.current?.getBoundingClientRect().width ?? 0);
    };
    useEffect(() => {
        window.addEventListener("resize", handleWidth);
        handleWidth();
        return () => window.removeEventListener("resize", handleWidth);
    }, []);
    useEventListener("main-panel-resize", () => {
        handleWidth();
    });
    return (
        <FormItem className={cn("w-full", classes.container)}>
            <FormLabel>{label}</FormLabel>
            <Popover
                open={open}
                onOpenChange={(newOpen) => {
                    if (newOpen) {
                        handleWidth();
                    }
                    setOpen(newOpen);
                }}
            >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-[200px] justify-between flex flex-row",
                            classes?.button
                        )}
                        ref={button}
                    >
                        <span className="flex-grow text-left">
                            {options.find((opt) => opt.value === value)?.label ?? value.length
                                ? value
                                : defaultDisplayValue}
                        </span>
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    style={{
                        width: `${width}px`,
                    }}
                    className={cn("w-[200px] p-0", classes.popoverContent)}
                >
                    <Command className={classes.command}>
                        <CommandInput
                            placeholder={searchText}
                            className={cn("h-9 text-foreground outline-none", classes.input)}
                            iconClassName="text-foreground"
                            value={inputValue}
                            onValueChange={setInputValue}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onCreateItem((e.target as HTMLInputElement).value);
                                    setOpen(false);
                                }
                            }}
                        />
                        <CommandList className={classes.commandList}>
                            <CommandEmpty
                                className={cn(
                                    "text-muted-foreground",
                                    classes.emptyItem,
                                    options.length === 0 && "hidden"
                                )}
                            >
                                {emptyValue}
                            </CommandEmpty>
                            <CommandGroup>
                                {options.map((opt) => (
                                    <CommandItem
                                        className={classes.item}
                                        key={opt.value}
                                        value={opt.value}
                                        onSelect={(currentValue) => {
                                            form.setValue(
                                                name,
                                                currentValue === value
                                                    ? ("" as PathValue<T, typeof name>)
                                                    : (currentValue as PathValue<T, typeof name>)
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        {opt.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === opt.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {desc && <FormDescription>{desc}</FormDescription>}
        </FormItem>
    );
};

AutoCompleteInput.displayName = "AutoCompleteInput";
