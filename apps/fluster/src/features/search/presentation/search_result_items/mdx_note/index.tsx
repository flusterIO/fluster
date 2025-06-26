import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { getMdxNoteUrl } from "#/mdx/utils/get_mdx_note_url";
import { MdxNoteGroup } from "@/lib/bindings";
import { buttonVariants } from "@fluster.io/dev";
import dayjs from "dayjs";
import React, { HTMLProps, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router";

interface MdxNoteSearchResultProps extends HTMLProps<HTMLDivElement> {
  item: MdxNoteGroup;
}

export const MdxNoteSearchResult = ({
  item,
}: MdxNoteSearchResultProps): ReactNode => {
  const nav = useNavigate();
  if (!item.front_matter.title.length) {
    console.warn(
      `A note without a title was found at ${item.front_matter.mdx_note_file_path}`
    );
    return null;
  }

  if (!item.mdx.raw_body.length) {
    console.warn(
      `A note without a title was found at ${item.front_matter.mdx_note_file_path}`
    );
    return null;
  }

  const url = getMdxNoteUrl(item.mdx.file_path);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 px-4 py-3 rounded border">
      <InlineMdxContent
        onClick={() => nav(url)}
        className="w-full text-xl font-semibold cursor-pointer"
        mdx={item.front_matter.title}
      />
      {item.front_matter.summary ? (
        <InlineMdxContent
          className="w-full text-wrap [&>p]:text-card-foreground/80 px-4"
          mdx={item.front_matter.summary}
        />
      ) : null}
      <div className="w-full flex flex-row justify-between items-center">
        <div className="text-muted-foreground text-sm">
          {new Date(item.mdx.ctime).valueOf() === 0
            ? ""
            : dayjs(item.mdx.ctime).format("MM/DD/YYYY")}
        </div>
        <NavLink className={buttonVariants()} to={url}>
          View
        </NavLink>
      </div>
    </div>
  );
};

MdxNoteSearchResult.displayName = "MdxNoteSearchResult";
