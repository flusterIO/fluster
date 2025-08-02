import React, { HTMLProps, type ReactNode } from "react";
import { openUrl } from "@tauri-apps/plugin-opener";

type AnchorTagProps = HTMLProps<HTMLAnchorElement>;

export const AnchorTag = (props: AnchorTagProps): ReactNode => {
    const isRemote = props.href?.startsWith("http");
    return (
        <a
            className="cursor-pointer"
            children={props.children}
            href={isRemote ? undefined : props.href}
            onClick={isRemote ? () => openUrl(props.href!) : undefined}
        />
    );
};

AnchorTag.displayName = "AnchorTag";
