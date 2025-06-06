import { DesktopHealthReport } from "@/lib/bindings";
import { useHealthContext } from "./hooks";
import { useEffect, useState } from "react";
import store from "@/state/store";
import { AppState } from "@/state/initial_state";

type CombinedHealthReport = DesktopHealthReport & {
    hasSetNotesDir: boolean;
};

interface HealthReportData {
    report: CombinedHealthReport | null;
    requestNew: () => void;
}

export const useHealthReport = (): HealthReportData => {
    const state = useHealthContext();
    const [hasSetNotesDir, setHasSetNotesDir] = useState(true);
    const handleStateChange = (): void => {
        const _state: AppState = store.getState();
        setHasSetNotesDir(Boolean(_state.core.notesDirectory.length));
    };
    useEffect(() => {
        const unsub = store.subscribe(handleStateChange);
        return () => unsub();
    }, []);
    return {
        report:
            state.report === null
                ? null
                : {
                    ...state.report,
                    hasSetNotesDir,
                    healthy: state.report.healthy && hasSetNotesDir,
                },
        requestNew: () =>
            window.dispatchEvent(new CustomEvent("request-new-health-report", {})),
    };
};
