import { useHealthReport } from "#/health/state/use_health";
import { commands } from "@/lib/bindings";
import React, { useEffect, useState, type ReactNode } from "react";

export const MathjaxConfigScript = () => {
    return (
        <script type="text/x-mathjax-config" id="mathjax-settings">
            {`window.MathJax = {
 "HTML-CSS": {linebreaks: { automatic: true }},
  tex: {
    inlineMath: [['$', '$']]
  },
  menuSettings: {
    autocollapse: true
  },
  chtml: {
    minScale: 0.2,
    fontURL: "/font/mathjax",
  }
}`}
        </script>
    );
};

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
    return (
        <>
            <MathjaxConfigScript />
            <script
                src={
                    "/Users/bigsexy/Library/Application Support/Fluster/data/mathjax/tex-chtml.js"
                }
                async
            />
        </>
    );
};

MathjaxScript.displayName = "MathjaxScript";

export default MathjaxScript;
