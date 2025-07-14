import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { commands, MdxBookmarkData } from "@/lib/bindings";
import {
    AppRoutes,
    Button,
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { useNavigate } from "react-router";

interface BookmarkListItemProps {
    item: MdxBookmarkData;
}

export const BookmarkListItem = ({
    item,
}: BookmarkListItemProps): ReactNode => {
    const nav = useNavigate();
    const visitBookmark = (): void => {
        const sp = new URLSearchParams();
        sp.set("fsPath", item.note.file_path);
        nav(`${AppRoutes.viewMdxNote}?${sp.toString()}`);
    };
    const handleRemoveBookmark = async (): Promise<void> => {
        const res = await commands.removeBookmark(item.note.file_path);
        if (res.status === "ok") {
            window.dispatchEvent(new CustomEvent("request-bookmark-list-refresh"));
        } else {
            console.error("An error occurred while removing a bookmark.");
        }
    };
    return (
        <Card className="w-[min(768px,90%)]">
            <CardHeader>
                <CardTitle className="cursor-pointer" onClick={visitBookmark}>
                    <InlineMdxContent
                        className="w-full [&_p]:!text-xl [&_p]:font-semibold cursor-pointer"
                        mdx={item.front_matter.title}
                    />
                </CardTitle>
                {item.front_matter.summary && (
                    <CardDescription>
                        <InlineMdxContent mdx={item.front_matter.summary} />
                    </CardDescription>
                )}
            </CardHeader>
            <CardFooter className="w-full flex flex-row justify-end items-center">
                <Button onClick={handleRemoveBookmark} variant="secondary">
                    Remove Bookmark
                </Button>
            </CardFooter>
        </Card>
    );
};

BookmarkListItem.displayName = "BookmarkListItem";
