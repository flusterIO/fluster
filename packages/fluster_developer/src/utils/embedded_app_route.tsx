import React, { CSSProperties, useMemo, type ReactNode } from "react";
import { AppRoutes } from "../types/app_routes";

interface AppRouteProps {
    children: ReactNode;
    route: keyof AppRoutes;
    style?: CSSProperties;
}

export const AppRoute = (props: AppRouteProps): ReactNode => {
    const href = useMemo(() => AppRoutes[props.route as "search"], [props.route]);
    return (
        <a href={href} style={props.style}>
            {props.children}
        </a>
    );
};

AppRoute.displayName = "AppRoute";
