import React, { type ReactNode } from "react";

import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import Toast from "./toast_item";

const connector = connect((state: AppState, props: any) => ({
  toasts: state.toast.toasts,
  props: props,
}));

interface ToastNotificationListProps {
  toasts: AppState["toast"]["toasts"];
}

const ToastNotificationList = connector(
  (props: ToastNotificationListProps): ReactNode => {
    return (
      <div className="h-fit flex flex-col justify-center items-center gap-6 max-w-[350px] max-h-screen absolute">
        {props.toasts.map((t) => (
          <Toast item={t} key={`toast-${t.title}-${t.desc}-${t.variant}`} />
        ))}
      </div>
    );
  },
);

ToastNotificationList.displayName = "ToastNotificationList";

export default ToastNotificationList;
