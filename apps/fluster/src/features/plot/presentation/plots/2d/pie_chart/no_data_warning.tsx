import { CodeBlock, H3 } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { connect } from "react-redux";

import { AppState } from "@/state/initial_state";
import { useDarkMode } from "@/hooks/use_dark_mode";
const connector = connect((state: AppState) => ({
    themes: state.code.theme,
}));

interface PieChartNoDataWarningProps {
    themes: AppState["code"]["theme"];
}

export const PieChartNoDataWarning = connector(
    ({ themes }: PieChartNoDataWarningProps): ReactNode => {
        const darkMode = useDarkMode();
        return (
            <div className="w-full h-fit flex flex-col justify-center items-center">
                <H3 className="mb-2">No data provided to pie chart</H3>
                <div className="text-sm text-center text-muted-foreground">
                    Use the following syntax to provide data to your chart.
                </div>
                <CodeBlock
                    className="max-w-[400px]"
                    themes={themes}
                    darkMode={darkMode}
                    lang="jsx"
                    code={`<PieChart data={[
        {
            label: "Hot Dogs",
            value: 412
        },
        {
            label: "Hamburgers",
            value: 82
        }
    ]}
/>`}
                />
            </div>
        );
    }
);

PieChartNoDataWarning.displayName = "PieChartNoDataWarning";
