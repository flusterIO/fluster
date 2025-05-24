import {
    AlertDialog,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from "@/components/ui/shad/alert-dialog";
import { useEventListener } from "@/hooks/use_event_listener";
import React, { useEffect, useState, type ReactNode } from "react";
import { ConfirmationModalProps } from "../types/confirmation_modal_types";

const ConfirmationModal = (
    props: ConfirmationModalProps & { handleClose: () => void }
): ReactNode => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        /// Produces the transition while keeping this out of the dom when not in use.
        setOpen(true);
    }, []);
    return (
        <AlertDialog
            open={open}
            onOpenChange={(newOpen) => {
                console.log("newOpen: ", newOpen);
                setOpen(newOpen);
                if (newOpen === false) {
                    props.handleClose();
                }
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.title}</AlertDialogTitle>
                    <AlertDialogDescription>{props.body}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {props.denyButtonText && (
                        <AlertDialogCancel onClick={() => { }}>
                            {props.denyButtonText}
                        </AlertDialogCancel>
                    )}
                    {props.acceptButtonText && (
                        <AlertDialogAction>{props.acceptButtonText}</AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;
