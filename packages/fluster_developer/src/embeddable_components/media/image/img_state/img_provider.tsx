"use client";
import { ReactNode, createContext, useReducer, useContext } from "react";

export interface MdxImageState {
    imgIds: string[];
    haveSetImages: boolean;
}

const defaultInitialValues: MdxImageState = {
    imgIds: [],
    haveSetImages: false,
};

export const MdxImageContext =
    createContext<MdxImageState>(defaultInitialValues);

type MdxImageContextActions = { type: "setImageIdList"; payload: string[] };

export const MdxImageDispatchContext = createContext<
    React.Dispatch<MdxImageContextActions>
>(null!);

export const useMdxImageContext = () => useContext(MdxImageContext);
export const useMdxImageDispatch = () => useContext(MdxImageDispatchContext);

export const MdxImageContextReducer = (
    state: MdxImageState,
    action: MdxImageContextActions
): MdxImageState => {
    switch (action.type) {
        case "setImageIdList": {
            return {
                ...state,
                imgIds: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

MdxImageContextReducer.displayName = "MdxImageContextReducer";

interface MdxImageProviderProps {
    children: ReactNode;
    initialValues?: Partial<MdxImageState>;
}

export const MdxImageProvider = ({
    children,
    initialValues,
}: MdxImageProviderProps) => {
    const [state, dispatch] = useReducer(
        MdxImageContextReducer,
        initialValues
            ? { ...initialValues, ...defaultInitialValues }
            : defaultInitialValues
    );

    return (
        <MdxImageContext.Provider value={state}>
            <MdxImageDispatchContext.Provider value={dispatch}>
                {children}
            </MdxImageDispatchContext.Provider>
        </MdxImageContext.Provider>
    );
};
