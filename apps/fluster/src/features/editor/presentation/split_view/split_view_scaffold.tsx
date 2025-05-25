import React, { type ReactNode } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import { Outlet } from "react-router";
import CodeEditor, { CodeEditorProps } from "../code_editor/main";

interface SplitViewScaffoldProps extends CodeEditorProps { }

const SplitViewContainer = ({
    onChange,
    value,
    defaultLang,
}: SplitViewScaffoldProps): ReactNode => {
    return (
        <PanelGroup autoSaveId={"splitview-panels"} direction="horizontal">
            <Panel id="editor-panel" order={1} defaultSize={50}>
                <CodeEditor
                    defaultLang={defaultLang}
                    value={value}
                    onChange={onChange}
                />
            </Panel>
            <Panel id="editor-output-panel" order={2} defaultSize={50}>
                <Outlet />
            </Panel>
        </PanelGroup>
    );
};

SplitViewContainer.displayName = "SplitViewScaffold";

export default SplitViewContainer;
