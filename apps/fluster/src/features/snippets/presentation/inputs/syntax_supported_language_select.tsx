import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getSupportedProgrammingLanguages } from "../../data/get_supported_languages";
import { Popover, PopoverContentNoPortal, PopoverTrigger } from "@fluster/dev";
import { Button } from "@fluster/dev";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@fluster/dev";
import { cn } from "@/lib/utils";

interface SyntaxSupportedLanguageSelectProps {
    value: string;
    onChange: (newVal: string) => void;
    classes: {
        button?: string;
        popover?: string;
        commandItem?: string;
        popoverContainer?: string;
        commandInput?: string;
    };
}

/* RESUME: Pick this back up once the enums are generated properly. */
const SyntaxSupportedLanguageSelect = ({
    value,
    onChange,
    classes,
}: SyntaxSupportedLanguageSelectProps): ReactNode => {
    const [width, setWidth] = useState(0);
    const buttonRef = useRef<HTMLButtonElement>(null!);
    const inputRef = useRef<HTMLInputElement>(null!);
    const languages = useMemo(
        () =>
            getSupportedProgrammingLanguages().map((x) => ({
                value: x,
                label: x,
            })),
        []
    );
    const [open, setOpen] = useState(false);
    const handleResize = () => {
        setWidth(buttonRef.current?.getBoundingClientRect().width ?? 0);
    };
    useEffect(() => console.log("width: ", width), [width]);
    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.addEventListener("resize", handleResize);
        }
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className={classes.popover}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("min-w-[200px] justify-between", classes.button)}
                    ref={buttonRef}
                >
                    {value
                        ? languages.find((lang) => lang.value === value)?.label
                        : "Select language..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContentNoPortal
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
                        placeholder="Search languages..."
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
                    <CommandList
                    /* style={{ */
                    /*     width: `${width}px`, */
                    /* }} */
                    >
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {languages.map((lang) => (
                                <CommandItem
                                    className={cn("z-10", classes.commandItem)}
                                    key={lang.value}
                                    value={lang.value}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === lang.value ? "opacity-100" : "opacity-0"
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
    );
};

SyntaxSupportedLanguageSelect.displayName = "SyntaxSupportedLanguageSelect";

export default SyntaxSupportedLanguageSelect;
