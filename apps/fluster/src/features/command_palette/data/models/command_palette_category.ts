import { CommandPaletteAnyEntry } from "./command_palette_any_entry";

export abstract class CommandPaletteCategory extends CommandPaletteAnyEntry {
  constructor(label: string) {
    super(label);
  }
  abstract getItems(): Promise<CommandPaletteAnyEntry[]>;
}
