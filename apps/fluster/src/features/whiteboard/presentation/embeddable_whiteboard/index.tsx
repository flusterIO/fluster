import React, { useEffect, useRef, useState, type ReactNode } from "react";
import "@excalidraw/excalidraw/index.css";
import "../../../../styles/excalidraw.scss";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { useDarkMode } from "@/hooks/use_dark_mode";
import { Button, cn, H4, showToast } from "@fluster.io/dev";
import { commands } from "@/lib/bindings";
import { LoadingComponent } from "@/components/loading_screen";

import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
import { WhiteboardState } from "#/whiteboard/state/whiteboard_settings";

const connector = connect((state: AppState) => ({
    whiteboardState: state.whiteboard,
}));

interface EmbeddableWhiteboardProps {
    /** A required id field used to retrieve data from the database. */
    id: string;
    /** demo is true is whiteboard is used for documentation only and should not be saved. */
    demo?: boolean;
    /** grid is set to true to enable grid snapping */
    grid?: boolean;
    /** An optional label to be used within search results and as a title. */
    title?: string;
    whiteboardState?: WhiteboardState;
}

export interface WhiteboardData {
    elements: readonly OrderedExcalidrawElement[];
}

export const EmbeddableWhiteboard = connector(
    (props: EmbeddableWhiteboardProps): ReactNode => {
        console.log("props: ", props);
        const [excalidrawAPI, setExcalidrawAPI] =
            useState<ExcalidrawImperativeAPI | null>(null);
        const [viewMode, setViewMode] = useState(true);
        const [initialData, setInitialData] =
            useState<Partial<WhiteboardData> | null>(null);
        const timer = useRef<NodeJS.Timeout | null>(null);
        const darkMode = useDarkMode();

        const saveWhiteboard = async (): Promise<void> => {
            if (props.demo) {
                return;
            }
            const elements = excalidrawAPI?.getSceneElementsIncludingDeleted();
            const data: WhiteboardData = {
                elements: elements ?? [],
            };
            const res = await commands.saveWhiteboardData(
                props.id,
                JSON.stringify(data),
                props.title ?? null
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

        const loadInitialData = async (): Promise<void> => {
            if (!props.demo) {
                const res = await commands.loadWhiteboardInitialData(props.id);
                if (res.status === "ok" && res.data?.state) {
                    setInitialData(JSON.parse(res.data.state));
                } else {
                    setInitialData({
                        elements: [],
                    });
                }
            } else {
                setInitialData({
                    elements: [],
                });
            }
        };

        useEffect(() => {
            loadInitialData();
        }, []);

        useEffect(() => {
            window.dispatchEvent(new Event("resize"));
        }, []);

        const updateElements = (): void => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                saveWhiteboard();
            }, (props.whiteboardState?.whiteboardTimeout ?? 1) * 1000);
        };

        if (!props.id) {
            return (
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="max-w-[min(90%,450px)] text-destructive">
                        An id field must be provided to each whiteboard component so data
                        can be saved and retrieved successfully.
                    </div>
                </div>
            );
        }

        if (initialData === null) {
            return (
                <div className="w-full flex flex-col justify-center items-center">
                    <LoadingComponent />
                </div>
            );
        }
        return (
            <div className="w-full max-h-[80vh] excalidraw-outer-container flex flex-col justify-center items-center">
                <div
                    className={cn(
                        "w-full flex flex-row items-center mb-4",
                        props.title ? "justify-between gap-4" : "justify-end"
                    )}
                >
                    {props.title ? <H4>{props.title}</H4> : null}
                    <Button
                        onClick={() => setViewMode(!viewMode)}
                        variant={viewMode ? "outline" : undefined}
                        size={"sm"}
                    >
                        View Mode
                    </Button>
                </div>
                <div className="h-[min(500px,80vh)] w-full">
                    <Excalidraw
                        gridModeEnabled={props.grid}
                        viewModeEnabled={viewMode}
                        initialData={{
                            elements: initialData.elements,
                        }}
                        autoFocus={false}
                        theme={darkMode ? "dark" : "light"}
                        excalidrawAPI={(api) => setExcalidrawAPI(api)}
                        onChange={() => updateElements()}
                    />
                </div>
            </div>
        );
    }
);

EmbeddableWhiteboard.displayName = "EmbeddableWhiteboard";
