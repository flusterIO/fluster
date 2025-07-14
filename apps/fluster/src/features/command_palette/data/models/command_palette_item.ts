import { Location, NavigateFunction } from "react-router";
import { CommandPaletteAnyEntry } from "./command_palette_any_entry";

export type InvokeFunc = (nav: NavigateFunction) => Promise<void>;

export abstract class CommandPaletteItem extends CommandPaletteAnyEntry {
    constructor(label: string, id: string) {
        super(label, id);
    }

    abstract filterByLocation(location: Location): boolean;
    abstract invoke(nav: NavigateFunction): Promise<void>;
}

export class GeneralCommandPaletteItem extends CommandPaletteItem {
    onInvoke: InvokeFunc;
    onCmdEnter?: InvokeFunc;
    constructor(
        label: string,
        id: string,
        invoke: InvokeFunc,
        onCmdEnter?: InvokeFunc
    ) {
        super(label, id);
        this.onInvoke = invoke;
        this.onCmdEnter = onCmdEnter;
    }
    filterByLocation(): boolean {
        return true;
    }
    async invoke(nav: NavigateFunction) {
        return this.onInvoke(nav);
    }
}
