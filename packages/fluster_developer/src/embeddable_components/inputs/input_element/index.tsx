import React, {
    DetailedHTMLProps,
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
} from "react";
import { Input } from "../../../components/shad/input";
import { MdxCheckbox } from "./checkbox";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface MdxInputProps
    extends Omit<
        DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
        "type"
    > {
    type?: HTMLInputTypeAttribute;
    defaultChecked?: boolean;
}

export const MdxInput = (props: MdxInputProps) => {
    if (props.type === "checkbox") {
        return <MdxCheckbox checked={props.checked || props.defaultChecked} />;
    }
    return <Input {...(props as InputProps)} />;
};
