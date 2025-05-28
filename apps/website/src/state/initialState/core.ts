import { ReactNode } from "react";

export interface NavbarButton {
    href: string;
    label: ReactNode;
    id: string;
    active?: boolean
}


export type InitialCoreState = {
    hasRendered: boolean;
    landingSection: string;
    navbarButtons: NavbarButton[];
    drawer: {
        open: boolean;
        description?: string;
        title?: string;
        breakpoint: number
    };
};

export const initialCoreState: InitialCoreState = {
    hasRendered: false,
    landingSection: "hero",
    navbarButtons: [],
    drawer: {
        open: false,
        breakpoint: 1024
    },
};
