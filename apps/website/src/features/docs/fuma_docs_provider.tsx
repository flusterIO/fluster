"use client"
import { RootProvider } from "fumadocs-ui/provider";
import React, { type ReactNode } from "react";

interface FumaDocsProviderProps {
    children: ReactNode;
}

const FumaDocsProvider = (props: FumaDocsProviderProps): ReactNode => {
    return <RootProvider>{props.children}</RootProvider>;
};

FumaDocsProvider.displayName = "FumaDocsProvider";

export default FumaDocsProvider;
