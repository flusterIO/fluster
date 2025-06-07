import { Location } from "react-router";
import { CommandPaletteItem } from "../models/command_palette_item";
import { AppRoutes } from "#/router/data/app_routes";

declare global {
    interface WindowEventMap {
        "view-note-split-view": CustomEvent<object>;
    }
}

export class EditInSplitViewCommandEntry extends CommandPaletteItem {
    constructor() {
        super("Edit in split view.");
    }

    filterByLocation(location: Location): boolean {
        return location.pathname.startsWith(AppRoutes.viewMdxNote);
    }
    async invoke(): Promise<void> {
        window.dispatchEvent(new CustomEvent("view-note-split-view", {}));
    }
}
