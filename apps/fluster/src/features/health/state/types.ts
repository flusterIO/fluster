import { DesktopHealthReport } from "@/lib/bindings";

export type CombinedHealthReport = DesktopHealthReport & {
    hasSetNotesDir: boolean;
};

export interface HealthState {
    report: CombinedHealthReport | null;
    have_checked_health: boolean | "checking";
}

export type HealthContextActions =
    | {
        type: "set_health_report";
        payload: CombinedHealthReport;
    }
    | {
        type: "set_health_report_as_being_checked";
        payload: null;
    };
