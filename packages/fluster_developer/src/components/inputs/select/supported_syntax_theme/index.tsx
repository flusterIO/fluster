import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContentNoPortal,
  PopoverTrigger,
} from "../../../shad/popover";
import { cn } from "../../../../utils/cn";
import { bundledSyntaxThemes } from "../../../../utils/bundled_syntax_themes";
import { Button } from "../../../shad/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../shad/command";
import { FormInputProps } from "../../types";
import { FieldValues, PathValue } from "react-hook-form";
import { FormField } from "../../../shad/form";
import { Label } from "../../../shad/label";

interface SyntaxSupportedThemeSelectProps<T extends FieldValues>
  extends FormInputProps<T> {
  classes?: {
    button?: string;
    popover?: string;
    commandItem?: string;
    popoverContainer?: string;
    commandInput?: string;
    label?: string;
  };
}

/// A utility combobox that is already populated with all of  the supported themes.
export const SyntaxSupportedThemeSelect = <T extends FieldValues>({
  form,
  name,
  label,
  classes = {},
}: SyntaxSupportedThemeSelectProps<T>): ReactNode => {
  const [width, setWidth] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);
  const themes = useMemo(
    () =>
      bundledSyntaxThemes.map((x) => ({
        value: x,
        label: x,
      })),
    []
  );
  const [open, setOpen] = useState(false);
  const handleResize = () => {
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
            <Label className={cn("mb-2", classes.label)}>{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className={classes.popover}>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "min-w-[200px] justify-between",
                    classes.button
                  )}
                  ref={buttonRef}
                >
                  {field.value
                    ? themes.find((thme) => thme.value === field.value)?.label
                    : "Select theme..."}
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
                    placeholder="Search themes..."
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
                    <CommandEmpty>No theme found.</CommandEmpty>
                    <CommandGroup>
                      {themes.map((thm) => (
                        <CommandItem
                          className={cn("z-10", classes.commandItem)}
                          key={thm.value}
                          value={thm.value}
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
                              field.value === thm.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {thm.label}
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

SyntaxSupportedThemeSelect.displayName = "SyntaxSupportedThemeSelect";
