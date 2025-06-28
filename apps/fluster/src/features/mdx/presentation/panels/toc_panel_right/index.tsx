import SidePanelContainer from "@/components/side_panel_container";
import { commands, MdxNoteGroup, TocEntry } from "@/lib/bindings";
import { Switch } from "@fluster.io/dev";
import React, { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { InlineMdxContent } from "../../inline_mdx_content";
import { MdxTocPanelTagList } from "./tag_list";
import { LoadingComponent } from "@/components/loading_screen";
import { H4 } from "@/components/typography/typography";
import { SingleTaggable } from "./single_taggable";

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
    const [toc, setToc] = useState<TocEntry[]>([]);
    const [item, setItem] = useState<MdxNoteGroup | null>(null);
    const [bookmarked, setBookmarked] = useState(false);
    const fsPath = searchParams.get("fsPath");
    const getToc = async (fs_path: string): Promise<void> => {
        const res = await commands.getTocFromFsPath(fs_path);
        if (res.status === "ok") {
            setToc(res.data);
        } else {
            console.error(
                `An error occurred while gathering the table of contents for path ${fs_path}`
            );
        }
    };
    const getItem = async (fs_path: string): Promise<void> => {
        const res = await commands.getNoteGroupByFilePath(fs_path);
        if (res.status === "ok") {
            setItem(res.data);
        } else {
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

    useEffect(() => {
        if (fsPath) {
            getItem(fsPath);
            getToc(fsPath);
            getBookmarked(fsPath);
        }
    }, [fsPath]);

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
                        {toc.map((t) => {
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
