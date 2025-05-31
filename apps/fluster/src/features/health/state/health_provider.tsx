import React, { ReactNode, useReducer } from "react";
import { HealthContext } from "./health_context";
import { HealthState } from "./types";
import { HealthContextReducer } from "./health_reducer";
import { useEventListener, useIsomorphicLayoutEffect } from "@fluster.io/dev";
import { commands } from "@/lib/bindings";
import HealthOnboardingSwitch from "./health_onboarding_switch";
import { HealthDispatchContext } from "./health_dispatch_context";

interface HealthProviderProps {
    children: ReactNode;
    initialValues?: Partial<HealthState>;
}

declare global {
    interface WindowEventMap {
        "request-new-health-report": CustomEvent<object>;
    }
}

const defaultInitialValues: HealthState = {
    report: null,
    have_checked_health: false,
};

export const HealthProvider = ({
    children,
    initialValues,
}: HealthProviderProps) => {
    const [state, dispatch] = useReducer(
        HealthContextReducer,
        initialValues
            ? { ...initialValues, ...defaultInitialValues }
            : defaultInitialValues
    );

    const checkHealth = async (): Promise<void> => {
        const res = await commands.getDesktopHealthReport();
        dispatch({
            type: "set_health_report",
            payload: res,
        });
    };

    useEventListener("request-new-health-report", () => {
        checkHealth();
    });

    useIsomorphicLayoutEffect(() => {
        if (!state.have_checked_health) {
            checkHealth();
        }
    }, [state.have_checked_health]);

    return (
        <HealthContext.Provider value={state}>
            <HealthDispatchContext.Provider value={dispatch}>
                <HealthOnboardingSwitch>{children}</HealthOnboardingSwitch>
            </HealthDispatchContext.Provider>
        </HealthContext.Provider>
    );
};
