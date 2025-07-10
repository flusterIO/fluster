import { PlotsProvider } from "#/plot/utils/plots_provider/provider";
import React, { type ReactNode } from "react";

interface MdxProvidersGroupProps {
    children: ReactNode;
}

export const MdxProvidersGroup = ({
    children,
}: MdxProvidersGroupProps): ReactNode => {
    return <PlotsProvider>{children}</PlotsProvider>;
};

MdxProvidersGroup.displayName = "MdxProvidersGroup";
