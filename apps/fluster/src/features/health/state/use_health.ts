import { DesktopHealthReport } from "@/lib/bindings";
import { useHealthContext } from "./hooks";
import { useEffect } from "react";

interface HealthReportData {
    report: DesktopHealthReport | null;
    requestNew: () => void;
}

export const useHealthReport = (): HealthReportData => {
    const state = useHealthContext();
    useEffect(() => {
        console.info("Health: ", state);
    }, [state]);
    return {
        report: state.report,
        requestNew: () =>
            window.dispatchEvent(new CustomEvent("request-new-health-report", {})),
    };
};
