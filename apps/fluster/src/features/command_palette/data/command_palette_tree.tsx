import store from "@/state/store";
import { CommandPaletteAnyEntry } from "./models/command_palette_any_entry";
import { CommandPaletteCategory } from "./models/command_palette_category";
import { GeneralCommandPaletteItem } from "./models/command_palette_item";
import { NavigationCommandPaletteRoot } from "./tree/navigation_root";
import { toggleDarkMode } from "#/scaffold/state/slice";

export class CommandPaletteRoot extends CommandPaletteCategory {
  constructor() {
    super("Home");
  }
  async getItems(): Promise<CommandPaletteAnyEntry[]> {
    return [
      new NavigationCommandPaletteRoot(),
      new GeneralCommandPaletteItem("Toggle Dark Mode", async () => {
        store.dispatch(toggleDarkMode());
      }),
    ];
  }
}
