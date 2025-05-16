import {
    CommandPaletteState,
    initialCommandPaletteState,
} from "../../features/command_palette/state/command_palette_state";
import {
    initialScaffoldState,
    ScaffoldState,
} from "../../features/scaffold/state/initial_state";

interface AppState {
    commandPalette: CommandPaletteState;
    scaffold: ScaffoldState;
}

export const initialAppState: AppState = {
    commandPalette: initialCommandPaletteState,
    scaffold: initialScaffoldState,
};
