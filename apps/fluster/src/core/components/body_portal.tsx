import { type ReactNode } from "react";
import { createPortal } from "react-dom";

interface BodyPortalProps {
    children: ReactNode;
}

export const BodyPortal = ({ children }: BodyPortalProps): ReactNode => {
    return createPortal(children, document.body);
};

BodyPortal.displayName = "BodyPortal";
