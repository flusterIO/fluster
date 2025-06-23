import { OnMount } from "@monaco-editor/react";

export type EditorAction = Parameters<Parameters<OnMount>[0]["addAction"]>[0];
