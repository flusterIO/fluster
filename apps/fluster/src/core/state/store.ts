import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import ScaffoldReducer from "#/scaffold/state/slice.ts";
export type ExtraReducers<T extends string> = Record<T, Reducer>;
export type ExtraInitialState<T extends string> = Record<T, object>;

const store = configureStore({
    reducer: {
        scaffold: ScaffoldReducer,
    },
});

export default store;
