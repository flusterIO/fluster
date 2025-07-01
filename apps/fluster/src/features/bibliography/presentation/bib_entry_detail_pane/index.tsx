import {
  BibEntryParsed,
  parseBibEntry,
} from "#/bibliography/data/models/bib_entry_parsed";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import {
  AppRoutes,
  Button,
  buttonVariants,
  cn,
  useEventListener,
} from "@fluster.io/dev";
import { motion } from "motion/react";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { BibEntryDetailsTable } from "./bib_entry_detail_table";
import { copyStringToClipboard } from "@/lib/copy_string_to_clipboard";
import { showToast } from "#/toast_notification/data/events/show_toast";
import { LinkedPdfBibButton } from "./linked_pdf_button";
import { LinkPdfToBibModal } from "../link_pdf_modal";
import { commands } from "@/lib/bindings";
import { NavLink } from "react-router";

export const BibEntryDetailSheet = (): ReactNode => {
  const [item, setItem] = useState<null | BibEntryParsed>(null);
  const [maxHeight, setMaxHeight] = useState(window.innerHeight - 256);
  const buttonContainer = useRef<HTMLDivElement>(null!);
  const headerContainer = useRef<HTMLDivElement>(null!);
  const close = (): void => {
    setItem(null);
  };
  const keyDownListener = (e: KeyboardEvent): void => {
    if (["Escape", "q"].includes(e.key)) {
      close();
    }
  };
  const handleResize = (): void => {
    setMaxHeight(
      window.innerHeight -
        (headerContainer.current?.getBoundingClientRect().height ?? 0) -
        140 -
        (buttonContainer.current?.getBoundingClientRect().height ?? 0)
    );
  };
  useEffect(() => {
    if (item) {
      handleResize();
    }
  }, [item]);
  useEffect(() => {
    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("resize", handleResize);
    const btn = buttonContainer.current;
    btn?.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", keyDownListener);
      btn?.removeEventListener("resize", handleResize);
    };
  }, []);
  const _data = useMemo(() => {
    if (!item) {
      return;
    }
    const d = JSON.parse(item.model.data);
    d.citation = item.model.html_citation;
    return d;
  }, [item]);

  const getItem = async (_id: string): Promise<void> => {
    const res = await commands.getBibEntryById(_id);
    if (res.status === "ok") {
      setItem(parseBibEntry(res.data));
    } else {
      console.error("An error occurred while reading a bib entry: ", res.error);
    }
  };

  useEventListener("show-bib-entry-details", (e) => {
    getItem(e.detail.itemId);
  });

  useEventListener("update-bib-entry", (e) => {
    if (item && e.detail.item.id === item.model.id) {
      setItem(parseBibEntry(e.detail.item));
    }
  });

  const byBibUrl = useMemo(() => {
    if (!item) {
      return "";
    }
    const sp = new URLSearchParams();
    sp.set("by_bib", item.id);
    return `${AppRoutes.search}?${sp.toString()}`;
  }, [item?.id]);

  if (item === null) {
    return null;
  }

  return (
    <>
      <LinkPdfToBibModal setItem={setItem} item={item} />
      <motion.div
        initial="initial"
        animate="show"
        variants={{
          initial: {
            opacity: 0,
          },
          show: {
            opacity: 1,
          },
        }}
        className="bg-background/60 z-[1] fixed w-screen h-screen top-0 left-0 right-0 bottom-0 no-scrollbar-all"
        onClick={close}
      />
      <motion.div
        initial="initial"
        animate="show"
        variants={{
          initial: {
            x: "100%",
          },
          show: {
            x: 0,
          },
        }}
        className="@container/bib_details h-screen max-w-[min(90vw,540px)] w-fit px-4 md:px-6 py-8 fixed top-0 right-0 border-l z-10 bg-card"
        style={{
          containerType: "initial",
        }}
      >
        <div className="w-full h-full flex flex-col justify-between items-center">
          <div className="w-full h-fit">
            <div ref={headerContainer} className="text-lg font-semibold">
              <InlineMdxContent mdx={item.title ?? ""} />
            </div>
            <div
              className="w-full no-scrollbar [&_div[data-slot='table-container']:w-fit overflow-y-auto"
              style={{
                maxHeight: `${maxHeight}px`,
              }}
            >
              <BibEntryDetailsTable data={_data} />
            </div>
          </div>
          <div
            ref={buttonContainer}
            className={cn(
              "w-full flex flex-col justify-end items-center gap-4",
              item.model.pdf_path && "flex-col"
            )}
          >
            <div className="w-full grid grid-cols-2 gap-4">
              <LinkedPdfBibButton
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full @[300px]/bib_details:w-fit"
                )}
                setItem={setItem}
                item={item}
              />
              <NavLink
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full @[300px]/bib_details:w-fit"
                )}
                to={byBibUrl}
              >
                Notes
              </NavLink>
            </div>
            <Button
              className={cn(
                buttonVariants(),
                "w-full @[300px]/bib_details:w-fit",
                item.model.pdf_path && "w-full"
              )}
              onClick={async () => {
                const content =
                  document.getElementById("tbl-citation")?.textContent;
                if (content?.length) {
                  const res = await copyStringToClipboard(content);
                  if (res) {
                    showToast({
                      title: "Success",
                      body: "Your citation has been copied to your clipboard.",
                      variant: "Success",
                      duration: 3000,
                    });
                  }
                }
              }}
            >
              Copy citation
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
