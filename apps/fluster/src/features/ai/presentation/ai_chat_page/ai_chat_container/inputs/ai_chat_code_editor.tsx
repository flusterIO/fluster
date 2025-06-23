import {
    useAiChatContext,
    useAiChatDispatch,
} from "#/ai/state/chat/chat_context";
import CodeEditor from "#/editor/presentation/code_editor/main";
import { useSidePanelEditorActions } from "#/editor/state/hooks/use_side_panel_actions";
import React, { type ReactNode } from "react";

export const AiChatCodeEditor = ({
    handleSubmit,
    id,
}: {
    handleSubmit: () => Promise<void>;
    id: string;
}): ReactNode => {
    const state = useAiChatContext();
    const dispatch = useAiChatDispatch();
    const sidePanelActions = useSidePanelEditorActions();
    return (
        <div id={id} className="w-full h-[200px]">
            <CodeEditor
                isModal={false}
                value={state.inputValue}
                onChange={(val) =>
                    dispatch({
                        type: "setChatInputValue",
                        payload: val,
                    })
                }
                language="mdx"
                onCmdEnter={handleSubmit}
                actions={sidePanelActions}
            />
        </div>
    );
};

AiChatCodeEditor.displayName = "AiChatCodeEditor";
