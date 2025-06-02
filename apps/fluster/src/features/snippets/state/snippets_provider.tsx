"use client";
import React, { ReactNode, useReducer } from "react";
import {
    defaultInitialSnippetState,
    SnippetContext,
    SnippetContextReducer,
    SnippetDispatchContext,
    SnippetState,
} from "./snippet_context";

interface SnippetProviderProps {
    children: ReactNode;
    initialValues?: Partial<SnippetState>;
}

export const SnippetProvider = ({
    children,
    initialValues,
}: SnippetProviderProps) => {
    const [state, dispatch] = useReducer(
        SnippetContextReducer,
        initialValues
            ? { ...defaultInitialSnippetState, ...initialValues }
            : defaultInitialSnippetState
    );

    return (
        <SnippetContext.Provider value={state}>
            <SnippetDispatchContext.Provider value={dispatch}>
                {children}
            </SnippetDispatchContext.Provider>
        </SnippetContext.Provider>
    );
};
