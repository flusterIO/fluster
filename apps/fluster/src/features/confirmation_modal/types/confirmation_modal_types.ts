import { ReactNode } from "react";

export interface ConfirmationModalProps {
    title: ReactNode;
    body: ReactNode;
    acceptButtonText?: string;
    denyButtonText?: string;
    id: string;
}
