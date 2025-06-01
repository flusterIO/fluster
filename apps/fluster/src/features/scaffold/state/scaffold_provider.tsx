import React, { ReactNode, useReducer } from "react";
import {
    DesktopScaffoldContext,
    DesktopScaffoldContextReducer,
    desktopScaffoldDefaultInitialValues,
    DesktopScaffoldDispatchContext,
    DesktopScaffoldState,
} from "./scaffold_context";

interface DesktopScaffoldProviderProps {
    children: ReactNode;
    initialValues?: Partial<DesktopScaffoldState>;
}

export const DesktopScaffoldProvider = ({
    children,
    initialValues,
}: DesktopScaffoldProviderProps) => {
    const [state, dispatch] = useReducer(
        DesktopScaffoldContextReducer,
        initialValues
            ? { ...initialValues, ...desktopScaffoldDefaultInitialValues }
            : desktopScaffoldDefaultInitialValues
    );

    return (
        <DesktopScaffoldContext.Provider value={state}>
            <DesktopScaffoldDispatchContext.Provider value={dispatch}>
                {children}
            </DesktopScaffoldDispatchContext.Provider>
        </DesktopScaffoldContext.Provider>
    );
};
