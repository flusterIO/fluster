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
        default: {
            return state;
        }
    }
};

HealthContextReducer.displayName = "HealthContextReducer";
