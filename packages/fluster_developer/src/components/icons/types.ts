import { HTMLProps } from "react";

export interface IconProps
    extends Omit<HTMLProps<SVGSVGElement>, "width" | "height" | "viewbox"> {
    className?: string;
}
