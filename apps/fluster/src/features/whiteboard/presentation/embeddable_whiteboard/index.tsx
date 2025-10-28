import React, { useEffect, useRef, useState, type ReactNode } from "react";
import "@excalidraw/excalidraw/index.css";
import "../../../../styles/excalidraw.scss";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { useDarkMode } from "@/hooks/use_dark_mode";
import { AppRoutes, Button, cn, H4, showToast } from "@fluster.io/dev";
import { commands } from "@/lib/bindings";
import { LoadingComponent } from "@/components/loading_screen";

import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
import { WhiteboardState } from "#/whiteboard/state/whiteboard_settings";
import { useNavigate } from "react-router";

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
        const [initialData, setInitialData] =
            useState<Partial<WhiteboardData> | null>(null);
        const darkMode = useDarkMode();
        const nav = useNavigate();

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
            /* eslint-disable-next-line */
        }, []);

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
                        onClick={() => {
                            const sp = new URLSearchParams();
                            sp.set("editing", props.id);
                            if (props.grid) {
                                sp.set("grid", "true");
                            }
                            if (props.title) {
                                sp.set("title", props.title);
                            }
                            nav(`${AppRoutes.whiteboard}?${sp.toString()}`);
                        }}
                        variant={"outline"}
                        size={"sm"}
                    >
                        Edit
                    </Button>
                </div>
                <div
                    className="w-full h-[500px] relative"
                /* style={{ */
                /*     height: `${height}px`, */
                /* }} */
                >
                    <Excalidraw
                        gridModeEnabled={props.grid}
                        viewModeEnabled={true}
                        initialData={{
                            elements: initialData.elements,
                        }}
                        autoFocus={false}
                        theme={darkMode ? "dark" : "light"}
                    /* onChange={() => updateElements()} */
                    />
                </div>
            </div>
        );
    }
);

EmbeddableWhiteboard.displayName = "EmbeddableWhiteboard";
