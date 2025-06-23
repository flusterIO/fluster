import {
    usePdfContext,
    usePdfDispatch,
} from "#/pdf/state/provider/pdf_context";
import { Button } from "@fluster.io/dev";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { ReactNode } from "react";
import { Page } from "react-pdf";

export const PdfSinglePageView = (): ReactNode => {
    const state = usePdfContext();
    const dispatch = usePdfDispatch();

    /* const [width, setWidth] = useState(0); */

    /* const onContainerResize = (): void => { */
    /*   const w = containerRef.current?.getBoundingClientRect().width; */
    /*   if (w) { */
    /*     setWidth(Math.min(768, 0.9 * w)); */
    /*   } */
    /* }; */

    /* useEffect(() => { */
    /*   containerRef.current?.addEventListener("resize", onContainerResize); */
    /*   return () => */
    /*     containerRef.current?.removeEventListener("resize", onContainerResize); */
    /* }, []); */

    return (
        <div className="max-w-full h-fit flex flex-col justify-center items-center gap-4">
            <Page
                width={540}
                pageNumber={state.pageNumber}
            /* onLoadSuccess={onLoad} */
            />
            <div className="flex flex-row justify-center items-center gap-4">
                <Button
                    size="icon"
                    disabled={state.pageNumber <= 1}
                    onClick={() => {
                        dispatch({
                            type: "decrementPageNumber",
                        });
                    }}
                >
                    <ChevronLeft />
                </Button>
                <Button
                    disabled={state.pageNumber >= state.numPages}
                    size="icon"
                    onClick={() => {
                        dispatch({
                            type: "incrementPageNumber",
                        });
                    }}
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>
    );
};

PdfSinglePageView.displayName = "PdfSinglePageView";
