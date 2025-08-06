import React, { useEffect, useState, type ReactNode } from "react";
import { commands } from "../../../lib/bindings";
import { NoFileProvided } from "../video";
import { ImageComponent, ImageComponentProps } from "./img_component";

export interface MdxImageProps extends ImageComponentProps {
    file?: string;
    id?: string;
    basePath: string;
}

export const MdxImage = ({
    file,
    basePath,
    ...props
}: MdxImageProps): ReactNode => {
    const [fullPath, setFullPath] = useState<string | null>(null);
    const parsePath = async (fp: string, bp: string): Promise<void> => {
        const parsedPath = await commands.normalizePath(fp, bp);
        setFullPath(parsedPath);
    };
    useEffect(() => {
        if (file) {
            parsePath(file, basePath);
        }
    }, [file, basePath]);
    if (!file) {
        return <NoFileProvided />;
    }
    if (!fullPath) {
        return null;
    }
    return <ImageComponent {...props} fsPath={fullPath} />;
};

MdxImage.displayName = "MdxImage";
