import { useCallback, useEffect } from "react";

export const editorSaveKeydown = (cb: () => void, observables: any[] = []) =>
    useCallback((e: KeyboardEvent) => {
        if (e.code === "KeyS" && e.altKey) {
            e.stopPropagation();
            e.preventDefault();
            cb();
        }
    }, observables);

export const useEditorSaveListener = (
    cb: () => void,
    observables: any[] = []
) => {
    const f = editorSaveKeydown(cb, observables);
    useEffect(() => {
        document.addEventListener("keydown", f);
        return () => {
            document.removeEventListener("keydown", f);
        };
    }, [f]);
};
