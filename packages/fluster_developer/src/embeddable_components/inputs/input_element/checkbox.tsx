import React, { useRef, type ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "../../../hooks/use_isomorphic_effect";
import { Checkbox } from "../../../components/shad/checkbox";

interface MdxCheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
}

export const MdxCheckbox = (props: MdxCheckboxProps): ReactNode => {
    const ref = useRef<HTMLButtonElement>(null!);
    const removeLiMarker = () => {
        if (!ref.current) return;
        if (ref.current.parentElement?.nodeName?.toLowerCase() === "li") {
            ref.current.parentElement.classList.add("hide-li-marker");
        }
    };

    useIsomorphicLayoutEffect(() => {
        removeLiMarker();
    }, []);

    return (
        <Checkbox
            ref={ref}
            disabled={props.disabled}
            checked={props.checked || props.defaultChecked}
        />
    );
};

MdxCheckbox.displayName = "MdxCheckbox";
