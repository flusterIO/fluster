import React, {
    ForwardedRef,
    forwardRef,
    KeyboardEventHandler,
    RefObject,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import {
    CommandPaletteActionType,
    useCommandPaletteContext,
    useCommandPaletteDispatch,
} from "../state/command_palette_provider";
import { CommandPaletteCategory } from "../data/models/command_palette_category";
import { CommandPaletteItem as CommandPaletteItemAbstract } from "../data/models/command_palette_item.ts";
import { appendCommandPaletteCategory } from "../state/actions/appendCommandPaletteCategory";
import { SearchIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useEventListener } from "@fluster.io/dev";

declare global {
    interface WindowEventMap {
        "reset-command-palette-input": CustomEvent<object>;
    }
}

const CommandPaletteInput = forwardRef(
    (_: object, ref: ForwardedRef<HTMLInputElement>): ReactNode => {
        const [value, setValue] = useState("");
        const [hasFocused, setHasFocused] = useState(false);
        const state = useCommandPaletteContext();
        const dispatch = useCommandPaletteDispatch();
        const location = useLocation();
        const nav = useNavigate();

        useEventListener("reset-command-palette-input", () => setValue(""));

        useEffect(() => {
            if (state.navStack.length > 0 && !hasFocused) {
                const em =
                    (ref as RefObject<HTMLInputElement>)?.current ??
                    document.getElementById("searchCommandInput");
                if (em) {
                    em.focus();
                    setHasFocused(true);
                }
            } else if (state.navStack.length === 0) {
                setHasFocused(false);
            }
            /* eslint-disable-next-line  --  */
        }, [state.navStack.length]);

        useEffect(() => {
            const val = value.toLowerCase();
            dispatch({
                type: CommandPaletteActionType.setFilteredItems,
                payload:
                    value === ""
                        ? state.availableItems
                        : state.availableItems.filter((f) =>
                            f.label.toLowerCase().includes(val)
                        ),
            });
            /* eslint-disable-next-line  --  */
        }, [value]);

        const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e): void => {
            if (e.key === "Backspace" && value.length === 0) {
                e.preventDefault();
                e.stopPropagation();
                dispatch({
                    type: CommandPaletteActionType.popCommandPaletteCategory,
                });
            } else if (e.key === "Tab") {
                e.preventDefault();
                e.stopPropagation();
                if (e.shiftKey) {
                    dispatch({
                        type: CommandPaletteActionType.decrementFocusIndex,
                    });
                } else {
                    dispatch({
                        type: CommandPaletteActionType.incrementFocusIndex,
                    });
                }
            } else if (e.key === "ArrowDown") {
                console.log(`down arrow`);
                dispatch({
                    type: CommandPaletteActionType.incrementFocusIndex,
                });
            } else if (e.key === "ArrowUp") {
                dispatch({
                    type: CommandPaletteActionType.decrementFocusIndex,
                });
            } else if (e.key === "Enter") {
                const item = state.filteredItems[state.focusedIndex];
                if (item instanceof CommandPaletteCategory) {
                    console.log("here: ");
                    appendCommandPaletteCategory(item, location, dispatch);
                    setValue("");
                } else if (
                    item instanceof CommandPaletteItemAbstract ||
                    "invoke" in item
                ) {
                    console.log(`or here`);
                    /* @ts-expect-error -- This is the only type of invoke function available. I'll clean this up later. */
                    item.invoke(nav);
                    dispatch({
                        type: CommandPaletteActionType.setCommandPaletteOpen,
                        payload: false,
                    });
                }
            } else if (e.key === "Escape") {
                dispatch({
                    type: CommandPaletteActionType.setCommandPaletteOpen,
                    payload: false,
                });
            }
        };

        return (
            <div className="w-full relative h-fit">
                <SearchIcon className="absolute top-[50%] translate-y-[-50%] left-2 w-4 h-4" />
                <input
                    id="searchCommandInput"
                    type="text"
                    ref={ref}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full pr-2 py-2 pl-8 focus-visible:ring-transparent focus-visible:outline-none rounded-tr rounded-tl bg-popover text-foreground"
                    onKeyDown={handleKeyDown}
                />
            </div>
        );
    }
);

CommandPaletteInput.displayName = "CommandPaletteInput";

export default CommandPaletteInput;
