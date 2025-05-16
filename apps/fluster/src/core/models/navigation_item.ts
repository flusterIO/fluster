import { GeneralCommandPaletteItem } from "#/command_palette/data/models/command_palette_item";
import { GlobalAction } from "@/state/actions/global_action";
import { Navigator } from "react-router";

export class NavigationItem extends GlobalAction {
    href: string;
    constructor(label: string, href: string) {
        super(label);
        this.href = href;
    }

    async invoke(nav: Navigator): Promise<void> {
        nav.push(this.href);
    }
    toCommandPaletteEntry() {
        new GeneralCommandPaletteItem(this.label, (nav: Navigator) =>
            this.invoke(nav),
        );
    }
}
