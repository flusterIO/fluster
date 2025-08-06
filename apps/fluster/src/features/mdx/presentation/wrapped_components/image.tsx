import { AppState } from "@/state/initial_state";
import { MdxImageProps, MdxImage } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { connect } from "react-redux";

const connector = connect((state: AppState) => ({
    basePath: state.core.notesDirectory,
}));

export const WrappedImage = connector((props: MdxImageProps): ReactNode => {
    return <MdxImage {...props} />;
});

WrappedImage.displayName = "WrappedImage";
