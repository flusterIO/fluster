"use client"
import { CheckCircle, Info, XCircleIcon } from "lucide-react";
import React, { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ToastVariant } from "@/lib/bindings";
import { ToastItem } from "../types";

interface ToastProps {
    item: ToastItem;
    removeSelf: () => void;
}

const ToastIcon = ({
    variant,
    className,
}: {
    variant: ToastVariant;
    className: string;
}): ReactNode => {
    switch (variant) {
        case "Success": {
            return <CheckCircle className={cn("stroke-lime-500", className)} />;
        }
        case "Info": {
            return <Info className={cn("text-lightBlue-500", className)} />;
        }
        case "Error": {
            return <XCircleIcon className={cn("text-red-500", className)} />;
        }
    }
};

const Toast = (props: ToastProps): ReactNode => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        if (props.item.duration > 0) {
            setTimeout(() => setShow(false), props.item.duration);
        }
    }, []);

    return (
        <motion.div
            className="grid grid-cols-[16px_1fr] gap-1 bg-popover border rounded p-2"
            animate={show ? "show" : "hide"}
            variants={{
                show: {
                    x: 0,
                    opacity: 1,
                },
                hide: {
                    x: 300,
                    opacity: 0,
                },
            }}
            onAnimationComplete={() => {
                if (!show) {
                    props.removeSelf();
                }
            }}
        >
            <ToastIcon className="w-4 h-4 pt-1" variant={props.item.variant} />
            <div className="w-full h-full">
                <div className="text-bold text-sm text-foreground">
                    {props.item.title}
                </div>
                <div className="text-muted-foreground text-sm">{props.item.body}</div>
            </div>
        </motion.div>
    );
};

Toast.displayName = "Toast";

export default Toast;
