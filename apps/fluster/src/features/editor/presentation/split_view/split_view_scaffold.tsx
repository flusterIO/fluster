import { type ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor, { CodeEditorProps } from "../code_editor/main";
import { MdxContent } from "#/mdx/presentation/mdx_content";

type SplitViewScaffoldProps = Omit<CodeEditorProps, "themes" | "isModal">;

const SplitViewContainer = ({
    onChange,
    value,
    language,
}: SplitViewScaffoldProps): ReactNode => {
    return (
        <PanelGroup autoSaveId={"splitview-panels"} direction="horizontal">
            <Panel id="editor-panel" order={1} defaultSize={50}>
                <CodeEditor
                    isModal={false}
                    language={language}
                    value={value}
                    onChange={onChange}
                />
            </Panel>
            <PanelResizeHandle />
            <Panel id="editor-output-panel" order={2} defaultSize={50}>
                <MdxContent className="p-6 max-h-full overflow-y-auto" mdx={value} />
            </Panel>
        </PanelGroup>
    );
};

SplitViewContainer.displayName = "SplitViewScaffold";

export default SplitViewContainer;
