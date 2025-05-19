import { GeneralCommandPaletteItem } from "#/command_palette/data/models/command_palette_item";
import { AppRoutes } from "#/router/data/main_router_routes";
import { GlobalAction } from "@/state/actions/global_action";
import { ComponentType } from "react";
import { Navigator } from "react-router";

export enum NavItemPosition {
  top,
  bottom,
}

export class NavigationItem extends GlobalAction {
  href: AppRoutes;
  icon: ComponentType<{ className: string }>;
  position: NavItemPosition;
  constructor(
    label: string,
    href: AppRoutes,
    icon: ComponentType<{ className: string }>,
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
