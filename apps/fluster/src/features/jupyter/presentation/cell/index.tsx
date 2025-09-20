import CodeEditor from "#/editor/presentation/code_editor/main";
import React, { useState, type ReactNode } from "react";
import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";

const connector = connect((state: AppState) => ({
    jupyterState: state.code.jupyter,
}));

interface JupyterCellProps {
    body?: string;
    /** Set run to true to automatically execute this cell when first opening the containing note. */
    run?: boolean;
    jupyterState: AppState["code"]["jupyter"];
}

export const JupyterCell = connector((props: JupyterCellProps): ReactNode => {
    const [body, setBody] = useState(props.body ?? "");
    const [output, setOutput] = useState("");

    const handleSubmission = async (): Promise<void> => {
        const res = ""; // Actually get data here obviously
        setOutput(res);
    };

    return (
        <div className="w-full max-w-[min(90%,1080px)]">
            <CodeEditor
                value={body}
                language="python"
                onChange={(newVal) => setBody(newVal)}
                onCmdEnter={handleSubmission}
                classes={{
                    container: "w-full",
                    editor: "min-h-[min(250px,90vh)] max-h-[90vh] w-full",
                }}
            />
            <div dangerouslySetInnerHTML={{ __html: output }} />
        </div>
    );
});

JupyterCell.displayName = "JupyterCell";
