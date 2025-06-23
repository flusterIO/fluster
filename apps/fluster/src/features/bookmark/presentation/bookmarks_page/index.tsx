import { LoadingComponent } from "@/components/loading_screen";
import PanelContainer from "@/components/util/panel_container";
import { commands, MdxBookmarkData } from "@/lib/bindings";
import React, { useEffect, useState, type ReactNode } from "react";
import { BookmarkList } from "./bookmark_list";
import { useEventListener } from "@fluster.io/dev";

declare global {
  interface WindowEventMap {
    "request-bookmark-list-refresh": CustomEvent<object>;
  }
}

const BookmarksPage = (): ReactNode => {
  const [bookmarks, setBookmarks] = useState<MdxBookmarkData[] | null>(null);
  const getBookmarks = async (): Promise<void> => {
    const res = await commands.getBookmarkedNotes();
    if (res.status === "ok") {
      setBookmarks(res.data);
    } else {
      setBookmarks([]);
      console.error("An error occurred while gathering your bookmarks.");
    }
  };
  useEffect(() => {
    getBookmarks();
  }, []);

  useEventListener("request-bookmark-list-refresh", () => {
    getBookmarks();
  });

  return (
    <PanelContainer className="pt-16">
      {bookmarks === null ? (
        <div className="w-full h-full min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center">
          <LoadingComponent />
        </div>
      ) : (
        <BookmarkList items={bookmarks} />
      )}
    </PanelContainer>
  );
};

BookmarksPage.displayName = "BookmarksPage";

export default BookmarksPage;
