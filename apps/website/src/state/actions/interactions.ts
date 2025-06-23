import { InitialInteractionsState } from "../initialState/interactions";
import { sm } from "../slices/interactions";
import store from "../store";

export const setModalState = <K extends keyof InitialInteractionsState["modals"]>(key: K, value: InitialInteractionsState["modals"][K]) => {
    return store.dispatch(sm({
        key,
        value
    }))
}


export const showThemeModal = () => {
    window.dispatchEvent(new CustomEvent("show-theme-modal"))
}
