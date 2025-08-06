import { PlotsProvider } from "#/plot/utils/plots_provider/provider";
import React, { type ReactNode } from "react";
import { usePlotRedraw } from "#/plot/state/hooks/use_plot_redraw";
import { ImagePageListener, MdxImageProvider } from "@fluster.io/dev";

interface MdxProviderGroupProps {
    children: ReactNode;
}

export const MdxProviderGroup = ({
    children,
}: MdxProviderGroupProps): ReactNode => {
    usePlotRedraw();
    return (
        <PlotsProvider>
            <MdxImageProvider>
                <ImagePageListener />
                {/* <TaskManagerTimerHandler /> */}
                {children}
            </MdxImageProvider>
        </PlotsProvider>
    );
};

MdxProviderGroup.displayName = "MdxProviderGroup";
