import React, { type ReactNode } from "react";

enum NavItemPosition {
    top,
    bottom,
}

export interface NavigationItem {
    label: ReactNode;
    href?: string;
    /* FIXME: Replace this with an enum generated from rust once specta is in place.  */
    globalActionId: string;
    position: NavItemPosition;
    icon: string;
}

interface DesktopSideNavigationProps {
    items: NavigationItem[];
}

const SideNavigationItem = ({ item }: { item: NavigationItem }): ReactNode => {
    return <div>{item.icon}</div>;
};

const SideNavigationCol = ({
    items,
}: DesktopSideNavigationProps): ReactNode => {
    return (
        <div>
            {items.map((k) => (
                <SideNavigationItem item={k} key={`${k.label}-side-nav`} />
            ))}
        </div>
    );
};

const DesktopSideNavigation = ({
    items,
}: DesktopSideNavigationProps): ReactNode => {
    let top: NavigationItem[] = [];
    let bottom: NavigationItem[] = [];
    for (const item of items) {
        if (item.position === NavItemPosition.top) {
            top.push(item);
        } else {
            bottom.push(item);
        }
    }
    return (
        <div className="w-fit h-full flex flex-col justify-between items-center gap-8 border-r">
            <SideNavigationCol items={top} />
            <SideNavigationCol items={bottom} />
        </div>
    );
};

DesktopSideNavigation.displayName = "DesktopSideNavigation";

export default DesktopSideNavigation;
