import { EditorAction } from "#/editor/data/types";
import { togglePanelLeft } from "#/panel_left/state/slice";
import { togglePanelRight } from "#/panel_right/state/slice";
import { KeyCode, KeyMod } from "monaco-editor";
import { useDispatch } from "react-redux";

export const useSidePanelEditorActions = (): EditorAction[] => {
    const dispatch = useDispatch();
    return [
        {
            // an unique identifier of the contributed action
            id: "toggle-left-panel",
            // a label of the action that will be presented to the user
            label: "Toggle Left Panel",
            keybindings: [KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyL],
            // the method that will be executed when the action is triggered.
            run: function () {
                dispatch(togglePanelLeft());
            },
        },
        {
            // an unique identifier of the contributed action
            id: "toggle-right-panel",
            // a label of the action that will be presented to the user
            label: "Toggle Right Panel",
            keybindings: [KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyR],
            // the method that will be executed when the action is triggered.
            run: function () {
                dispatch(togglePanelRight());
            },
        },
    ];
};
