import React, { ReactNode } from "react";
import store from "./store";
import { Provider } from "react-redux";

interface ReduxProviderProps {
    children: ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
    return <Provider store={store}>{children}</Provider>;
};

ReduxProvider.displayName = "ReduxProvider";

export default ReduxProvider;
