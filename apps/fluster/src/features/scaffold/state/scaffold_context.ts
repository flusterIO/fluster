import { NavigationItem } from "@/models/navigation_item";
import { globalNavigationItems } from "@/models/static_model_data/navigation_items";
import { createContext, useContext } from "react";

export interface DesktopScaffoldState {
    sideNavButtons: NavigationItem[];
}

export const desktopScaffoldDefaultInitialValues: DesktopScaffoldState = {
    sideNavButtons: globalNavigationItems(),
};

export const DesktopScaffoldContext = createContext<DesktopScaffoldState>(
    desktopScaffoldDefaultInitialValues
);

export enum ScaffoldActionTypes {
    setSideNavButtons,
}

type DesktopScaffoldContextActions = {
    type: ScaffoldActionTypes.setSideNavButtons;
    payload: NavigationItem[];
};

export const DesktopScaffoldDispatchContext = createContext<
    React.Dispatch<DesktopScaffoldContextActions>
>(null!);

export const useDesktopScaffoldContext = () =>
    useContext(DesktopScaffoldContext);
export const useDesktopScaffoldDispatch = () =>
    useContext(DesktopScaffoldDispatchContext);

export const DesktopScaffoldContextReducer = (
    state: DesktopScaffoldState,
    action: DesktopScaffoldContextActions
): DesktopScaffoldState => {
    switch (action.type) {
        case ScaffoldActionTypes.setSideNavButtons: {
            return {
                ...state,
                sideNavButtons: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

DesktopScaffoldContextReducer.displayName = "DesktopScaffoldContextReducer";
