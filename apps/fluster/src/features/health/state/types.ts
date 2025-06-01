import { DesktopHealthReport } from "@/lib/bindings";

export interface HealthState {
    report: DesktopHealthReport | null;
    have_checked_health: boolean | "checking";
}

export type HealthContextActions =
    | {
        type: "set_health_report";
        payload: DesktopHealthReport;
    }
    | {
        type: "set_health_report_as_being_checked";
        payload: null;
    };
