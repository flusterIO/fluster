import React, { ReactNode } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { GlobalStateInitializer } from "./global_state_initializer";
import { SplashScreen } from "#/splash_screen";

interface Props {
    children: ReactNode;
}

const ReduxProvider = ({ children }: Props) => {
    const persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate
                loading={<SplashScreen message="Loading saved data..." />}
                persistor={persistor}
            >
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
