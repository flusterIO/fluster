import { CommandPaletteAnyEntry } from "#/command_palette/data/models/command_palette_any_entry";
import { CommandPaletteCategory } from "#/command_palette/data/models/command_palette_category";
import { GeneralCommandPaletteItem } from "#/command_palette/data/models/command_palette_item";
import { setCodeTheme } from "#/editor/state/slice";
import store from "@/state/store";
import { bundledSyntaxThemes } from "@fluster.io/dev";

class CommandPaletteDarkTheme extends CommandPaletteCategory {
    constructor() {
        super("Dark Mode");
    }
    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        return bundledSyntaxThemes.map((x) => {
            return new GeneralCommandPaletteItem(x, async () => {
                store.dispatch(
                    setCodeTheme({
                        themeMode: "dark",
                        value: x,
                    })
                );
            });
        });
    }
}

class CommandPaletteLightTheme extends CommandPaletteCategory {
    constructor() {
        super("Light Mode");
    }

    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        return bundledSyntaxThemes.map((x) => {
            return new GeneralCommandPaletteItem(x, async () => {
                store.dispatch(
                    setCodeTheme({
                        themeMode: "light",
                        value: x,
                    })
                );
            });
        });
    }
}

export class CodeThemeCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Syntax Theme");
    }

    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        return [new CommandPaletteDarkTheme(), new CommandPaletteLightTheme()];
    }
}
