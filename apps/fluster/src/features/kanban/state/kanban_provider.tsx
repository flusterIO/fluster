"use client";
import { ReactNode, createContext, useReducer, useContext } from "react";
import { KanbanListManager } from "./classes/kanban_list";

export enum KanbanActions {
    setKanbanLists,
    showAddBoardModal,
}

export interface KanbanState {
    lists: KanbanListManager[];
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
        payload: KanbanListManager[];
    }
    | {
        type: KanbanActions.showAddBoardModal;
        payload: boolean;
    };

export const KanbanDispatchContext = createContext<
    React.Dispatch<KanbanContextActions>
>(null!);

export const useKanbanContext = () => useContext(KanbanContext);
export const useKanbanDispatch = () => useContext(KanbanDispatchContext);

export const KanbanContextReducer = (
    state: KanbanState,
    action: KanbanContextActions,
): KanbanState => {
    switch (action.type) {
        case KanbanActions.setKanbanLists: {
            return {
                ...state,
                lists: action.payload,
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
            : defaultInitialValues,
    );

    return (
        <KanbanContext.Provider value={state}>
            <KanbanDispatchContext.Provider value={dispatch}>
                {children}
            </KanbanDispatchContext.Provider>
        </KanbanContext.Provider>
    );
};
