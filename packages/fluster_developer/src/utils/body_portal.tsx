import { type ReactNode } from "react";
import { createPortal } from "react-dom";

interface BodyPortalProps {
    children: ReactNode;
}

export const BodyPortal = (props: BodyPortalProps): ReactNode => {
    return createPortal(props.children, document.body);
};

BodyPortal.displayName = "BodyPortal";
