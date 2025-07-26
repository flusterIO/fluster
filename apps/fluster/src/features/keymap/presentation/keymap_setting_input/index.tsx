import { KeymapItem } from "#/keymap/data/models/keymap_item";
import React, { type ReactNode } from "react";

const KeyIcon = ({ children }: { children: ReactNode }): ReactNode => {
    return (
        <div className="rounded-lg border px-2 py-1 cursor-default select-none bg-secondary text-secondary-foreground">
            {children}
        </div>
    );
};

const ShiftKeyIcon = ({ show }: { show: boolean }): ReactNode => {
    if (!show) {
        return null;
    }
    return <KeyIcon>Shift</KeyIcon>;
};

const AltOptionKeyIcon = ({ show }: { show: boolean }): ReactNode => {
    if (!show) {
        return null;
    }
    return <KeyIcon>Option</KeyIcon>;
};

const ControlKeyIcon = ({ show }: { show: boolean }): ReactNode => {
    if (!show) {
        return null;
    }
    return <KeyIcon>Ctrl</KeyIcon>;
};

const CmdKeyIcon = ({ show }: { show: boolean }): ReactNode => {
    if (!show) {
        return null;
    }
    return <KeyIcon>Cmd</KeyIcon>;
};

export const KeyboardShortcutGroup = ({
    item,
}: {
    item: KeymapItem;
}): ReactNode => {
    return (
        <div className="flex flex-row justify-start items-center gap-2 text-sm">
            <ShiftKeyIcon show={item.shift} />
            <AltOptionKeyIcon show={item.alt} />
            <ControlKeyIcon show={item.ctrl} />
            <CmdKeyIcon show={item.meta} />
            <KeyIcon>{item.key}</KeyIcon>
        </div>
    );
};
