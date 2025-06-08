import React, { ReactNode, useEffect, useState } from "react";
import store, { getStoreWithPreloadedState } from "./store";
import { Provider } from "react-redux";
import LoadingScreen from "@/components/loading_screen";

interface Props {
    children: ReactNode;
}

const ReduxProvider = ({ children }: Props) => {
    const [_store, _setStore] = useState<typeof store | null>(null);

    const getStore = async (): Promise<void> => {
        const storeRes = await getStoreWithPreloadedState();
        _setStore(storeRes);
    };

    useEffect(() => {
        getStore();
    }, []);

    if (_store === null) {
        return <LoadingScreen />;
    }

    return <Provider store={_store}>{children}</Provider>;
};

ReduxProvider.displayName = "ReduxProvider";

export default ReduxProvider;
