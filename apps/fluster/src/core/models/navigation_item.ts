import { GeneralCommandPaletteItem } from "#/command_palette/data/models/command_palette_item";
import { GlobalAction } from "@/state/actions/global_action";
import { ComponentType } from "react";
import { Navigator } from "react-router";

export enum NavItemPosition {
    top,
    bottom,
}

export class NavigationItem extends GlobalAction {
    href: string;
    icon: ComponentType;
    position: NavItemPosition;
    constructor(
        label: string,
        href: string,
        icon: ComponentType,
        position: NavItemPosition,
    ) {
        super(label);
        this.href = href;
        this.icon = icon;
        this.position = position;
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
