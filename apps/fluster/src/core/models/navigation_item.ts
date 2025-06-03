import { GeneralCommandPaletteItem } from "#/command_palette/data/models/command_palette_item";
import { AppRoutes } from "#/router/data/app_routes";
import { GlobalAction } from "@/state/actions/global_action";
import { ComponentType } from "react";
import { NavigateFunction } from "react-router";

export enum NavItemPosition {
    top,
    bottom,
    /// If hidden it will not be shown in the sidebar, but will still be available in the command palette.
    hidden,
}

export class NavigationItem extends GlobalAction {
    href: AppRoutes;
    icon: ComponentType<{ className: string }>;
    position: NavItemPosition;
    constructor(
        label: string,
        href: AppRoutes,
        icon: ComponentType<{ className: string }>,
        position: NavItemPosition
    ) {
        super(label);
        this.href = href;
        this.icon = icon;
        this.position = position;
    }

    async invoke(nav: NavigateFunction): Promise<void> {
        nav(this.href);
    }
    toCommandPaletteEntry() {
        new GeneralCommandPaletteItem(this.label, (nav: NavigateFunction) =>
            this.invoke(nav)
        );
    }
}
