"use client";
import { ReactNode, createContext, useContext, useReducer } from "react";

interface BlogLayoutState {
    sidebarOpen: boolean;
    mobileLayout: boolean | "not set";
}

export const BlogLayoutContext = createContext<BlogLayoutState>({
    sidebarOpen: true,
    mobileLayout: "not set",
});

type BlogLayoutContextActions =
    | { type: "openSidebar" }
    | { type: "closeSidebar" }
    | { type: "setMobileLayout"; payload: boolean };

export const BlogLayoutDispatchContext = createContext<
    React.Dispatch<BlogLayoutContextActions>
>(null!);

export const useBlogLayoutContext = () => useContext(BlogLayoutContext);
export const useBlogLayoutDispatch = () =>
    useContext(BlogLayoutDispatchContext);

export const BlogLayoutContextReducer = (
    state: BlogLayoutState,
    action: BlogLayoutContextActions
): BlogLayoutState => {
    switch (action.type) {
        case "openSidebar": {
            return {
                ...state,
                sidebarOpen: true,
            };
        }
        case "closeSidebar": {
            return {
                ...state,
                sidebarOpen: false,
            };
        }
        case "setMobileLayout": {
            return {
                ...state,
                mobileLayout: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

BlogLayoutContextReducer.displayName = "BlogLayoutContextReducer";

interface BlogLayoutProviderProps {
    children: ReactNode;
    initialValues: BlogLayoutState;
}

export const BlogLayoutProvider = ({
    children,
    initialValues,
}: BlogLayoutProviderProps) => {
    const [state, dispatch] = useReducer(
        BlogLayoutContextReducer,
        initialValues || {}
    );

    return (
        <BlogLayoutContext.Provider value={state}>
            <BlogLayoutDispatchContext.Provider value={dispatch}>
                {children}
            </BlogLayoutDispatchContext.Provider>
        </BlogLayoutContext.Provider>
    );
};
