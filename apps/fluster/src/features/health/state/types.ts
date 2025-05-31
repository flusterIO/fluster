import { DesktopHealthReport } from "@/lib/bindings";

export interface HealthState {
    report: DesktopHealthReport | null;
    have_checked_health: boolean;
}

export type HealthContextActions = {
    type: "set_health_report";
    payload: DesktopHealthReport;
};
