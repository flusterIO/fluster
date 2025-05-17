import { CheckCircle } from "lucide-react";
import React, { type ReactNode } from "react";

interface ToastProps {
  item: ToastItem;
}

const ToastIcon = ({ variant }: { variant: ToastVariant }): ReactNode => {
  return <CheckCircle />;
};

const Toast = (props: ToastProps): ReactNode => {
  return (
    <div className="grid grid-cols-[32px_1fr]">
      <ToastIcon variant={props.item.variant} />
      <div className="w-full">
        <div className="text-bold">{props.item.title}</div>
        <div className="text-muted-foreground">{props.item.desc}</div>
      </div>
    </div>
  );
};

Toast.displayName = "Toast";

export default Toast;
