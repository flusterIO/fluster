import { CheckCircle } from "lucide-react";
import React, { useEffect, useState, type ReactNode } from "react";
import { ToastItem, ToastVariant } from "../state/toast_state";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { removeToastById } from "../state/slice";

interface ToastProps {
  item: ToastItem;
}

const ToastIcon = ({
  variant,
  className,
}: {
  variant: ToastVariant;
  className: string;
}): ReactNode => {
  return <CheckCircle className={cn("stroke-lime-500", className)} />;
};

const Toast = (props: ToastProps): ReactNode => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    if (props.item.expires > 0) {
      setTimeout(() => setShow(false), props.item.expires);
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
          removeToastById(props.item.id);
        }
      }}
    >
      <ToastIcon className="w-4 h-4 pt-1" variant={props.item.variant} />
      <div className="w-full h-full">
        <div className="text-bold text-sm text-popover-foreground">
          {props.item.title}
        </div>
        <div className="text-muted-foreground text-sm">{props.item.desc}</div>
      </div>
    </motion.div>
  );
};

Toast.displayName = "Toast";

export default Toast;
