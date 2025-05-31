import React, { HTMLProps, type ReactNode } from "react";
import MdxContent from "./mdx_content";
import { cn } from "@fluster.io/dev";

export interface MdxNotePageSearchParams {
  /** The absolute path to the note on the user's computer. If this is provided, the content will be loaded directly from the file system, by passing the database except when strictly required. */
  fsPath?: string;
  /** The id of the note. When this is provided, a note will be loaded from the database, and an error will be displayed if that note is not found. */
  noteId?: string;
}

const MdxNotePage = ({
  content,
  ...props
}: HTMLProps<HTMLDivElement> & { content: string }): ReactNode => {
  return (
    <div
      {...props}
      className={cn(
        "w-full min-h-screen overflow flex flex-col justify-start items-center py-12 px-6 md:px-8",
        props.className
      )}
    >
      <div className="max-w-[1080px] h-fit">
        {content && <MdxContent mdx={content} />}
      </div>
    </div>
  );
};

MdxNotePage.displayName = "MdxNotePage";

export default MdxNotePage;
