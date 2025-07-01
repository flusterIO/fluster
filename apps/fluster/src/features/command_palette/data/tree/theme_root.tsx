import { themes } from "#/scaffold/state/initial_state";
import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { setTheme } from "#/scaffold/state/actions/set_theme";
import { ReactNode } from "react";

export class ThemeCommandPaletteRoot extends CommandPaletteCategory {
  constructor() {
    super("Themes", "cmd-palette-themes");
  }
  filterByLocation(): boolean {
    return true;
  }
  bottomBar(): ReactNode {
    return null;
  }
  async getItems(): Promise<CommandPaletteAnyEntry[]> {
    return themes.map(
      (x) =>
        new GeneralCommandPaletteItem(x, `theme-${x}`, async () => {
          setTheme(x);
        })
    );
  }
}
