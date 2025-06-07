import { H3 } from "@/components/typography/typography";
import React, { type ReactNode } from "react";

const NoEquationsFound = (): ReactNode => {
    return (
        <div className="w-full flex flex-col justify-center items-center min-h-[calc(100vh-6rem)]">
            <div className="max-w-[580px] flex flex-col justify-center items-center">
                <H3 className="mb-4">No Equations Found</H3>
                <div className="text-center text-muted-foreground">
                    Fluster didn't find any equations in your database. Use the left panel
                    to create a new equation.
                </div>
            </div>
        </div>
    );
};

NoEquationsFound.displayName = "NoEquationsFound";

export default NoEquationsFound;
