import {
  usePdfContext,
  usePdfDispatch,
} from "#/pdf/state/provider/pdf_context";
import React, { useMemo, type ReactNode } from "react";
import { Thumbnail } from "react-pdf";
import { useSearchParams } from "react-router";

<<<<<<< HEAD
export const PdfGridView = (): ReactNode => {
  const dispatch = usePdfDispatch();
  const { numPages } = usePdfContext();
  const [searchParams] = useSearchParams();

  const fsPath = searchParams.get("fsPath");
  const thumbnails = useMemo(() => {
    return Array(numPages - 1)
      .fill(0)
      .map((_, i) => {
        return () => (
          <Thumbnail
            key={`page-${i}`}
            className="max-w-[130px] h-auto"
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
  return (
    <div className="grid grid-cols-1 @[540px]/pdf:grid-cols-2 @[768]/pdf:grid-cols-3">
      {thumbnails.map((T, i) => (
        <T key={`grid-thumb-${i}`} />
      ))}
    </div>
  );
||||||| f36a7f4
interface PdfGridViewProps {
  data: Source;
}

export const PdfGridView = (props: PdfGridViewProps): ReactNode => {
  return <div>Pdf grid view</div>;
=======
export const PdfGridView = (): ReactNode => {
  const { numPages } = usePdfContext();
  const dispatch = usePdfDispatch();
  const [searchParams] = useSearchParams();
  const fsPath = searchParams.get("fsPath");
  const thumbnails = useMemo(() => {
    return Array(numPages)
      .fill(0)
      .map((_, i) => {
        return () => (
          <Thumbnail
            key={`page-${i}`}
            className={"max-w-[200px] h-auto"}
            width={130}
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
  }, [numPages, fsPath]);
  return (
    <div className="grid grid-cols-3 gap-4 pb-8">
      {thumbnails.map((T) => {
        return <T />;
      })}
    </div>
  );
>>>>>>> feat/pdf
};

PdfGridView.displayName = "PdfGridView";
