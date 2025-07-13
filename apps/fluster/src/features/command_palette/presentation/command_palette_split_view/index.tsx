import React, { type ReactNode } from "react";
import CommandPaletteResults from "../command_palette_results";
import { useCommandPaletteContext } from "#/command_palette/state/command_palette_provider";
import { CommandPaletteAnyEntry } from "#/command_palette/data/models/command_palette_any_entry";

export const CommandPaletteSplitView = ({
    Preview,
}: {
    Preview: ({ item }: { item: CommandPaletteAnyEntry }) => ReactNode;
}): ReactNode => {
    const state = useCommandPaletteContext();
    return (
        <div className="w-full h-fit grid grid-cols-2">
            <div className="w-full h-fit">
                <CommandPaletteResults />
            </div>
            <div className="w-full h-fit overflow-x-hidden overflow-y-auto">
                <Preview item={state.filteredItems[state.focusedIndex]} />
            </div>
        </div>
    );
};

CommandPaletteSplitView.displayName = "CommandPaletteSplitView";
