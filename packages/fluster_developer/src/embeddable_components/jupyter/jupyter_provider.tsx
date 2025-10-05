import React, { type ReactNode } from "react";
import { Jupyter } from "@datalayer/jupyter-react";

export interface JupyterProviderProps {
  children: ReactNode;
  token: string;
  portNumber: number | string;
  kernel?: string;
}

export const JupyterProvider = ({
  token,
  portNumber,
  kernel = "python",
  children,
}: JupyterProviderProps): ReactNode => {
  return (
    <Jupyter
      jupyterServerUrl={`http://localhost:${portNumber}`}
      jupyterServerToken={token}
      defaultKernelName={kernel}
    >
      {children}
    </Jupyter>
  );
};

JupyterProvider.displayName = "JupyterProvider";
