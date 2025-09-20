import { cn } from "#/core/utils/cn";
import { ReactNode } from "react";

export const Admonition = (props: {
    title: ReactNode;
    children: ReactNode;
    titleClasses?: string;
}) => {
    return (
        <div className="w-full h-fit">
            <div
                className={cn(
                    "text-xl font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-tl-md rounded-tr-md",
                    props.titleClasses
                )}
            >
                {props.title}
            </div>
            <div className="border rounded-bl-md rounded-br-md px-4 bg-card">
                {props.children}
            </div>
        </div>
    );
};
