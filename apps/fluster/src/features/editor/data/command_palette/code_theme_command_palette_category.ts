import { CommandPaletteAnyEntry } from "#/command_palette/data/models/command_palette_any_entry";
import { CommandPaletteCategory } from "#/command_palette/data/models/command_palette_category";
import { GeneralCommandPaletteItem } from "#/command_palette/data/models/command_palette_item";
import { setCodeTheme } from "#/editor/state/slice";
import { getSupportedSyntaxThemes } from "#/snippets/data/get_supported_syntax_theme";
import store from "@/state/store";

class CommandPaletteDarkTheme extends CommandPaletteCategory {
  constructor() {
    super("Dark Mode");
  }
  async getItems(): Promise<CommandPaletteAnyEntry[]> {
    return getSupportedSyntaxThemes().map((x) => {
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
  async getItems(): Promise<CommandPaletteAnyEntry[]> {
    return getSupportedSyntaxThemes().map((x) => {
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
  async getItems(): Promise<CommandPaletteAnyEntry[]> {
    return [new CommandPaletteDarkTheme(), new CommandPaletteLightTheme()];
  }
}
