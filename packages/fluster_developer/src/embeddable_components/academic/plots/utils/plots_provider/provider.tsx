import React, { ReactNode, useReducer } from "react";
import {
    initialPlotsState,
    PlotsContext,
    PlotsContextReducer,
    PlotsDispatchContext,
    PlotsState,
} from "./context";

interface PlotsProviderProps {
    children: ReactNode;
    initialValues?: Partial<PlotsState>;
}

export const PlotsProvider = ({
    children,
    initialValues,
}: PlotsProviderProps) => {
    const [state, dispatch] = useReducer(
        PlotsContextReducer,
        initialValues
            ? { ...initialValues, ...initialPlotsState }
            : initialPlotsState
    );

    return (
        <PlotsContext.Provider value={state}>
            <PlotsDispatchContext.Provider value={dispatch}>
                {children}
            </PlotsDispatchContext.Provider>
        </PlotsContext.Provider>
    );
};
