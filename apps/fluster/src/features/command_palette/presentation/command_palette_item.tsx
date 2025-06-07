import React, { useEffect, useRef, type ReactNode } from "react";
import { CommandPaletteAnyEntry } from "../data/models/command_palette_any_entry";
import { useCommandPaletteDispatch } from "../state/command_palette_provider";
import { CommandPaletteCategory } from "../data/models/command_palette_category";
import { appendCommandPaletteCategory } from "../state/actions/appendCommandPaletteCategory";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { useLocation } from "react-router";

interface CommandPaletteItemProps {
    item: CommandPaletteAnyEntry;
    focused: boolean;
}

const CommandPaletteItem = ({
    item,
    focused,
}: CommandPaletteItemProps): ReactNode => {
    const ref = useRef<HTMLDivElement>(null!);
    const dispatch = useCommandPaletteDispatch();
    const location = useLocation();
    useEffect(() => {
        if (focused) {
            ref.current.scrollIntoView();
        }
    }, [focused]);

    const clearInput = (): void => {
        window.dispatchEvent(
            new CustomEvent("reset-command-palette-input", {
                detail: {},
            })
        );
    };

    return (
        <div
            className="p-2 border-l-2 select-none cursor-pointer"
            ref={ref}
            style={{
                borderColor: focused ? "hsl(var(--primary))" : "transparent",
            }}
            onClick={() => {
                if (item instanceof CommandPaletteCategory) {
                    appendCommandPaletteCategory(item, location, dispatch);
                    clearInput();
                } else if (item instanceof CommandPaletteItem || "invoke" in item) {
                    /* @ts-expect-error -- This is the only type of invoke function available. I'll clean this up later. */
                    item.invoke();
                }
            }}
        >
            <InlineMdxContent mdx={item.label} />
        </div>
    );
};

CommandPaletteItem.displayName = "CommandPaletteItem";

export default CommandPaletteItem;
