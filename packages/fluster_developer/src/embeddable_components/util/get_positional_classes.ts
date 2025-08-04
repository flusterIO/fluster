import { cn } from "../../utils/cn";
import { PositionableProps } from "../types";

export const getPositionableClasses = (props: PositionableProps): string => {
    return cn(
        props.sidebar && "w-full @[768px]/mdx:w-1/3 mr-4 ml-0",
        props.sidebar && props.right && "float-right ml-4 mr-0",
        props.center && "block ml-auto mr-auto"
    );
};
