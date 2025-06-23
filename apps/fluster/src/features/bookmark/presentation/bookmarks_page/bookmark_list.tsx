import { MdxBookmarkData } from "@/lib/bindings";
import React, { type ReactNode } from "react";
import { NoBookmarksFound } from "./none_found";
import { BookmarkListItem } from "./bookmark_list_item";

interface BookmarkListProps {
  items: MdxBookmarkData[];
}

export const BookmarkList = ({ items }: BookmarkListProps): ReactNode => {
  if (items.length === 0) {
    return <NoBookmarksFound />;
  }
  return (
    <div className="w-full h-full min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center gap-8">
      {items.map((item) => {
        return (
          <BookmarkListItem
            key={`bookmark-${item.note.file_path}`}
            item={item}
          />
        );
      })}
    </div>
  );
};

BookmarkList.displayName = "BookmarkList";
