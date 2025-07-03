import SidePanelContainer from "@/components/side_panel_container";
import { commands, MdxNoteGroup, TocEntry } from "@/lib/bindings";
import {
    Button,
    Switch,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    useEventListener,
} from "@fluster.io/dev";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { InlineMdxContent } from "../../inline_mdx_content";
import { MdxTocPanelTagList } from "./tag_list";
import { LoadingComponent } from "@/components/loading_screen";
import { H3, H4 } from "@/components/typography/typography";
import { SingleTaggable } from "./single_taggable";
import { sync } from "@/lib/sync_database";
import { secondaryToolTip } from "../../../../../styles/classes";

const TocEntryComponent = ({
    depth,
    children,
}: {
    depth: number;
    children: ReactNode;
}): ReactNode => {
    return (
        <div
            className="w-full max-w-full text-wrap font-semibold text-foreground/80 hover:text-foreground transition-colors duration-150 cursor-pointer"
            style={{
                marginLeft: `${16 * depth}px`,
                maxWidth: `calc(100% - ${16 * depth}px)`,
            }}
        >
            {children}
        </div>
    );
};

export const MdxTocPanelRight = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const [toc, setToc] = useState<TocEntry[] | "not-found">([]);
    const [item, setItem] = useState<MdxNoteGroup | null | "not-found">(null);
    const itemRef = useRef(item);
    const [bookmarked, setBookmarked] = useState(false);
    const fsPath = searchParams.get("fsPath");
    const getToc = async (fs_path: string): Promise<void> => {
        const res = await commands.getTocFromFsPath(fs_path);
        if (res.status === "ok") {
            setToc(res.data);
        } else {
            setToc("not-found");
            console.error(
                `An error occurred while gathering the table of contents for path ${fs_path}`
            );
        }
    };
    useEffect(() => {
        itemRef.current = item;
    }, [item])
    const getItem = async (fs_path: string): Promise<void> => {
        const res = await commands.getNoteGroupByFilePath(fs_path);
        if (res.status === "ok") {
            setItem(res.data);
        } else {
            setItem("not-found");
            console.error(
                `An error occurred while attempting to gather an MdxNoteGroup by file path.`
            );
        }
    };
    const getBookmarked = async (_fsPath: string): Promise<void> => {
        const res = await commands.filePathIsBookmarked(_fsPath);
        if (res.status === "ok") {
            setBookmarked(res.data);
        } else {
            console.error("An error occurred while attempting to read bookmarks.");
        }
    };
    const update = async (): Promise<void> => {
        const fsPath = searchParams.get("fsPath");
        if (!fsPath) {
            return
        }
        getItem(fsPath);
        getToc(fsPath);
        getBookmarked(fsPath);
    }

    useEventListener("database-sync-success", () => {
        if (!itemRef.current) {
            update();
        }
        update()
    })

    useEffect(() => {
        update()
        /* eslint-disable-next-line  --  */
    }, [fsPath]);

    const handleSync = async (): Promise<void> => {
        const res = await sync({
            with_ai: false,
            showSuccessToast: false,
        });
        if (res && fsPath) {
            getItem(fsPath);
            getToc(fsPath);
            getBookmarked(fsPath);
        }
    };

    if (item === "not-found") {
        return (
            <SidePanelContainer
                classes={{
                    childContainer:
                        "gap-2 h-full flex flex-col justify-between items-center",
                }}
                className="h-full"
                label="Note Details"
            >
                <div className="w-full h-full flex flex-col justify-center items-center space-y-6">
                    <H3 className="!mb-0">No note found</H3>
                    <p className="text-center text-foreground/80">
                        This data will not be accessible until your note is synchronized
                        with your database.
                    </p>
                    <Tooltip delayDuration={500}>
                        <TooltipContent
                            className={secondaryToolTip}
                            color="hsl(var(--secondary))"
                        >
                            Sync without AI for drastically increased performance.
                        </TooltipContent>
                        <TooltipTrigger asChild>
                            <Button onClick={() => handleSync()} className="w-full">
                                Sync without AI
                            </Button>
                        </TooltipTrigger>
                    </Tooltip>
                </div>
            </SidePanelContainer>
        );
    }

    return (
        <SidePanelContainer
            classes={{
                childContainer:
                    "gap-2 h-full flex flex-col justify-between items-center",
            }}
            className="h-full"
            label="Note Details"
        >
            {item ? (
                <>
                    <MdxTocPanelTagList tags={item.tags} />
                    <SingleTaggable item={item.front_matter.subject} taggable="Subject" />
                    <SingleTaggable item={item.front_matter.topic} taggable="Topic" />
                    <div className="w-full max-w-full flex flex-col justfy-start items-start flex-grow overflow-y-auto overflow-x-hidden">
                        <H4 className="mb-4">Table of Contents</H4>
                        {(Array.isArray(toc) ? toc : []).map((t) => {
                            return (
                                <TocEntryComponent key={`${t.depth}-${t.body}`} depth={t.depth}>
                                    <InlineMdxContent mdx={t.body} />
                                </TocEntryComponent>
                            );
                        })}
                    </div>
                    <div className="w-full flex flex-row justify-between items-center pl-4">
                        <span>Bookmarked:</span>
                        <Switch
                            checked={bookmarked}
                            onCheckedChange={async (isChecked) => {
                                const fsPath = searchParams.get("fsPath");
                                if (!fsPath) {
                                    return;
                                }
                                if (isChecked) {
                                    const res = await commands.addBookmark(fsPath);
                                    if (res.status === "ok") {
                                        setBookmarked(isChecked);
                                        return;
                                    }
                                } else {
                                    const res = await commands.removeBookmark(fsPath);
                                    if (res.status === "ok") {
                                        setBookmarked(isChecked);
                                    }
                                }
                            }}
                        />
                    </div>
                </>
            ) : (
                <LoadingComponent />
            )}
        </SidePanelContainer>
    );
};

MdxTocPanelRight.displayName = "MdxTocPanelRight";
