import { NavigationItem } from "@/models/navigation_item";
import { globalNavigationItems } from "@/models/static_model_data/navigation_items";
import { GlobalAction } from "@/state/actions/global_action";
// import { type NavigationItem } from "../presentation/desktop_side_navigation";

export enum ThemeMode {
  light,
  dark,
  system,
}

export interface ScaffoldState {
  sideNavButtons: NavigationItem[];
  themeMode: ThemeMode;
}

export const initialScaffoldState: ScaffoldState = {
  sideNavButtons: globalNavigationItems(),
  themeMode: ThemeMode.system,
};
