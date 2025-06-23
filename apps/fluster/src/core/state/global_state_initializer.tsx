import { useEffect, type ReactNode } from "react";
import { connect, useDispatch } from "react-redux";
import { AppState } from "./initial_state";
import { savedStateApplied } from "#/settings/state/slice";

const connector = connect((state: AppState) => ({
    haveSet: state.core.hasLoadedSavedState,
}));

/// A utility component that handles the initial state by setting the core.hasLoadedSavedState value to true. This is a super bad hack, but the initial state was being sent to the database. This key was added to disallow saving state with the initial values, but it then needs to be set to true after a certain delay.
export const GlobalStateInitializer = connector(
    ({ haveSet }: { haveSet: boolean }): ReactNode => {
        const dispatch = useDispatch();
        useEffect(() => {
            setTimeout(() => {
                if (!haveSet) {
                    dispatch(savedStateApplied());
                }
            }, 5000);
            /* eslint-disable-next-line  --  */
        }, []);
        return null;
    }
);

GlobalStateInitializer.displayName = "GlobalStateInitializer";
