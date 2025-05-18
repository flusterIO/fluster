import { Navigator } from "react-router";
import { CommandPaletteItem } from "../command_palette_item";

export class NavigationCommandPaletteItem extends CommandPaletteItem {
    href: string;
    constructor(label: string, href: string) {
        super(label);
        this.href = href;
    }
    async invoke(nav: Navigator): Promise<void> {
        nav.push(this.href);
    }
}
