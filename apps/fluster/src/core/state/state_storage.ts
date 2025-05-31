import { commands } from "@/lib/bindings";
import { Storage } from "redux-persist";

export const stateStorage: Storage = {
    async setItem(storageId: string, value) {
        const res = await commands.saveSettingState(
            typeof value === "string" ? value : JSON.stringify(value),
            storageId
        );
        if (res.status === "error") {
            console.warn(
                "An error occured while trying to save your settings. If this is your first time using Fluster, you can ignore this error. If this continues however, you may not be able to persist state between the state of your app between uses. If that is the case, submit an issue on Github."
            );
        }
    },
    async getItem(storageId) {
        const res = await commands.getSettingState(storageId);
        if (res.status === "ok") {
            return JSON.parse(res.data);
        } else {
            return null;
        }
    },
    async removeItem(storageId) {
        const res = await commands.deleteSettingState(storageId);
        if (res.status === "error") {
            console.warn(
                "An error occurred while deleting the existing setting state."
            );
        }
    },
};
