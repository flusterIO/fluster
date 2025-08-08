import { cn } from "../../utils/cn";
import { PositionableProps } from "../types";

export const getPositionableClasses = (props: PositionableProps): string => {
    const x = [];
    if (props.sidebar) {
        x.push(
            "w-full min-w-full @[768px]/mdx:w-1/3 @[768px]/mdx:min-w-[33%] mr-4 ml-0"
        );
        if (props.right) {
            x.push("float-right ml-4 mr-0");
        } else {
            x.push("float-left mr-4 ml-0");
        }
    } else if (props.center) {
        x.push("block ml-auto mr-auto");
    }
    return cn(...x);
};
