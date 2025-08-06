import { AppState } from "@/state/initial_state";
import { MediaPlayerProps, Video } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { connect } from "react-redux";

const connector = connect((state: AppState) => ({
    basePath: state.core.notesDirectory,
}));

export const WrappedVideoComponent = connector(
    (props: MediaPlayerProps): ReactNode => {
        return <Video {...props} />;
    }
);

WrappedVideoComponent.displayName = "WrappedVideo";
