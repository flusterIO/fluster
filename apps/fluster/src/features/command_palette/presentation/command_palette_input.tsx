import {
  ForwardedRef,
  forwardRef,
  KeyboardEventHandler,
  MutableRefObject,
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

interface CommandPaletteInputProps {}

const CommandPaletteInput = forwardRef(
  (
    _: CommandPaletteInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): ReactNode => {
    const [value, setValue] = useState("");
    const [hasFocused, setHasFocused] = useState(false);
    const state = useCommandPaletteContext();
    const dispatch = useCommandPaletteDispatch();
    /* const nav = useNavigationType(); */

    useEffect(() => {
      if (state.navStack.length > 0 && !hasFocused) {
        ref;
        let em =
          (ref as MutableRefObject<HTMLInputElement>)?.current ??
          document.getElementById("searchCommandInput");
        if (em) {
          em.focus();
          setHasFocused(true);
        }
      } else if (state.navStack.length === 0) {
        setHasFocused(false);
      }
    }, [state.navStack.length]);

    useEffect(() => {
      dispatch({
        type: CommandPaletteActionType.setFilteredItems,
        payload:
          value === ""
            ? state.availableItems
            : state.availableItems.filter((f) =>
                f.label.toLowerCase().includes(value.toLowerCase()),
              ),
      });
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
      } else if (e.key === "Enter") {
        let item = state.filteredItems[state.focusedIndex];
        if (item instanceof CommandPaletteCategory) {
          appendCommandPaletteCategory(item, dispatch);
        } else if (item instanceof CommandPaletteItemAbstract) {
          /* RESUME: Figure out how to get the navigator class and pass that to the invoke function here. */
          /* item.invoke(nav); */
          dispatch({
            type: CommandPaletteActionType.setCommandPaletteOpen,
            payload: false,
          });
        }
      }
    };

    return (
      <input
        id="searchCommandInput"
        type="text"
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 focus-visible:ring-transparent focus-visible:outline-none rounded-tr rounded-tl bg-input"
        onKeyDown={handleKeyDown}
      />
    );
  },
);

CommandPaletteInput.displayName = "CommandPaletteInput";

export default CommandPaletteInput;
