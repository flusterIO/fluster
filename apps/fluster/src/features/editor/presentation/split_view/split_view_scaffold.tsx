import React, { type ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Outlet } from "react-router";
import CodeEditor, { CodeEditorProps } from "../code_editor/main";
import MdxContent from "#/mdx/presentation/mdx_content";

interface SplitViewScaffoldProps extends CodeEditorProps { }

const SplitViewContainer = ({
    onChange,
    value,
    language,
}: SplitViewScaffoldProps): ReactNode => {
    return (
        <PanelGroup autoSaveId={"splitview-panels"} direction="horizontal">
            <Panel id="editor-panel" order={1} defaultSize={50}>
                <CodeEditor language={language} value={value} onChange={onChange} />
            </Panel>
            <PanelResizeHandle />
            <Panel id="editor-output-panel" order={2} defaultSize={50}>
                <MdxContent className="p-6" mdx={value} />
            </Panel>
        </PanelGroup>
    );
};

SplitViewContainer.displayName = "SplitViewScaffold";

export default SplitViewContainer;
