import { CodeState } from "#/editor/state/code_state";
import { initialCodeState } from "#/editor/state/initial_state";
import { initialKeymapState } from "#/keymap/state/initial_keymap_state";
import { KeymapState } from "#/keymap/state/keymap_state";
import { initialPanelBottomState } from "#/panel_bottom/state/initial_state";
import { PanelBottomState } from "#/panel_bottom/state/panel_bottom_state";
import { initialPanelLeftState } from "#/panel_left/state/initial_state";
import { PanelLeftState } from "#/panel_left/state/panel_left_state";
import { initialPanelRightState } from "#/panel_right/state/initial_state";
import { PanelRightState } from "#/panel_right/state/panel_right_state";
import { initialToastState } from "#/toast_notification/state/initial_toast_state";
import { ToastState } from "#/toast_notification/state/toast_state";
import {
    initialScaffoldState,
    ScaffoldState,
} from "../../features/scaffold/state/initial_state";

export interface AppState {
    scaffold: ScaffoldState;
    keymap: KeymapState;
    toast: ToastState;
    panelLeft: PanelLeftState;
    panelRight: PanelRightState;
    panelBottom: PanelBottomState;
    code: CodeState;
}

export const initialAppState: AppState = {
    scaffold: initialScaffoldState,
    keymap: initialKeymapState,
    toast: initialToastState,
    panelLeft: initialPanelLeftState,
    panelRight: initialPanelRightState,
    panelBottom: initialPanelBottomState,
    code: initialCodeState,
};
