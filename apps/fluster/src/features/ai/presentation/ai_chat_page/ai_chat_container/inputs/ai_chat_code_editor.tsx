import CodeEditor from "#/editor/presentation/code_editor/main";
import { useSidePanelEditorActions } from "#/editor/state/hooks/use_side_panel_actions";
import React, { type ReactNode } from "react";

export const AiChatCodeEditor = ({
  handleSubmit,
  id,
  value,
  onChange,
}: {
  handleSubmit: () => Promise<void>;
  id: string;
  value: string;
  onChange: (s: string) => void;
}): ReactNode => {
  const sidePanelActions = useSidePanelEditorActions();
  return (
    <div id={id} className="w-full h-[200px]">
      <CodeEditor
        isModal={false}
        value={value}
        onChange={onChange}
        language="mdx"
        onCmdEnter={handleSubmit}
        actions={sidePanelActions}
      />
    </div>
  );
};

AiChatCodeEditor.displayName = "AiChatCodeEditor";
