import { Button } from "@fluster/dev";
import { ComponentProps, ReactNode } from "react";

export interface ConfirmationModalProps {
    title: ReactNode;
    body: ReactNode;
    acceptButtonText?: string;
    denyButtonText?: string;
    confirmationVariant?: ComponentProps<typeof Button>["variant"];
    id: string;
}
