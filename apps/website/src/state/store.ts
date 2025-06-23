import CoreReducer from "./slices/core";
import InteractionsReducer from "./slices/interactions";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = {
    core: CoreReducer,
    interactions: InteractionsReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
