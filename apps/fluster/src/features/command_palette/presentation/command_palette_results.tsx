import { type ReactNode } from "react";
import CommandPaletteItem from "./command_palette_item";
import { useCommandPaletteContext } from "../state/command_palette_provider";

const CommandPaletteResults = (): ReactNode => {
  const state = useCommandPaletteContext();
  return (
    <div>
      {state.filteredItems.map((r, i) => {
        return (
          <CommandPaletteItem
            focused={state.focusedIndex === i}
            key={`cmd-plt-${r.label}`}
            item={r}
          />
        );
      })}
    </div>
  );
};

CommandPaletteResults.displayName = "CommandPaletteResults";

export default CommandPaletteResults;
