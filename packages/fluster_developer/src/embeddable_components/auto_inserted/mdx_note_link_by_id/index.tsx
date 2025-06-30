import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { commands } from "../../../lib/bindings";

interface MdxNoteLinkByIdProps {
    id: string;
    children: ReactNode;
}

export const MdxNoteLinkById = ({
    children,
    id,
}: MdxNoteLinkByIdProps): ReactNode => {
    const [noteFilePath, setNoteFilePath] = useState<string | null>(null);
    const noteFilePathRef = useRef(noteFilePath);
    const getData = async (noteId: string): Promise<void> => {
        /* const res = await commands.  */
    };
    useEffect(() => {
        noteFilePathRef.current = noteFilePath;
    }, [noteFilePath]);

    return <span className="text-primary">{children}</span>;
};

MdxNoteLinkById.displayName = "MdxNoteLinkById";
