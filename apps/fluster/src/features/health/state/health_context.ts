import { createContext } from "react";
import { HealthState } from "./types";

export const HealthContext = createContext<HealthState>({
    report: null,
    have_checked_health: false,
});
