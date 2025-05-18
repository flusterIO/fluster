import { CommandPaletteCategory } from "#/command_palette/data/models/command_palette_category";
import {
    CommandPaletteActionType,
    CommandPaletteContextActions,
} from "../command_palette_provider";
import { Dispatch } from "react";

export const appendCommandPaletteCategory = async (
    cat: CommandPaletteCategory,
    dispatch: Dispatch<CommandPaletteContextActions>,
): Promise<void> => {
    let items = await cat.getItems();
    dispatch({
        type: CommandPaletteActionType.appendCommandPaletteCategory,
        payload: {
            cat: cat,
            items: items,
        },
    });
};
