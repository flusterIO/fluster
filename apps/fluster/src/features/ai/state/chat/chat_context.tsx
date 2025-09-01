"use client";
import { AiChatData, AiChatMessageModel } from "@/lib/bindings";
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
    incomingStreamBody: string | null;
}

export const initialAiChatState: AiChatState = {
    inputValue: "",
    data: null,
    loading: AiLoadingState.idle,
    incomingStreamBody: null,
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
        type: "appendModelMessage";
        payload: AiChatMessageModel;
    }
    | {
        type: "appendUserMessage";
        payload: AiChatMessageModel;
    }
    | {
        type: "setLoadingState";
        payload: AiLoadingState;
    }
    | {
        type: "setAiChatIncomingStreamData";
        payload: string;
    }
    | {
        type: "chatRequestSuccess";
        payload: AiChatMessageModel;
    }
    | {
        type: "chatRequestFail";
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
        case "appendUserMessage": {
            return {
                ...state,
                data:
                    state.data === null
                        ? null
                        : {
                            ...state.data,
                            messages: [...state.data.messages, action.payload],
                        },
            };
        }
        case "appendModelMessage": {
            return {
                ...state,
                incomingStreamBody: null,
                data:
                    state.data === null
                        ? null
                        : {
                            ...state.data,
                            messages: [...state.data.messages, action.payload],
                        },
            };
        }
        case "setAiChatIncomingStreamData": {
            return {
                ...state,
                incomingStreamBody: action.payload,
            };
        }
        case "setChatInputValue": {
            return {
                ...state,
                inputValue: action.payload,
            };
        }
        case "setChatData": {
            return {
                ...state,
                data:
                    action.payload === null
                        ? null
                        : {
                            ...action.payload,
                            messages: action.payload.messages.sort((a, b) => {
                                const a_at = new Date(a.sent_at);
                                const b_at = new Date(b.sent_at);
                                return a_at.valueOf() - b_at.valueOf();
                            }),
                        },
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
                incomingStreamBody: null,
                data: state.data
                    ? {
                        ...state.data,
                        messages: [...(state.data?.messages ?? []), action.payload],
                    }
                    : null,
            };
        }
        case "chatRequestFail": {
            return {
                ...state,
                loading: AiLoadingState.idle,
                incomingStreamBody: null,
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
