import { commands } from "@/lib/bindings";
import store from "./store";
import { AppState } from "./initial_state";
import { Storage, WebStorage } from "redux-persist";

export const appStateKey = "appState";

declare global {
  interface WindowEventMap {
    "have-set-global-state": CustomEvent<object>;
  }
}

export const saveSettingState = async (): Promise<boolean> => {
  const state = store.getState();
  const res = await commands.saveSettingState(
    JSON.stringify(state),
    appStateKey
  );
  if (res.status === "error") {
    console.error("Could not save settings state.");
    return false;
  }
  return true;
};

const objectify = <T extends object>(data: string | T): T =>
  typeof data === "string" ? (JSON.parse(data) as T) : data;

const hasPersistedState = (_data: string | AppState): boolean => {
  const data: { [K in keyof AppState]: AppState[K] | string } =
    objectify<AppState>(_data);
  if (!data.core) {
    return false;
  } else {
    return objectify<AppState["core"]>(data.core).hasLoadedSavedState;
  }
};

export const stateStorage: WebStorage = {
  async setItem(storageId: string, value) {
    console.log("storageId: ", storageId);
    console.log("value: ", value);
    if (!hasPersistedState(value)) {
      console.warn(
        "Cannot save state as the global state has not yet been initialized."
      );
      return;
    }
    console.info(`Saving state...`, value);
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
  async getItem(storageId): Promise<string | null> {
    console.info("Loading state...");
    const res = await commands.getSettingState(storageId);
    if (res.status === "ok") {
      return res.data;
    } else {
      console.error("Could not read settings from the database");
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
