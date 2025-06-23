import React, {
    RefObject,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { PdfSinglePageView } from "../single_page";
import {
    usePdfContext,
    usePdfDispatch,
} from "#/pdf/state/provider/pdf_context";
import { useSearchParams } from "react-router";
import { Thumbnail } from "react-pdf";
import {
    cn,
    useEventListener,
    useIsomorphicLayoutEffect,
    useMainPanelSize,
} from "@fluster.io/dev";
import { Size } from "@fluster.io/dev";

interface PdfSinglePageViewWithTocProps {
    containerRef: RefObject<HTMLDivElement>;
}

export const PdfSinglePageViewWithToc = (
    props: PdfSinglePageViewWithTocProps
): ReactNode => {
    const { numPages, pageNumber } = usePdfContext();
    const dispatch = usePdfDispatch();
    const [searchParams] = useSearchParams();
    const mainPanelSize = useMainPanelSize();
    // Page width and page height are being mantained seperately because they play different roles. The pageHeight is used by the toc and is mostly a read only value, with the height determined by react-pdf.
    // Width on the otherhand is set to determine the size of the page and is derived from the coontainer size.
    /* const [pageWidth, setPageWidth] = useState<number | undefined>(undefined); */
    // The height of the pdf page, not the web page.
    const [pageHeight, setPageHeight] = useState(0);
    const fsPath = searchParams.get("fsPath");
    const thumbnails = useMemo(() => {
        return Array(numPages)
            .fill(0)
            .map((_, i) => {
                return ({ active }: { active: boolean }) => (
                    <Thumbnail
                        key={`page-${i}`}
                        className={cn(
                            "max-w-[130px] h-auto border-l-[6px] transition-colors duration-300",
                            active ? "border-l-primary" : "border-l-transparent"
                        )}
                        width={130}
                        pageNumber={i + 1}
                        onClick={() => {
                            dispatch({
                                type: "setPageNumber",
                                payload: i + 1,
                            });
                        }}
                    />
                );
            });
        /* eslint-disable-next-line  --  */
    }, [numPages, fsPath]);

    const handlePageHeight = (): void => {
        const em = props.containerRef?.current?.querySelector(".react-pdf__Page");
        console.log("em: ", em);
        const pageHeight = props.containerRef?.current
            ?.querySelector(".react-pdf__Page")
            ?.getBoundingClientRect().height;
        console.log("pageHeight: ", pageHeight);
        if (pageHeight) {
            setPageHeight(pageHeight);
        }
    };

    useIsomorphicLayoutEffect(() => {
        handlePageHeight();
        const obs = new MutationObserver(handlePageHeight);
        obs.observe(props.containerRef.current, {
            childList: true,
        });
        props.containerRef?.current?.addEventListener("resize", handlePageHeight);
        return () => {
            obs.disconnect();
            props.containerRef.current?.removeEventListener(
                "resize",
                handlePageHeight
            );
        };
    }, []);
    const handleResize = (panelSize: Size): void => {
        console.log("panelSize: ", panelSize);
        if (!props.containerRef.current) {
            return;
        }
        /* const containerRect = props.containerRef.current.getBoundingClientRect(); */
        /* const containerRatio = containerRect.width / containerRect.height; */
        /* const maxWidth = containerRatio * containerRect.height - 64; */
        /* console.log("maxWidth: ", maxWidth); */
        /* console.log("containerRect: ", containerRect, maxWidth); */
        /* const containerRatio = containerRect.width / containerRect.height; */
        /* if (containerRatio < canvasRatio) { */
        /*     setPageHeight; */
        /* } */
        /* setPageWidth(Math.min(containerRect.width - 150, maxWidth)); */
        handleHeight();
    };
    useEffect(() => {
        const pageHeight = props.containerRef?.current
            ?.querySelector(".react-pdf__Page")
            ?.getBoundingClientRect().height;
        if (pageHeight) {
            setPageHeight(pageHeight);
        }
    }, []);
    const handleHeight = (): void => {
        const pageHeight = props.containerRef?.current
            ?.querySelector(".react-pdf__Page")
            ?.getBoundingClientRect().height;
        if (pageHeight) {
            if (pageHeight < 100) {
                setTimeout(handleHeight, 1000);
            }
            setPageHeight(pageHeight);
        }
    };
    useEventListener("pdf-loaded", () => {
        handlePageHeight();
    });

    /* useEventListener("panel-resize", handleResize); */
    useEffect(() => {
        if (mainPanelSize) {
            handleResize(mainPanelSize);
        }
        /* eslint-disable-next-line  --  */
    }, [mainPanelSize]);

    return (
        <div className="w-fit flex flex-row justify-center items-start gap-4">
            <div
                className="w-fit overflow-x-hidden overflow-y-auto flex flex-col justify-start items-center gap-2"
                style={{
                    ...(pageHeight && {
                        height: `${pageHeight}px`,
                    }),
                }}
            >
                {thumbnails.map((ThumbnailComponent, i) => {
                    return <ThumbnailComponent active={pageNumber === i + 1} />;
                })}
            </div>
            <PdfSinglePageView />
        </div>
    );
};

PdfSinglePageViewWithToc.displayName = "PdfSinglePageViewWithToc";
