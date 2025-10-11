import React, { useEffect, useRef, useState, type ReactNode } from "react";
import "../../../../styles/excalidraw.scss";
import "@excalidraw/excalidraw/index.css";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { useDarkMode } from "@/hooks/use_dark_mode";
import { Button, showToast } from "@fluster.io/dev";
import { commands } from "@/lib/bindings";
import { LoadingComponent } from "@/components/loading_screen";

interface EmbeddableWhiteboardProps {
    /** A required id field used to retrieve data from the database. */
    id: string;
    /** demo is true is whiteboard is used for documentation only and should not be saved. */
    demo?: boolean;
    /** grid is set to true to enable grid snapping */
    grid?: boolean;
    /** An optional label to be used within search results and as a title. */
    label?: string;
}

export interface WhiteboardData {
    /* appState: ReturnType<ExcalidrawImperativeAPI["getAppState"]>; */
    elements: readonly OrderedExcalidrawElement[];
}

export const EmbeddableWhiteboard = (
    props: EmbeddableWhiteboardProps
): ReactNode => {
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
        console.log("data: ", data);
        const res = await commands.saveWhiteboardData(
            props.id,
            JSON.stringify(data),
            props.label ?? null
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
            console.log("res: ", res);
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

    const updateElements = (): void => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            saveWhiteboard();
        }, 3000);
    };

    if (!props.id) {
        return (
            <div className="w-full flex flex-col justify-center items-center">
                <div className="max-w-[min(90%,450px)] text-destructive">
                    An id field must be provided to each whiteboard component so data can
                    be saved and retrieved successfully.
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
    console.log("initialData.elements: ", initialData.elements);
    return (
        <div className="w-full h-[500px] max-h-[80vh]">
            <div className="w-full flex flex-row justify-end items-center mb-4">
                <Button
                    onClick={() => setViewMode(!viewMode)}
                    variant={viewMode ? "outline" : undefined}
                    size={"sm"}
                >
                    View Mode
                </Button>
            </div>
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
    );
};

EmbeddableWhiteboard.displayName = "EmbeddableWhiteboard";
