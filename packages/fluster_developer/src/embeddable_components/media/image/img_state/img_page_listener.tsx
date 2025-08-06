import { useEffect, type ReactNode } from "react";
import { useMdxImageDispatch } from "./img_provider";
import { useEventListener } from "../../../../hooks/use_event_listener";
import { Location } from "react-router";

declare global {
    interface WindowEventMap {
        "page-navigate": CustomEvent<{ location: Location }>;
    }
}

export const ImagePageListener = (): ReactNode => {
    const dispatch = useMdxImageDispatch();
    const updateImageList = (): void => {
        const em = document.getElementById("mdx-page-container");
        if (!em) {
            return;
        }
        const imgs = em.querySelectorAll("div[data-fluster-img-container]");
        const ids: string[] = [];
        imgs.forEach((x) => {
            ids.push(x.id);
        });
        console.log("ids: ", ids);
        dispatch({
            type: "setImageIdList",
            payload: ids,
        });
        // get list of elements here and update the list.
    };
    useEventListener("page-navigate", updateImageList);
    useEffect(() => {
        updateImageList();
        /* eslint-disable-next-line  --  */
    }, [location]);
    return null;
};

ImagePageListener.displayName = "ImagePageListener";
