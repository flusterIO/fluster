import { NavigateFunction } from "react-router";
import { CommandPaletteItem } from "../command_palette_item";

export class NavigationCommandPaletteItem extends CommandPaletteItem {
    href: string;
    constructor(label: string, href: string) {
        super(label, href);
        this.href = href;
    }

    filterByLocation(): boolean {
        return true;
    }
    async invoke(nav: NavigateFunction): Promise<void> {
        nav(this.href);
    }
}
