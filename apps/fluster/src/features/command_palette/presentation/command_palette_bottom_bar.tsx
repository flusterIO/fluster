import React, { useMemo, type ReactNode } from "react";
import { useCommandPaletteContext } from "../state/command_palette_provider";
import { NoneFoundCommandPaletteBottomBar } from "./bottom_bars/none_found";

export const CommandPaletteBottomBar = (): ReactNode => {
  const state = useCommandPaletteContext();
  const bottomBar = useMemo(() => {
    return state.navStack[state.navStack.length - 1]?.bottomBar(state);
  }, [state]);
  if (state.filteredItems.length === 0 && !bottomBar) {
    return (
      <div className="w-full h-fit p-2 rounded-bl rounded-br">
        <NoneFoundCommandPaletteBottomBar />
      </div>
    );
  }
  if (bottomBar === null) {
    return null;
  }
  return (
    <div className="w-full h-fit p-2 rounded-bl rounded-br">{bottomBar}</div>
  );
};

CommandPaletteBottomBar.displayName = "CommandPaletteBottomBar";
