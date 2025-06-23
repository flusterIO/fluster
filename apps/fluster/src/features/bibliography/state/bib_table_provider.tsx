import React, { useReducer } from "react";
import {
    BibTableContext,
    BibTableContextReducer,
    BibTableDispatchContext,
    BibTableProviderProps,
    defaultInitialBibTableState,
} from "./bib_table_context";

export const BibTableProvider = ({
    children,
    initialValues,
}: BibTableProviderProps) => {
    const [state, dispatch] = useReducer(
        BibTableContextReducer,
        initialValues
            ? { ...initialValues, ...defaultInitialBibTableState }
            : defaultInitialBibTableState
    );

    return (
        <BibTableContext.Provider value={state}>
            <BibTableDispatchContext.Provider value={dispatch}>
                {children}
            </BibTableDispatchContext.Provider>
        </BibTableContext.Provider>
    );
};
