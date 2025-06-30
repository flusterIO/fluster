import React, { type ReactNode } from "react";
/* import { Notebook } from "@datalayer/jupyter-react"; */
/* import { JupyterProvider } from "#/jupyter/state/jupyter_provider"; */

/* {/* <JupyterProvider> */
/* {/*     <Notebook path={fsPath} /> */
/* {/* </JupyterProvider> */
interface JupyterNotebookProps {
    fsPath: string;
}

export const JupyterNotebook = ({
    fsPath,
}: JupyterNotebookProps): ReactNode => {
    console.log("fsPath: ", fsPath);
    return <div>here</div>;
};

JupyterNotebook.displayName = "JupyterNotebook";
