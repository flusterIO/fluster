import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState/initialState";
import { InitialInteractionsState, initialInteractionsState } from "../initialState/interactions";


const slice = createSlice({
    name: "interactions",
    initialState: initialState.interactions as typeof initialInteractionsState,
    reducers: {
        sm(state, action: PayloadAction<{
            key: keyof InitialInteractionsState["modals"],
            value: boolean
        }>) {
            state.modals[action.payload.key] = action.payload.value
        },
        showContactMeModal(state, action: PayloadAction<boolean | undefined>) {
            state.modals.contactMe = typeof action.payload === "boolean" ? action.payload : true
        }
    }
})


export const { sm, showContactMeModal } = slice.actions
export default slice.reducer

