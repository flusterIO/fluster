import { NavigationItem, NavItemPosition } from "@/models/navigation_item";
import { SunMoonIcon } from "lucide-react";
import { useMemo, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useMatch } from "react-router";
import { toggleDarkMode } from "../state/slice";
import { cn } from "@/lib/utils";
import { useDesktopScaffoldContext } from "../state/scaffold_provider.tsx";

const SideNavigationItem = ({ item }: { item: NavigationItem }): ReactNode => {
    let Icon = item.icon;
    let isCurrent = useMatch(item.href);
    return (
        <NavLink to={item.href} end>
            <Icon
                className={cn(isCurrent ? "text-foreground" : "text-foreground/70")}
            />
        </NavLink>
    );
};

const SideNavigationCol = ({
    items,
}: {
    items: NavigationItem[];
}): ReactNode => {
    return (
        <div className="flex flex-col justify-center items-center gap-6">
            {items.map((k) => (
                <SideNavigationItem item={k} key={`${k.label}-side-nav`} />
            ))}
        </div>
    );
};

const DesktopSideNavigation = (): ReactNode => {
    const { sideNavButtons } = useDesktopScaffoldContext();
    const { top, bottom } = useMemo(() => {
        let top: NavigationItem[] = [];
        let bottom: NavigationItem[] = [];
        for (const item of sideNavButtons) {
            if (item.position === NavItemPosition.top) {
                top.push(item);
            } else {
                bottom.push(item);
            }
        }
        return { top, bottom };
    }, [sideNavButtons]);
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
};

DesktopSideNavigation.displayName = "DesktopSideNavigation";

export default DesktopSideNavigation;
