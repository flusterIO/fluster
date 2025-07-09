import { ComingSoon } from "@/components/coming_soon";
import React, { type ReactNode } from "react";

export const EquationSearchPanelRight = (): ReactNode => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <ComingSoon
                classes={{
                    title: "!text-2xl !mb-0",
                    body: "text-sm",
                }}
                featureName="equation search"
            />
        </div>
    );
};

EquationSearchPanelRight.displayName = "EquationSearchPanelRight";
