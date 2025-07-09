"use client";
import React, { ReactNode, createContext, useReducer, useContext } from "react";
import { KanbanBoardListData, KanbanBoardModel } from "@/lib/bindings";
import { useLoaderData } from "react-router";

export enum KanbanActions {
    setKanbanLists,
    showAddBoardModal,
    removeListById,
}

export interface KanbanState {
    lists: KanbanBoardModel[];
    addBoardModalOpen: boolean;
}

const defaultInitialValues: KanbanState = {
    lists: [],
    addBoardModalOpen: false,
};

export const KanbanContext = createContext<KanbanState>(defaultInitialValues);

type KanbanContextActions =
    | {
        type: KanbanActions.setKanbanLists;
        payload: KanbanBoardModel[];
    }
    | {
        type: KanbanActions.showAddBoardModal;
        payload: boolean;
    }
    | {
        type: KanbanActions.removeListById;
        payload: string;
    };

export const KanbanDispatchContext = createContext<
    React.Dispatch<KanbanContextActions>
>(null!);

export const useKanbanContext = () => useContext(KanbanContext);
export const useKanbanDispatch = () => useContext(KanbanDispatchContext);

export const KanbanContextReducer = (
    state: KanbanState,
    action: KanbanContextActions
): KanbanState => {
    switch (action.type) {
        case KanbanActions.setKanbanLists: {
            return {
                ...state,
                lists: action.payload,
            };
        }
        case KanbanActions.removeListById: {
            return {
                ...state,
                lists: state.lists.filter((x) => x.id !== action.payload),
            };
        }
        case KanbanActions.showAddBoardModal: {
            return {
                ...state,
                addBoardModalOpen: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

KanbanContextReducer.displayName = "KanbanContextReducer";

interface KanbanProviderProps {
    children: ReactNode;
    initialValues?: Partial<KanbanState>;
}

export const KanbanProvider = ({
    children,
    initialValues,
}: KanbanProviderProps) => {
    const [state, dispatch] = useReducer(
        KanbanContextReducer,
        initialValues
            ? { ...initialValues, ...defaultInitialValues }
            : defaultInitialValues
    );

    const { data }: { data: KanbanBoardListData } = useLoaderData();

    return (
        <KanbanContext.Provider
            value={{
                lists: data.boards,
                addBoardModalOpen: state.addBoardModalOpen,
            }}
        >
            <KanbanDispatchContext.Provider value={dispatch}>
                {children}
            </KanbanDispatchContext.Provider>
        </KanbanContext.Provider>
    );
};
