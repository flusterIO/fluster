import { PlotsProvider } from "#/plot/utils/plots_provider/provider";
import React, { type ReactNode } from "react";
import { usePlotRedraw } from "#/plot/state/hooks/use_plot_redraw";

interface MdxProviderGroupProps {
    children: ReactNode;
}

export const MdxProviderGroup = ({
    children,
}: MdxProviderGroupProps): ReactNode => {
    usePlotRedraw();
    return <PlotsProvider>{children}</PlotsProvider>;
};

MdxProviderGroup.displayName = "MdxProviderGroup";
