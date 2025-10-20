import React, { useEffect, useState, type ReactNode } from "react";
import CommandPaletteItem from "./command_palette_item";
import {
    CommandPaletteActionType,
    useCommandPaletteContext,
    useCommandPaletteDispatch,
} from "../state/command_palette_provider";
import { CommandPaletteAnyEntry } from "../data/models/command_palette_any_entry";
import { Location, useLocation } from "react-router";

const CommandPaletteResults = (): ReactNode => {
    const state = useCommandPaletteContext();
    const dispatch = useCommandPaletteDispatch();
    const [navStackLength, setNavStackLength] = useState<number>(
        state.navStack.length
    );
    const location = useLocation();
    const getItems = async (
        cb: (loc: Location) => Promise<CommandPaletteAnyEntry[]>
    ): Promise<void> => {
        const items = await cb(location);
        dispatch({
            type: CommandPaletteActionType.setCategoryItems,
            payload: items.filter((x) => x.label.length),
        });
    };

    useEffect(() => {
        const item = state.navStack[state.navStack.length - 1];
        getItems(item.getItems);
        setNavStackLength(state.navStack.length);
        /* eslint-disable-next-line  -- */
    }, [state.navStack, navStackLength]);

    return (
        <div className="rounded-br rounded-bl bg-popover overflow-y-auto max-h-[min(50vh,400px)]">
            {state.filteredItems.map((r, i) => {
                return (
                    <CommandPaletteItem
                        focused={state.focusedIndex === i}
                        key={`cmd-plt-${r.id}`}
                        item={r}
                        asHtml={r.asHtml as boolean}
                    />
                );
            })}
        </div>
    );
};

CommandPaletteResults.displayName = "CommandPaletteResults";

export default CommandPaletteResults;
