import store from "../store";
import { setLandingSectionState } from "../slices/core";


export const setLandingSection = (newSection: string) => {
    window.history.replaceState(null, "", `?section=${newSection}`);
    store.dispatch(setLandingSectionState(newSection))
};


export const setDocsBackButtonPath = (newPath: string) => {
    window.dispatchEvent(new CustomEvent("set-docs-back-button-path", {
        detail: {
            path: newPath
        }
    }))
}
