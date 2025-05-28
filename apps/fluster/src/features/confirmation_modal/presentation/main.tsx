import { ConfirmationModalProps } from "../types/confirmation_modal_types";
import ModalBackdrop from "@/components/util/modal_backdrop";
import { Button } from "@fluster.io/dev";
import { motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { H4 } from "@/components/typography/typography";
import { sendConfirmationResponse } from "../data/events/confirmation_response";

const ConfirmationModal = (
    props: ConfirmationModalProps & { handleClose: () => void }
): ReactNode => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        /// Produces the transition while keeping this out of the dom when not in use.
        setOpen(true);
    }, []);
    const closeModal = (): void => {
        setOpen(false);
        if (props.handleClose) {
            props.handleClose();
        }
    };
    return (
        <ModalBackdrop onClick={closeModal}>
            <motion.div
                className="max-w-[min(600px,90vw)] border rounded p-4 flex flex-col justify-center items-start gap-6 bg-popover text-foreground"
                onClick={(e) => {
                    e.stopPropagation();
                }}
                variants={{
                    closed: {
                        y: -200,
                        opacity: 0,
                    },
                    opened: {
                        y: 0,
                        opacity: 1,
                    },
                }}
                animate={open ? "opened" : "closed"}
            >
                <div>
                    <H4>{props.title}</H4>
                    <div>{props.body}</div>
                </div>
                <div className="w-full flex flex-row justify-end items-center gap-6">
                    {props.denyButtonText && (
                        <Button
                            variant={"secondary"}
                            onClick={() => {
                                sendConfirmationResponse(false, props.id);
                                closeModal();
                            }}
                        >
                            {props.denyButtonText}
                        </Button>
                    )}
                    {props.acceptButtonText && (
                        <Button
                            onClick={() => {
                                sendConfirmationResponse(true, props.id);
                                closeModal();
                            }}
                            variant={props.confirmationVariant}
                        >
                            {props.acceptButtonText}
                        </Button>
                    )}
                </div>
            </motion.div>
        </ModalBackdrop>
    );
};

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;
