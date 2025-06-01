import { useHealthReport } from "#/health/state/use_health";
import { commands } from "@/lib/bindings";
import React, { useEffect, useState, type ReactNode } from "react";

const MathjaxScript = (): ReactNode => {
    const [src, setSrc] = useState<null | string>(null);
    const healthState = useHealthReport();
    const getMathjaxPath = async (): Promise<void> => {
        const res = await commands.getMathjaxPath();
        if (res.length) {
            setSrc(res);
        }
    };
    useEffect(() => {
        if (healthState.report?.healthy) {
            getMathjaxPath();
        }
    }, [healthState.report, healthState.requestNew]);
    if (src === null) {
        return null;
    }
    return <script src={src} async />;
};

MathjaxScript.displayName = "MathjaxScript";

export default MathjaxScript;
