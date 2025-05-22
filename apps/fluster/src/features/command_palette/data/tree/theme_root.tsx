import { themes } from "#/scaffold/state/initial_state";
import store from "@/state/store";
import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { setTheme, setThemeMode } from "#/scaffold/state/slice";

export class ThemeCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Themes");
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        return themes.map(
            (x) =>
                new GeneralCommandPaletteItem(x, async () => {
                    store.dispatch(setTheme(x));
                }),
        );
    }
}
