import { useDarkMode } from "@/hooks/use_dark_mode";
import { commands } from "@/lib/bindings";
import React, {
    KeyboardEventHandler,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { useSearchParams } from "react-router";
import { WhiteboardData } from "../embeddable_whiteboard";
import { showToast } from "@fluster.io/dev";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
import { Excalidraw } from "@excalidraw/excalidraw";

const connector = connect((state: AppState) => ({
    whiteboardState: state.whiteboard,
}));

export const WhiteboardPage = connector(
    ({
        whiteboardState,
    }: {
        whiteboardState: AppState["whiteboard"];
    }): ReactNode => {
        const [sp] = useSearchParams();
        const editing = sp.get("editing");
        const title = sp.get("title");
        const grid = sp.has("grid");

        const [initialData, setInitialData] =
            useState<Partial<WhiteboardData> | null>(null);
        const timer = useRef<NodeJS.Timeout | null>(null);
        const darkMode = useDarkMode();

        const [excalidrawAPI, setExcalidrawAPI] =
            useState<ExcalidrawImperativeAPI | null>(null);

        const loadInitialData = async (): Promise<void> => {
            if (!editing) {
                return;
            }
            const res = await commands.loadWhiteboardInitialData(editing);
            if (res.status === "ok" && res.data?.state) {
                setInitialData(JSON.parse(res.data.state));
            } else {
                setInitialData({
                    elements: [],
                });
            }
        };

        useEffect(() => {
            loadInitialData();
            /* eslint-disable-next-line */
        }, [editing]);
        const saveWhiteboard = async (): Promise<void> => {
            if (!editing) {
                return;
            }
            const elements = excalidrawAPI?.getSceneElementsIncludingDeleted();
            if (!elements?.length) {
                return;
            }
            const data: WhiteboardData = {
                elements: elements ?? [],
            };
            const res = await commands.saveWhiteboardData(
                editing,
                JSON.stringify(data),
                title ?? null
            );

            if (res.status === "error") {
                showToast({
                    title: "Something went wrong",
                    body: "Fluster encountered an error while attemting to save your whiteboard's data. If this continues, please file an issue on Github.",
                    duration: 5000,
                    variant: "Error",
                });
            }
        };

        const updateElements = (): void => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                saveWhiteboard();
            }, (whiteboardState?.whiteboardTimeout ?? 1) * 1000);
        };

        const handleKeyDown = (e: KeyboardEvent): void => {
            if (e.key === "s" && e.metaKey) {
                window.history.back();
            }
        };

        useEffect(() => {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }, []);

        useEffect(() => {
            // TODO: Add a 'show help' option in the settings page and enable that by default to conditionally show certain notifications like these to new users but allow them to disable it.
            showToast({
                title: "Important",
                body: "Use cmd+s to save and go back.",
                duration: 5000,
                variant: "Info",
            });
        }, []);

        return (
            <Excalidraw
                gridModeEnabled={grid}
                initialData={{
                    elements: initialData?.elements,
                }}
                autoFocus={false}
                theme={darkMode ? "dark" : "light"}
                excalidrawAPI={(api) => setExcalidrawAPI(api)}
                onChange={() => updateElements()}
                objectsSnapModeEnabled={grid}
            />
        );
    }
);

WhiteboardPage.displayName = "WhiteboardPage";
