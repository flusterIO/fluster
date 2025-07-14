import React, { type ReactNode } from "react";
import CommandPaletteResults from "../command_palette_results";
import { useCommandPaletteContext } from "#/command_palette/state/command_palette_provider";
import { CommandPaletteAnyEntry } from "#/command_palette/data/models/command_palette_any_entry";

export const CommandPaletteSplitView = ({
    Preview,
    hidePreview,
}: {
    Preview: ({ item }: { item: CommandPaletteAnyEntry }) => ReactNode;
    hidePreview: boolean;
}): ReactNode => {
    const state = useCommandPaletteContext();
    if (hidePreview) {
        return <CommandPaletteResults />;
    }
    return (
        <div className={"w-full h-fit grid grid-cols-[1fr_2fr]"}>
            <div className="w-full h-fit">
                <CommandPaletteResults />
                <div className="w-full h-fit p-2 rounded-bl rounded-br text-sm text-center">
                    Scroll docs with opt+arrow or opt+j/k
                </div>
            </div>
            <div
                id="command-palette-preview"
                className={"w-full h-fit overflow-x-hidden overflow-y-auto mb-8"}
            >
                <Preview item={state.filteredItems[state.focusedIndex]} />
            </div>
        </div>
    );
};

CommandPaletteSplitView.displayName = "CommandPaletteSplitView";
