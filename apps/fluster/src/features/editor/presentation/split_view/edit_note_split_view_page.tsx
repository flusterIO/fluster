import React, { useState, type ReactNode } from "react";
import SplitViewContainer from "./split_view_scaffold";
import { useSearchParams } from "react-router";
import { commands } from "@/lib/bindings";
import { useIsomorphicLayoutEffect } from "@/hooks/use_isomorphic_effect";
import { AppRoutes } from "#/router/data/app_routes";

export const getEditNoteSplitViewPageUrl = (noteAbsolutePath: string) => {
  const sp = new URLSearchParams();
  sp.set("fsPath", noteAbsolutePath);
  return `${AppRoutes.splitViewEditMdx}?${sp.toString()}`;
};

export interface EditNoteSplitViewSearchParams {
  fsPath: string;
}


const EditNoteSplitViewPage = (): ReactNode => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState("");
  const getFileContent = async (fsPath: string): Promise<void> => {
    const res = await commands.readMdxFromFs(fsPath);
    if (res.status === "ok") {
      setValue(res.data.mdx.raw_body);
    }
  };
  useIsomorphicLayoutEffect(() => {
    const fsPath = searchParams.get("fsPath");
    if (fsPath) {
      getFileContent(fsPath);
    }
  }, [searchParams]);
  return (
    <SplitViewContainer language="mdx" value={value} onChange={setValue} />
  );
};

EditNoteSplitViewPage.displayName = "EditNoteSplitViewPage";

export default EditNoteSplitViewPage;
