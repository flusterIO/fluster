import React, { type ReactNode } from "react";
import { Jupyter } from "@datalayer/jupyter-react";

export interface JupyterProviderProps {
  children: ReactNode;
  token: string;
  portNumber: number | string;
  kernel?: string;
  darkMode: boolean;
}

export const JupyterProvider = ({
  token,
  portNumber,
  kernel = "python",
  darkMode,
  children,
}: JupyterProviderProps): ReactNode => {
  return (
    <Jupyter
      jupyterServerUrl={`http://127.0.0.1:${portNumber}`}
      jupyterServerToken={token}
      defaultKernelName={kernel}
      startDefaultKernel
      colormode={darkMode ? "dark" : "light"}
    >
      {children}
    </Jupyter>
  );
};

JupyterProvider.displayName = "JupyterProvider";
