import { HealthContextActions, HealthState } from "./types";

export const HealthContextReducer = (
    state: HealthState,
    action: HealthContextActions
): HealthState => {
    switch (action.type) {
        case "set_health_report": {
            return {
                ...state,
                have_checked_health: true,
                report: action.payload,
            };
        }
        case "set_health_report_as_being_checked": {
            return {
                ...state,
                have_checked_health: "checking",
                report: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

HealthContextReducer.displayName = "HealthContextReducer";
