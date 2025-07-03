import React, { type ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor, { CodeEditorProps } from "../code_editor/main";
import { MdxContent } from "#/mdx/presentation/mdx_content";

interface SplitViewScaffoldProps
  extends Omit<CodeEditorProps, "themes" | "isModal"> {
  autoSaveId?: string;
}

const SplitViewContainer = ({
  onChange,
  value,
  language,
  autoSaveId = "splitview-panels",
  ...props
}: SplitViewScaffoldProps): ReactNode => {
  return (
    <PanelGroup autoSaveId={autoSaveId} direction="horizontal">
      <Panel id="editor-panel" order={1} defaultSize={50}>
        <CodeEditor
          {...props}
          language={language}
          value={value}
          onChange={onChange}
        />
      </Panel>
      <PanelResizeHandle />
      <Panel
        id="editor-output-panel"
        className="bg-background"
        order={2}
        defaultSize={50}
      >
        <MdxContent
          removeGrayMatter
          className="p-6 max-h-full overflow-y-auto"
          mdx={value}
        />
      </Panel>
    </PanelGroup>
  );
};

SplitViewContainer.displayName = "SplitViewScaffold";

export default SplitViewContainer;
