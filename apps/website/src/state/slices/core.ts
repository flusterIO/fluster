import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";
import { NavbarButton } from "../initialState/core";

const slice = createSlice({
    name: "core",
    initialState: initialState.core as (typeof initialState)["core"],
    reducers: {
        setInitialRender(state, action: PayloadAction<boolean>) {
            state.hasRendered = action.payload;
        },
        setLandingSectionState(state, action: PayloadAction<string>) {
            state.landingSection = action.payload;
        },
        createNavbarButton(state, action: PayloadAction<NavbarButton>) {
            const idExists = state.navbarButtons.some(
                (a) => a.id === action.payload.id,
            );
            state.navbarButtons = idExists
                ? state.navbarButtons.map((a) =>
                    a.id === action.payload.id ? action.payload : a,
                )
                : [...state.navbarButtons, action.payload];
        },
        removeNavbarButton(state, action: PayloadAction<string>) {
            state.navbarButtons = state.navbarButtons.filter(
                (a) => a.id !== action.payload,
            );
        },
        setDrawerBreakpoint(state, action: PayloadAction<number>) {
            state.drawer = {
                ...state.drawer,
                breakpoint: action.payload,
            };
        },
        closeDrawer(state) {
            state.drawer = {
                ...state.drawer,
                open: false,
            };
        },
        openDrawer(
            state,
            action: PayloadAction<Partial<Omit<typeof initialState.core.drawer, "open">>>,
        ) {
            state.drawer = {
                ...state.drawer,
                ...action.payload,
                open: true,
            };
        },
    },
});

export const {
    setInitialRender,
    setLandingSectionState,
    createNavbarButton,
    removeNavbarButton,
    openDrawer,
    closeDrawer,
    setDrawerBreakpoint,
} = slice.actions;
export default slice.reducer;
