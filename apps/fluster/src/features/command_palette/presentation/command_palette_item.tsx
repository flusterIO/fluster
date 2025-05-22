import { useEffect, useRef, type ReactNode } from "react";
import { CommandPaletteAnyEntry } from "../data/models/command_palette_any_entry";

interface CommandPaletteItemProps {
    item: CommandPaletteAnyEntry;
    focused: boolean;
}

const CommandPaletteItem = ({
    item,
    focused,
}: CommandPaletteItemProps): ReactNode => {
    const ref = useRef<HTMLDivElement>(null!);
    useEffect(() => {
        if (focused) {
            console.log(`Scrolling into view...`);
            ref.current.scrollIntoView();
        }
    }, [focused]);
    return (
        <div
            className="p-2 border-l-2"
            ref={ref}
            style={{
                borderColor: focused ? "hsl(var(--primary))" : "transparent",
            }}
        >
            {item.label}
        </div>
    );
};

CommandPaletteItem.displayName = "CommandPaletteItem";

export default CommandPaletteItem;
