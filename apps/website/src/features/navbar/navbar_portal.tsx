"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import store from "#/state/store";
import { closeDrawer } from "#/state/slices/core";
import InternalReduxProvider from "#/state/provider";
import { useEventListener } from "#/core/hooks/use_event_listener";

interface Props {
    children: ReactNode;
}

declare global {
    interface WindowEventMap {
        "main-drawer-opened": CustomEvent;
    }
}

const Large = ({ children }: Props) => {
    const [em, setEm] = useState<Element | false>(false);

    const handleEm = () => {
        const _em = document.getElementById("navbar-btn-container");
        if (!_em) return;
        setEm(_em);
    };

    useEffect(() => {
        handleEm();
    }, []);

    if (!em) return null;
    return createPortal(children, em);
};

const Mobile = ({ children }: Props) => {
    const [em, setEm] = useState<Element | false>(false);
    const handleEm = () => {
        const _em = document.getElementById("navbar-btn-container-mobile");
        if (!_em) return;
        setEm(_em);
    };

    useEffect(() => {
        handleEm();
    }, []);

    useEventListener("main-drawer-opened", handleEm);
    if (!em) return null;
    return createPortal(children, em);
};

export const createDrawerCallback = (cb: () => void) => {
    return () => {
        store.dispatch(closeDrawer());
        cb();
    };
};

const NavbarButtonPortal = ({ children }: Props) => {
    return (
        <InternalReduxProvider>
            <Large>{children}</Large>
            <Mobile>{children}</Mobile>
        </InternalReduxProvider>
    );
};

NavbarButtonPortal.displayName = "NavbarButtonPortal";

export default NavbarButtonPortal;
