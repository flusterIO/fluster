import { DesktopHealthReport } from "@/lib/bindings";
import { useHealthContext } from "./hooks";

interface HealthReportData {
    report: DesktopHealthReport | null;
    requestNew: () => void;
}

export const useHealthReport = (): HealthReportData => {
    const state = useHealthContext();
    return {
        report: state.report,
        requestNew: () =>
            window.dispatchEvent(new CustomEvent("request-new-health-report", {})),
    };
};
