export const sendAudioSeekRequest = (id: string, seconds: number) => {
    window.dispatchEvent(
        new CustomEvent("audio-seek-to-seconds", {
            detail: {
                id,
                seconds,
            },
        })
    );
};
