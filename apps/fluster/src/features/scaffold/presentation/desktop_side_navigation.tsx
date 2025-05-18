import { NavigationItem, NavItemPosition } from "@/models/navigation_item";
import { AppState } from "@/state/initial_state";
import { SunMoonIcon } from "lucide-react";
import React, { type ReactNode } from "react";

import { connect, useDispatch } from "react-redux";
import { NavLink } from "react-router";
import { toggleDarkMode } from "../state/slice";

const connector = connect((state: AppState, props: any) => ({
  items: state.scaffold.sideNavButtons,
  props: props,
}));

interface DesktopSideNavigationProps {
  items: NavigationItem[];
}

const SideNavigationItem = ({ item }: { item: NavigationItem }): ReactNode => {
  let Icon = item.icon;
  return (
    <NavLink to={item.href} end>
      <Icon />
    </NavLink>
  );
};

const SideNavigationCol = ({
  items,
}: DesktopSideNavigationProps): ReactNode => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {items.map((k) => (
        <SideNavigationItem item={k} key={`${k.label}-side-nav`} />
      ))}
    </div>
  );
};

const DesktopSideNavigation = connector(
  ({ items }: DesktopSideNavigationProps): ReactNode => {
    let top: NavigationItem[] = [];
    let bottom: NavigationItem[] = [];
    for (const item of items) {
      if (item.position === NavItemPosition.top) {
        top.push(item);
      } else {
        bottom.push(item);
      }
    }
    const dispatch = useDispatch();
    return (
      <div className="w-fit h-full flex flex-col justify-between items-center gap-8 border-r pt-10 px-2 pb-6 stroke-foreground">
        <SideNavigationCol items={top} />
        <div className="flex flex-col justify-center items-center gap-6">
          <SunMoonIcon
            className="cursor-pointer"
            onClick={() => dispatch(toggleDarkMode())}
          />
          {bottom.map((k) => (
            <SideNavigationItem item={k} key={`${k.label}-side-nav`} />
          ))}
        </div>
      </div>
    );
  },
);

DesktopSideNavigation.displayName = "DesktopSideNavigation";

export default DesktopSideNavigation;
