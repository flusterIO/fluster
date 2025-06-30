import React, { type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { JupyterNotebook } from "../notebook";
import { H3 } from "@/components/typography/typography";

export const NotebookPage = (): ReactNode => {
  const [searchParams] = useSearchParams();

  const fsPath = searchParams.get("fsPath");

  if (!fsPath) {
    return (
      <div className="flex flex-col justify-center items-center gap-6 w-full h-full">
        <H3>No path found</H3>
        <p>A path must be provided to load a jupyter notebook</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <JupyterNotebook fsPath={fsPath} />
    </div>
  );
};

NotebookPage.displayName = "NotebookPage";
