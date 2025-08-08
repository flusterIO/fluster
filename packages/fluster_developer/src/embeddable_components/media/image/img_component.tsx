import { convertFileSrc } from "@tauri-apps/api/core";
import React, {
    useEffect,
    useId,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { PositionableProps } from "../../types";
import { cn } from "../../../utils/cn";
import { getPositionableClasses } from "../../util/get_positional_classes";
import { useMdxImageContext } from "./img_state/img_provider";

export interface ImageComponentProps extends PositionableProps {
    fsPath: string;
    caption?: string;
    id?: string;
}

export const ImageComponent = ({
    fsPath,
    id,
    caption,
    ...props
}: ImageComponentProps): ReactNode => {
    const hasCaption = Boolean(caption || id);
    const state = useMdxImageContext();
    const containerId = useId();
    const [data, setData] = useState<null | string>(null);

    useEffect(() => {
        setData(convertFileSrc(fsPath));
    }, [fsPath]);

    const imgIndex = useMemo(() => {
        return state.imgIds.indexOf(id ?? containerId);
        /* eslint-disable-next-line  --  */
    }, []);

    if (!data) {
        return null;
    }

    return (
        <div
            id={containerId}
            data-fluster-img-container={id ?? containerId}
            className={cn(
                "w-fit h-fit flex flex-col justify-center items-center max-w-[min(90%,768px)] max-h-[540px]]",
                getPositionableClasses(props)
            )}
        >
            <img className={cn("", hasCaption && "mb-2")} src={data} />
            {hasCaption ? (
                <div className="text-sm text-foreground/80 text-center max-w-[min(80%,540px)] ml-auto mr-auto">
                    {caption ?? `Image ${(imgIndex ?? -1) + 1}`}
                </div>
            ) : null}
        </div>
    );
};

ImageComponent.displayName = "ImageComponent";
