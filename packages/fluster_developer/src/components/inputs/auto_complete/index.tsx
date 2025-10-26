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

type ValidValue = string | number;

export interface AutoCompleteOption<J extends ValidValue> {
    value: J;
    label: string;
}

interface AutoCompleteInputProps<T extends FieldValues, J extends ValidValue>
    extends FormInputProps<T> {
    options: AutoCompleteOption<J>[];
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
}

export const AutoCompleteInput = <T extends FieldValues, J extends ValidValue>({
    classes = {},
    label,
    desc,
    form,
    name,
    options,
    defaultDisplayValue = "Select item...",
    emptyValue = "None found",
    searchText = "Search items...",
}: AutoCompleteInputProps<T, J>): ReactNode => {
    const value = form.watch(name);
    const [open, setOpen] = useState(false);
    const [width, setWidth] = useState(0);
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
                        className={cn("w-[200px] justify-between", classes?.button)}
                        ref={button}
                    >
                        {value
                            ? options.find((opt) => opt.value === value)?.label
                            : defaultDisplayValue}
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
                        />
                        <CommandList className={classes.commandList}>
                            <CommandEmpty
                                className={cn("text-muted-foreground", classes.emptyItem)}
                            >
                                {emptyValue}
                            </CommandEmpty>
                            <CommandGroup>
                                {options.map((opt) => (
                                    <CommandItem
                                        className={classes.item}
                                        key={opt.value}
                                        value={
                                            typeof opt.value === "string"
                                                ? opt.value
                                                : opt.value.toString()
                                        }
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
