import { AppState } from "@/state/initial_state";
import { Audio } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { connect } from "react-redux";
import { MediaPlayerProps } from "../../../../../../../packages/fluster_developer/dist/embeddable_components/types";
import "react-h5-audio-player/lib/styles.css";

const connector = connect((state: AppState) => ({
    basePath: state.core.notesDirectory,
}));

export const WrappedAudioComponent = connector(
    (props: MediaPlayerProps): ReactNode => {
        return <Audio {...props} />;
    }
);

WrappedAudioComponent.displayName = "WrappedAudio";
