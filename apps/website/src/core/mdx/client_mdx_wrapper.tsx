"use client";
import React, { type ReactNode } from "react";
import { getMDXComponents } from "./mdx_component_map";
import { MDXContent } from "@content-collections/mdx/react";

interface ClientMdxWrapperProps {
    body: string;
}

export const ClientMdxWrapper = (props: ClientMdxWrapperProps): ReactNode => {
    return <MDXContent code={props.body} components={getMDXComponents()} />;
};

ClientMdxWrapper.displayName = "ClientMdxWrapper";
