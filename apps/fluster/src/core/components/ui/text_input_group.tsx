import { ComponentProps, type ReactNode } from "react";
import { Input } from "./shad/input";
import { Label } from "./shad/label";

interface TextInputGroupProps {
    label: ReactNode;
    value: string;
    onChange: (val: string) => void;
    inputProps?: Omit<ComponentProps<typeof Input>, "onChange" | "value">;
}

const TextInputGroup = ({
    label,
    value,
    onChange,
    inputProps = {},
}: TextInputGroupProps): ReactNode => {
    return (
        <div className="flex flex-col justify-start items-start gap-2">
            <Label>{label}</Label>
            <Input
                {...inputProps}
                aria-label="kanban board name"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

TextInputGroup.displayName = "TextInputGroup";

export default TextInputGroup;
