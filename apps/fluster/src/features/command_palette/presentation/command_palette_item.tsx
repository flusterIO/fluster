import { type ReactNode } from "react";
import { CommandPaletteAnyEntry } from "../data/models/command_palette_any_entry";

interface CommandPaletteItemProps {
  item: CommandPaletteAnyEntry;
  focused: boolean;
}

const CommandPaletteItem = ({
  item,
  focused,
}: CommandPaletteItemProps): ReactNode => {
  return <div className="p-2">{item.label}</div>;
};

CommandPaletteItem.displayName = "CommandPaletteItem";

export default CommandPaletteItem;
