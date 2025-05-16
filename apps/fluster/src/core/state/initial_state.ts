import { initialKeymapState } from "#/keymap/state/initial_keymap_state";
import { KeymapState } from "#/keymap/state/keymap_state";
import {
    CommandPaletteState,
    initialCommandPaletteState,
} from "../../features/command_palette/state/command_palette_state";
import {
    initialScaffoldState,
    ScaffoldState,
} from "../../features/scaffold/state/initial_state";

export interface AppState {
    commandPalette: CommandPaletteState;
    scaffold: ScaffoldState;
    keymap: KeymapState;
}

export const initialAppState: AppState = {
    commandPalette: initialCommandPaletteState,
    scaffold: initialScaffoldState,
    keymap: initialKeymapState,
};
