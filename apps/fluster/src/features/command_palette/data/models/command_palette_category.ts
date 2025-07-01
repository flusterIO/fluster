import { Location } from "react-router";
import { CommandPaletteAnyEntry } from "./command_palette_any_entry";
import { ReactNode } from "react";
import { CommandPaletteState } from "#/command_palette/state/command_palette_provider";

export abstract class CommandPaletteCategory extends CommandPaletteAnyEntry {
  constructor(label: string, id: string) {
    super(label, id);
  }
  abstract filterByLocation(location: Location): boolean;
  abstract getItems(location: Location): Promise<CommandPaletteAnyEntry[]>;
  abstract bottomBar(state: CommandPaletteState): ReactNode;
}
