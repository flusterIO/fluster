import { ReactNode } from "react";

export interface Size {
    width: number;
    height: number;
}

export interface ChildProps {
    children: ReactNode;
}

export interface ClassNameProp {
    className?: string;
}
