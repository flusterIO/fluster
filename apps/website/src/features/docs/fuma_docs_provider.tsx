"use client";
import { RootProvider } from "fumadocs-ui/provider";
import React, { type ReactNode } from "react";

interface FumaDocsProviderProps {
    children: ReactNode;
}

const FumaDocsProvider = (props: FumaDocsProviderProps): ReactNode => {
    return (
        <RootProvider
            theme={{
                enabled: true,
                enableSystem: false,
                forcedTheme: "dark",
                defaultTheme: "dark",
                enableColorScheme: true,
                themes: ["dark"],
                attribute: "class",
                value: {
                    dark: "dark",
                },
                /* value: ValueOb */
            }}
        >
            {props.children}
        </RootProvider>
    );
};

FumaDocsProvider.displayName = "FumaDocsProvider";

export default FumaDocsProvider;
