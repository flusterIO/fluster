import React, { type ReactNode } from "react";
import { Cell } from "@datalayer/jupyter-react";
import { JupyterProvider, JupyterProviderProps } from "./jupyter_provider";

export interface JupyterCellProps
  extends Omit<JupyterProviderProps, "children"> {
  body?: string;
}

export const JupyterCellComponent = ({
  body,
  ...props
}: JupyterCellProps): ReactNode => {
  return (
    <JupyterProvider {...props}>
      <Cell source={body} />
    </JupyterProvider>
  );
};

JupyterCellComponent.displayName = "JupyterCell";
