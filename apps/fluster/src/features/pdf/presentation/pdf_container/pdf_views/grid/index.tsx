import {
    usePdfContext,
    usePdfDispatch,
} from "#/pdf/state/provider/pdf_context";
import { LoadingComponent } from "@/components/loading_screen";
import { cn, useMainPanelSize } from "@fluster.io/dev";
import React, { useMemo, type ReactNode } from "react";
import { Thumbnail } from "react-pdf";
import { useSearchParams } from "react-router";

export const PdfGridView = (): ReactNode => {
    const dispatch = usePdfDispatch();
    const { numPages } = usePdfContext();

    const [searchParams] = useSearchParams();

    const mainPanelSize = useMainPanelSize();
    const columns = useMemo(() => {
        if (!mainPanelSize) {
            return 1;
            /* width = 0; */
        } else if (mainPanelSize.width > 768) {
            /* width = mainPanelSize.width / 3; */
            return 3;
        } else if (mainPanelSize.width > 540) {
            /* width = mainPanelSize.width / 2; */
            return 2;
        }
        return 1;
    }, [mainPanelSize]);

    const fsPath = searchParams.get("fsPath");
    const thumbnails = useMemo(() => {
        if (!mainPanelSize) {
            return [];
        }
        return Array(numPages - 1)
            .fill(0)
            .map((_, i) => {
                return () => (
                    <Thumbnail
                        key={`page-${i}`}
                        className={cn("h-full", columns === 1 ? "w-fit" : "w-full")}
                        width={(mainPanelSize.width - 160) / columns}
                        pageNumber={i + 1}
                        onClick={() => {
                            dispatch({
                                type: "setPageNumberAndNavigate",
                                payload: i + 1,
                            });
                        }}
                    />
                );
            });
        /* eslint-disable-next-line  --  */
    }, [numPages, fsPath, mainPanelSize]);

    const containerWidth = useMemo(() => {
        return mainPanelSize ? Math.min(mainPanelSize.width * 0.8, 768) : 0;
    }, [mainPanelSize]);

    if (!mainPanelSize?.width) {
        return (
            <div className="w-full h-full flex flex-col justifiy-center items-center">
                <LoadingComponent />
            </div>
        );
    }

    return (
        <div
            className="grid gap-4 [&_.react-pdf__Thumbnail__page__canvas]:w-full [&_.react-pdf__Thumbnail__page__canvas]:h-auto"
            style={{
                width: `${containerWidth}px`,
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
        >
            {thumbnails.map((T, i) => (
                <T key={`grid-thumb-${i}`} />
            ))}
        </div>
    );
};
