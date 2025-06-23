import { H2 } from "@/components/typography/typography";
import React, { type ReactNode } from "react";

export const NoChatSelectedPlaceholder = (): ReactNode => {
    return (
        <div className="w-fit px-8">
            <H2>No chat selected</H2>
            <p className="mt-4">
                Use the left panel to create new chat sessions. The right panel modifies
                various AI parameters.
            </p>
        </div>
    );
};

NoChatSelectedPlaceholder.displayName = "NoChatSelectedPlaceholder";
