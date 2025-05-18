import { Input } from "@/components/ui/shad/input";
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
      console.log("value: ", value);
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
      }
    };
    return (
      <input
        id="searchCommandInput"
        type="text"
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 focus-visible:ring-transparent rounded-tr rounded-tl"
        onKeyDown={handleKeyDown}
      />
    );
  },
);

CommandPaletteInput.displayName = "CommandPaletteInput";

export default CommandPaletteInput;
