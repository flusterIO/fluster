import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor, { CodeEditorProps } from "../code_editor/main";
import { MdxContent } from "#/mdx/presentation/mdx_content";
import { MdxNoteBibliographyByContent } from "#/bibliography/presentation/note_bibliography/bib_by_mdx_content";
import { MdxProviderGroup } from "#/mdx/presentation/mdx_provider_group";

interface SplitViewScaffoldProps
    extends Omit<CodeEditorProps, "themes" | "isModal" | "vimMode"> {
    autoSaveId?: string;
    debounceSeconds: AppState["code"]["previewDebounce"];
}

import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";

const connector = connect((state: AppState) => ({
    debounceSeconds: state.code.previewDebounce,
}));

const SplitViewContainer = connector(
    ({
        onChange,
        value,
        language,
        autoSaveId = "splitview-panels",
        debounceSeconds,
        ...props
    }: SplitViewScaffoldProps): ReactNode => {
        const timer = useRef<NodeJS.Timeout | null>(null);
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                setDebouncedValue(value);
            }, debounceSeconds * 1000);
        }, [value]);

        return (
            <PanelGroup autoSaveId={autoSaveId} direction="horizontal">
                <Panel id="editor-panel" order={1} defaultSize={50}>
                    <CodeEditor
                        {...props}
                        language={language}
                        value={value}
                        onChange={onChange}
                    />
                </Panel>
                <PanelResizeHandle />
                <Panel
                    id="editor-output-panel"
                    className="bg-background"
                    order={2}
                    defaultSize={50}
                >
                    <div
                        id="mdx-page-container"
                        className="w-full h-full overflow-y-auto overflow-x-hidden py-16 px-8"
                    >
                        <MdxProviderGroup>
                            <MdxContent
                                removeGrayMatter
                                className="p-6 max-h-full contents"
                                mdx={debouncedValue}
                            />
                        </MdxProviderGroup>
                        <MdxNoteBibliographyByContent mdx={debouncedValue} />
                    </div>
                </Panel>
            </PanelGroup>
        );
    }
);

SplitViewContainer.displayName = "SplitViewScaffold";

export default SplitViewContainer;
