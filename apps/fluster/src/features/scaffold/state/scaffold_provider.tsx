import { NavigationItem } from "@/models/navigation_item";
import { globalNavigationItems } from "@/models/static_model_data/navigation_items";
import { ReactNode, createContext, useReducer, useContext } from "react";

export interface DesktopScaffoldState {
    sideNavButtons: NavigationItem[];
}

const defaultInitialValues: DesktopScaffoldState = {
    sideNavButtons: globalNavigationItems(),
};

export const DesktopScaffoldContext =
    createContext<DesktopScaffoldState>(defaultInitialValues);

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
    action: DesktopScaffoldContextActions,
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

interface DesktopScaffoldProviderProps {
    children: ReactNode;
    initialValues?: Partial<DesktopScaffoldState>;
}

export const DesktopScaffoldProvider = ({
    children,
    initialValues,
}: DesktopScaffoldProviderProps) => {
    const [state, dispatch] = useReducer(
        DesktopScaffoldContextReducer,
        initialValues
            ? { ...initialValues, ...defaultInitialValues }
            : defaultInitialValues,
    );

    return (
        <DesktopScaffoldContext.Provider value={state}>
            <DesktopScaffoldDispatchContext.Provider value={dispatch}>
                {children}
            </DesktopScaffoldDispatchContext.Provider>
        </DesktopScaffoldContext.Provider>
    );
};
