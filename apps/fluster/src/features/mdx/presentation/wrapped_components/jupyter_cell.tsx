import { JupyterCellComponent, JupyterCellProps } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";

const connector = connect((state: AppState) => ({
  jupyter: state.code.jupyter,
}));

export const JupyterCellWrapped = connector(
  ({
    jupyter,
    ...props
  }: Omit<JupyterCellProps, "portNumber" | "kernel" | "token"> & {
    jupyter: AppState["code"]["jupyter"];
  }): ReactNode => {
    return (
      <JupyterCellComponent
        token={jupyter.token}
        portNumber={jupyter.port}
        kernel={jupyter.defaultKernelName}
        {...props}
      />
    );
  }
);

JupyterCellWrapped.displayName = "JupyterCellWrapped";
