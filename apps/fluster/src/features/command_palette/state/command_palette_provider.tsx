"use client";
import { ReactNode, createContext, useReducer, useContext } from "react";
import { CommandPaletteCategory } from "../data/models/command_palette_category";
import { CommandPaletteAnyEntry } from "../data/models/command_palette_any_entry";
import { CommandPaletteRoot } from "../data/command_palette_tree";

export interface CommandPaletteState {
    navStack: CommandPaletteCategory[];
    availableItems: CommandPaletteAnyEntry[];
    filteredItems: CommandPaletteAnyEntry[];
    focusedIndex: number;
}

const defaultInitialValues: CommandPaletteState = {
    navStack: [],
    availableItems: [],
    filteredItems: [],
    focusedIndex: 0,
};

export enum CommandPaletteActionType {
    popCommandPaletteCategory,
    resetFocusIndex,
    appendCommandPaletteCategory,
    setCommandPaletteOpen,
    incrementFocusIndex,
    decrementFocusIndex,
    setFilteredItems,
    setCategoryItems,
}

export const CommandPaletteContext =
    createContext<CommandPaletteState>(defaultInitialValues);

export type CommandPaletteContextActions =
    | {
        type: CommandPaletteActionType.popCommandPaletteCategory;
        payload?: null;
    }
    | {
        type: CommandPaletteActionType.resetFocusIndex;
        payload?: null;
    }
    | {
        type: CommandPaletteActionType.incrementFocusIndex;
        payload?: null;
    }
    | {
        type: CommandPaletteActionType.setCategoryItems;
        payload: CommandPaletteAnyEntry[];
    }
    | {
        type: CommandPaletteActionType.setFilteredItems;
        payload: CommandPaletteAnyEntry[];
    }
    | {
        type: CommandPaletteActionType.decrementFocusIndex;
        payload?: null;
    }
    | {
        type: CommandPaletteActionType.appendCommandPaletteCategory;
        payload: {
            cat: CommandPaletteCategory;
            items: CommandPaletteAnyEntry[];
        };
    }
    | {
        type: CommandPaletteActionType.setCommandPaletteOpen;
        payload: boolean | "toggle";
    };

export const CommandPaletteDispatchContext = createContext<
    React.Dispatch<CommandPaletteContextActions>
>(null!);

export const useCommandPaletteContext = () => useContext(CommandPaletteContext);
export const useCommandPaletteDispatch = () =>
    useContext(CommandPaletteDispatchContext);

export const CommandPaletteContextReducer = (
    state: CommandPaletteState,
    action: CommandPaletteContextActions
): CommandPaletteState => {
    switch (action.type) {
        case CommandPaletteActionType.popCommandPaletteCategory: {
            const newStack =
                state.navStack.length > 1
                    ? state.navStack.slice(0, state.navStack.length - 1)
                    : [];
            return {
                ...state,
                navStack: newStack,
            };
        }
        case CommandPaletteActionType.resetFocusIndex: {
            return {
                ...state,
                focusedIndex: 0,
            };
        }
        case CommandPaletteActionType.appendCommandPaletteCategory: {
            return {
                ...state,
                navStack: [...state.navStack, action.payload.cat],
                availableItems: action.payload.items,
                filteredItems: action.payload.items,
                focusedIndex: 0,
            };
        }
        case CommandPaletteActionType.setFilteredItems: {
            return {
                ...state,
                focusedIndex: 0,
                filteredItems: action.payload,
            };
        }
        case CommandPaletteActionType.setCommandPaletteOpen: {
            if (
                action.payload === true ||
                (action.payload === "toggle" && state.navStack.length === 0)
            ) {
                // Set to default initial category.
                state.navStack = [new CommandPaletteRoot()];
            } else {
                /// Close the command palette.
                state.navStack = [];
            }
            return { ...state };
        }
        case CommandPaletteActionType.incrementFocusIndex: {
            return {
                ...state,
                focusedIndex:
                    state.focusedIndex < state.filteredItems.length - 1
                        ? state.focusedIndex + 1
                        : 0,
            };
        }
        case CommandPaletteActionType.setCategoryItems: {
            return {
                ...state,
                filteredItems: action.payload,
                availableItems: action.payload,
                focusedIndex: 0,
            };
        }
        case CommandPaletteActionType.decrementFocusIndex: {
            return {
                ...state,
                focusedIndex:
                    state.focusedIndex > 0
                        ? state.focusedIndex - 1
                        : state.filteredItems.length - 1,
            };
        }
        default: {
            return state;
        }
    }
};

CommandPaletteContextReducer.displayName = "CommandPaletteContextReducer";

interface CommandPaletteProviderProps {
    children: ReactNode;
    initialValues?: Partial<CommandPaletteState>;
}

export const CommandPaletteProvider = ({
    children,
    initialValues,
}: CommandPaletteProviderProps) => {
    const [state, dispatch] = useReducer(
        CommandPaletteContextReducer,
        initialValues
            ? { ...initialValues, ...defaultInitialValues }
            : defaultInitialValues
    );

    return (
        <CommandPaletteContext.Provider value={state}>
            <CommandPaletteDispatchContext.Provider value={dispatch}>
                {children}
            </CommandPaletteDispatchContext.Provider>
        </CommandPaletteContext.Provider>
    );
};
