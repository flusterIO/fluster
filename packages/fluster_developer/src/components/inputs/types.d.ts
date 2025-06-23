import { type ReactNode } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface FormInputProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: ReactNode;
    desc?: string | null;
}
