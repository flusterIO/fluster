import { JupyterCellComponent, JupyterCellProps } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
import { useDarkMode } from "@/hooks/use_dark_mode";

const connector = connect((state: AppState) => ({
  jupyter: state.code.jupyter,
}));

export const JupyterCellWrapped = connector(
  ({
    jupyter,
    ...props
  }: Omit<JupyterCellProps, "portNumber" | "kernel" | "token" | "darkMode"> & {
    jupyter: AppState["code"]["jupyter"];
  }): ReactNode => {
    const darkMode = useDarkMode();
    return (
      <JupyterCellComponent
        token={jupyter.token}
        portNumber={jupyter.port}
        kernel={jupyter.defaultKernelName}
        darkMode={darkMode}
        {...props}
      />
    );
  }
);

JupyterCellWrapped.displayName = "JupyterCellWrapped";
