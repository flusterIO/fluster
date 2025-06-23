"use client";
import { AiChatData } from "@/lib/bindings";
import { ReactNode, createContext, useContext } from "react";

export enum AiLoadingState {
    /// idle: The last request has been resolved and we are awaiting user input.
    idle,
    /// pending: A requesy has been made and we are awaiting a response.
    pending,
}

export interface AiChatState {
    inputValue: string;
    data: AiChatData | null;
    loading: AiLoadingState;
}

export const initialAiChatState: AiChatState = {
    inputValue: "",
    data: null,
    loading: AiLoadingState.idle,
};

export const AiChatContext = createContext<AiChatState>(initialAiChatState);

export type AiChatContextActions =
    | {
        type: "setChatInputValue";
        payload: string;
    }
    | {
        type: "setChatData";
        payload: AiChatData | null;
    }
    | {
        type: "setLoadingState";
        payload: AiLoadingState;
    }
    | {
        type: "chatRequestSuccess";
        payload: null;
    };

export const AiChatDispatchContext = createContext<
    React.Dispatch<AiChatContextActions>
>(null!);

export const useAiChatContext = () => useContext(AiChatContext);
export const useAiChatDispatch = () => useContext(AiChatDispatchContext);

export const AiChatContextReducer = (
    state: AiChatState,
    action: AiChatContextActions
): AiChatState => {
    switch (action.type) {
        case "setChatInputValue": {
            return {
                ...state,
                inputValue: action.payload,
            };
        }
        case "setChatData": {
            return {
                ...state,
                data: action.payload,
            };
        }
        case "setLoadingState": {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case "chatRequestSuccess": {
            return {
                ...state,
                inputValue: "",
                loading: AiLoadingState.idle,
            };
        }
        default: {
            return state;
        }
    }
};

AiChatContextReducer.displayName = "AiChatContextReducer";

export interface AiChatProviderProps {
    children: ReactNode;
    initialValues?: Partial<AiChatState>;
}
