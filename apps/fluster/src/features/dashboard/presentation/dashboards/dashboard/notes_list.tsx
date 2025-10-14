import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { getMdxNoteUrl } from "#/mdx/utils/get_mdx_note_url";
import { commands, DashboardData, MdxNoteGroup } from "@/lib/bindings";
import { getSubjectUrl, getTopicUrl } from "@/lib/url_utils";
import { showToast, cn, Button, Badge } from "@fluster.io/dev";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, FileText, Star } from "lucide-react";
import React, { useState, type ReactNode } from "react";

interface DashboardNotesListProps {
    items: MdxNoteGroup[];
    bookmarks: DashboardData["bookmarks"];
    getData: () => Promise<void>;
}

export const DashboardNotesList = (
    props: DashboardNotesListProps
): ReactNode => {
    const PER_PAGE = 5;
    const [page, setPage] = useState(0);
    return (
        <>
            {props.items.slice(page * PER_PAGE, (page + 1) * PER_PAGE).map((note) => (
                <div
                    key={note.mdx.file_path}
                    className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                        <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">
                            <a
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                href={getMdxNoteUrl(note.mdx.file_path)}
                            >
                                <InlineMdxContent abortIfNoMath mdx={note.front_matter.title} />
                            </a>
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <a
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                href={
                                    note.front_matter?.subject?.value
                                        ? getSubjectUrl(note.front_matter.subject.value)
                                        : undefined
                                }
                            >
                                {note.front_matter?.subject?.value ?? "No Subject"}{" "}
                            </a>
                            <span>•</span>
                            <a
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                href={
                                    note.front_matter?.topic?.value
                                        ? getTopicUrl(note.front_matter.topic.value)
                                        : undefined
                                }
                            >
                                {note.front_matter?.topic?.value ?? "No Topic"}
                            </a>
                            <span>•</span>
                            <span>
                                {dayjs(note.mdx.last_read, {
                                    utc: true,
                                }).format("MMM Do, YYYY [at] hh:mm a")}
                            </span>
                        </div>
                        <div className="flex flex-wrap flex-row gap-1 mt-2">
                            {note.tags.slice(0, 3).map((tag) => (
                                <Badge
                                    key={`tag-${tag.value}`}
                                    variant="secondary"
                                    className="text-xs"
                                >
                                    {tag.value}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={async (e) => {
                            e.stopPropagation();
                            if (
                                props.bookmarks.some(
                                    (bookmark) => bookmark.file_path === note.mdx.file_path
                                )
                            ) {
                                const res = await commands.removeBookmark(note.mdx.file_path);
                                if (res.status === "ok") {
                                    await props.getData();
                                } else {
                                    showToast({
                                        title: "Something went wrong",
                                        body: "An error occurred while attempting to toggle this bookmark. If this continues, please file an issue on Github.",
                                        duration: 5000,
                                        variant: "Error",
                                    });
                                }
                            } else {
                                const res = await commands.addBookmark(note.mdx.file_path);
                                if (res.status === "ok") {
                                    await props.getData();
                                } else {
                                    showToast({
                                        title: "Something went wrong",
                                        body: "An error occurred while attempting to toggle this bookmark. If this continues, please file an issue on Github.",
                                        duration: 5000,
                                        variant: "Error",
                                    });
                                }
                            }
                        }}
                    >
                        <Star
                            className={cn(
                                "h-4 w-4",
                                props.bookmarks.some(
                                    (bookmark) => bookmark.file_path === note.mdx.file_path
                                )
                                    ? "fill-primary stroke-primary"
                                    : "fill-none stroke-foreground"
                            )}
                        />
                    </Button>
                </div>
            ))}
            <div className="flex flex-row justify-end items-center gap-3 px-4">
                <Button
                    size="icon"
                    className="w-5 h-5"
                    variant={"secondary"}
                    disabled={page === 0}
                    onClick={() => {
                        setPage(page - 1);
                    }}
                >
                    <ChevronLeft className="w-3 h-3" />
                </Button>
                <Button
                    size="icon"
                    className="w-5 h-5"
                    variant={"secondary"}
                    disabled={props.items.length <= PER_PAGE * (page + 1)}
                    onClick={() => {
                        setPage(page + 1);
                    }}
                >
                    <ChevronRight className="w-3 h-3" />
                </Button>
            </div>
        </>
    );
};

DashboardNotesList.displayName = "DashboardNotesList";
