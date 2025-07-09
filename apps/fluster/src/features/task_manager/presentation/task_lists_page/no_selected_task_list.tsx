import { H2 } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

export const NoSelectedTaskList = (): ReactNode => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
      <div className="max-w-[min(90%,540px)]">
        <H2>No List Selected</H2>
        <p className="text-sm text-foreground/60">
          Use the left panel to manage task lists. The right panel contains
          details for the selected task.
        </p>
      </div>
    </div>
  );
};

NoSelectedTaskList.displayName = "NoSelectedTaskList";
