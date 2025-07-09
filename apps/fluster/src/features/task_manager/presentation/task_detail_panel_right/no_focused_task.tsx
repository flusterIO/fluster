import { H4 } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

export const NoFocusedTaskBanner = (): ReactNode => {
  return (
    <div>
      <H4>No task selected.</H4>
      <p>Select a task to view the related note in this panel.</p>
    </div>
  );
};

NoFocusedTaskBanner.displayName = "NoFocusedTaskBanner";
