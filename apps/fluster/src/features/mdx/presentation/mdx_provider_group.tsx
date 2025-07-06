import React, { type ReactNode } from "react";
import { PlotsProvider } from "@fluster.io/dev";

interface MdxProvidersGroupProps {
    children: ReactNode;
}

export const MdxProvidersGroup = ({
    children,
}: MdxProvidersGroupProps): ReactNode => {
    return <PlotsProvider>{children}</PlotsProvider>;
};

MdxProvidersGroup.displayName = "MdxProvidersGroup";
