import { useEffect, type ReactNode } from "react";
import CommandPaletteItem from "./command_palette_item";
import {
    CommandPaletteActionType,
    useCommandPaletteContext,
    useCommandPaletteDispatch,
} from "../state/command_palette_provider";
import { CommandPaletteAnyEntry } from "../data/models/command_palette_any_entry";

const CommandPaletteResults = (): ReactNode => {
    const state = useCommandPaletteContext();
    const dispatch = useCommandPaletteDispatch();
    const getItems = async (
        cb: () => Promise<CommandPaletteAnyEntry[]>,
    ): Promise<void> => {
        let items = await cb();
        dispatch({
            type: CommandPaletteActionType.setCategoryItems,
            payload: items,
        });
    };
    useEffect(() => {
        getItems(state.navStack[state.navStack.length - 1].getItems);
    }, [state.navStack]);
    return (
        <div className="rounded-br rounded-bl bg-popover overflow-y-auto max-h-[min(50vh,400px)]">
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
