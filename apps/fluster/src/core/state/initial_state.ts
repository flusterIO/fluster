import { BibliographyState } from "#/bibliography/state/bib_state";
import { initialBibliographyState } from "#/bibliography/state/initial_state";
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
import { CoreSettings } from "#/settings/state/core_settings";
import { initialCoreSettings } from "#/settings/state/initial_core_settings";
import {
  initialScaffoldState,
  ScaffoldState,
} from "../../features/scaffold/state/initial_state";

export interface AppState {
  scaffold: ScaffoldState;
  keymap: KeymapState;
  panelLeft: PanelLeftState;
  panelRight: PanelRightState;
  panelBottom: PanelBottomState;
  code: CodeState;
  bib: BibliographyState;
  core: CoreSettings;
}

export const initialAppState: AppState = {
  scaffold: initialScaffoldState,
  keymap: initialKeymapState,
  panelLeft: initialPanelLeftState,
  panelRight: initialPanelRightState,
  panelBottom: initialPanelBottomState,
  code: initialCodeState,
  bib: initialBibliographyState,
  core: initialCoreSettings,
};
