import { type ReactNode } from "react";

interface ModalBackdropProps {
    onClick: () => void;
    children: ReactNode;
}

const ModalBackdrop = ({
    onClick,
    children,
}: ModalBackdropProps): ReactNode => {
    return (
        <div
            className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center item-center gap-6 bg-black/30 dark:bg-black/70"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            }}
        >
            {children}
        </div>
    );
};

ModalBackdrop.displayName = "ModalBackdrop";

export default ModalBackdrop;
