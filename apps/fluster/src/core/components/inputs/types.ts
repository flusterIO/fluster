import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface FormInputProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
}
