import { useMemo, useState, type ReactNode } from "react";
import { getSupportedProgrammingLanguages } from "../../data/get_supported_languages";
import {
  Popover,
  PopoverContent,
  PopoverContentNoPortal,
  PopoverTrigger,
} from "@/components/ui/shad/popover";
import { Button } from "@/components/ui/shad/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/shad/command";
import { cn } from "@/lib/utils";

interface SyntaxSupportedLanguageSelectProps {
  value: string;
  onChange: (newVal: string) => void;
  classes: {
    button?: string;
    popover?: string;
  };
}

/* RESUME: Pick this back up once the enums are generated properly. */
const SyntaxSupportedLanguageSelect = ({
  value,
  onChange,
  classes,
}: SyntaxSupportedLanguageSelectProps): ReactNode => {
  const languages = useMemo(
    () =>
      getSupportedProgrammingLanguages().map((x) => ({
        value: x,
        label: x,
      })),
    [],
  );
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={classes.popover}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("min-w-[200px] justify-between", classes.button)}
          onClick={() => setOpen(true)}
        >
          {value
            ? languages.find((lang) => lang.value === value)?.label
            : "Select language..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContentNoPortal className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search languages..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {languages.map((lang) => (
                <CommandItem
                  className="z-10"
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
                      value === lang.value ? "opacity-100" : "opacity-0",
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
