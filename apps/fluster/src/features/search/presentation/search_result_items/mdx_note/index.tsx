import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { getMdxNoteUrl } from "#/mdx/utils/get_mdx_note_url";
import { MdxNoteGroup } from "@/lib/bindings";
import { buttonVariants, Badge, AppRoutes } from "@fluster.io/dev";
import dayjs from "dayjs";
import React, { HTMLProps, useMemo, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router";

interface MdxNoteSearchResultProps extends HTMLProps<HTMLDivElement> {
    item: MdxNoteGroup;
}

export const MdxNoteSearchResult = ({
    item,
}: MdxNoteSearchResultProps): ReactNode => {
    const nav = useNavigate();

    const ctime = useMemo(() => {
        if (item.mdx.ctime === "1970-01-01T00:00:00") {
            return null;
        } else {
            return dayjs(item.mdx.ctime).format("MM/DD/YYYY");
        }
    }, [item.mdx.ctime]);

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
            <div className="w-full flex flex-row justify-start items-center gap-4">
                {item.front_matter.subject ? (
                    <Badge
                        role="button"
                        onClick={() => {
                            if (!item.front_matter.subject) {
                                return;
                            }
                            const sp = new URLSearchParams();
                            sp.set("by_subject", item.front_matter.subject.value);
                            nav(`${AppRoutes.search}?${sp.toString()}`);
                        }}
                        variant={"secondary"}
                    >
                        {item.front_matter.subject.value}
                    </Badge>
                ) : null}

                {item.front_matter.topic ? (
                    <Badge
                        role="button"
                        onClick={() => {
                            if (!item.front_matter.topic) {
                                return;
                            }
                            const sp = new URLSearchParams();
                            sp.set("by_topic", item.front_matter.topic.value);
                            nav(`${AppRoutes.search}?${sp.toString()}`);
                        }}
                        variant={"secondary"}
                    >
                        {item.front_matter.topic.value}
                    </Badge>
                ) : null}
            </div>
            {item.front_matter.summary ? (
                <InlineMdxContent
                    className="w-full text-wrap [&>p]:text-card-foreground/80 px-4"
                    mdx={item.front_matter.summary}
                />
            ) : null}
            <div className="w-full flex flex-row justify-between items-center">
                <div className="text-muted-foreground text-sm">{ctime}</div>
                <NavLink className={buttonVariants()} to={url}>
                    View
                </NavLink>
            </div>
        </div>
    );
};

MdxNoteSearchResult.displayName = "MdxNoteSearchResult";
