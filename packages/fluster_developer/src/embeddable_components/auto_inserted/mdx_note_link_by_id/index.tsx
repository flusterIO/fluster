import React, { useEffect, useState, type ReactNode } from "react";
import { commands } from "../../../lib/bindings";
import { AppRoutes } from "../../../types/app_routes";
import { NavLink } from "react-router";
import { buttonVariants } from "../../../components/shad/button";
import { cn } from "../../../utils/cn";
import { showToast } from "../../../utils/show_toast";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../../../components/shad/tooltip";

interface MdxNoteLinkByIdProps {
    id: string;
    children: ReactNode;
}

export const MdxNoteLinkById = ({
    children,
    id,
}: MdxNoteLinkByIdProps): ReactNode => {
    const [noteUrl, setNoteUrl] = useState<string | null>(null);
    const getUrl = async (noteId: string): Promise<void> => {
        const res = await commands.getNoteByUserProvidedId(noteId);
        if (res.status === "ok") {
            const sp = new URLSearchParams();
            sp.set("fsPath", res.data.mdx.file_path);
            setNoteUrl(`${AppRoutes}?${sp.toString()}`);
        } else {
            showToast({
                title: "No note found",
                body: `We could not find a note with the id ${noteId}`,
                variant: "Error",
                duration: 5000,
            });
            setNoteUrl(null);
        }
    };
    useEffect(() => {
        getUrl(id);
    }, [id]);

    if (!noteUrl) {
        return (
            <Tooltip>
                <TooltipContent>No note found with this id.</TooltipContent>
                <TooltipTrigger asChild>
                    <span className={cn(buttonVariants({ variant: "secondary" }), "p-2")}>
                        {children}
                    </span>
                </TooltipTrigger>
            </Tooltip>
        );
    }

    return (
        <NavLink to={noteUrl} className={cn(buttonVariants(), "p-2")}>
            {children}
        </NavLink>
    );
};

MdxNoteLinkById.displayName = "MdxNoteLinkById";
