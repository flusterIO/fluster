import React, { ReactNode } from "react";
import store from "./store";
import { Provider } from "react-redux";
import LoadingScreen from "@/components/loading_screen";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { GlobalStateInitializer } from "./global_state_initializer";

interface Props {
    children: ReactNode;
}

const ReduxProvider = ({ children }: Props) => {
    const persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                <>
                    <GlobalStateInitializer />
                    {children}
                </>
            </PersistGate>
        </Provider>
    );
};

ReduxProvider.displayName = "ReduxProvider";

export default ReduxProvider;
