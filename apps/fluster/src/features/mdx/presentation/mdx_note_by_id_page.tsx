import { showToast } from "#/toast_notification/data/events/show_toast";
import React, { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import MdxNotePage from "./mdx_note_page";

const MdxNoteByIdPage = (): ReactNode => {
  const [searchParams] = useSearchParams();
  const [content] = useState("");
  const getNoteContentFromFs = async (fsPath: string): Promise<void> => {
    console.log("fsPath: ", fsPath);
    throw Error("Not implemented");
  };

  const getNoteContentById = async (noteId: number): Promise<void> => {
    console.log("noteId: ", noteId);
    throw Error("Not implemented");
  };

  useEffect(() => {
    const fsPath = searchParams.get("fsPath");
    if (fsPath && fsPath.length) {
      getNoteContentFromFs(fsPath).catch(() => {
        showToast({
          title: "Oh no",
          body: "An error occurred while gathering your content.",
          duration: 5000,
          variant: "Error",
        });
      });
    } else {
      const noteId = searchParams.get("noteId");
      if (noteId && noteId.length) {
        getNoteContentById(parseInt(noteId)).catch(() => {
          showToast({
            title: "Oh no",
            body: "An error occurred while gathering your content.",
            duration: 5000,
            variant: "Error",
          });
        });
      }
    }
  }, [searchParams]);

  return <MdxNotePage content={content} />;
};

MdxNoteByIdPage.displayName = "MdxNoteByIdPage";

export default MdxNoteByIdPage;
