"use client";
import { TaskListData, TaskListModel, TaskModel } from "@/lib/bindings";
import { ReactNode, createContext, useContext } from "react";

export interface TaskModelWithSelectedStatus extends TaskModel {
    selected: boolean;
}

export interface TaskListState {
    items: TaskModelWithSelectedStatus[];
    focusedTaskList: TaskListModel | null;
}

export const initialTaskListState: TaskListState = {
    items: [],
    focusedTaskList: null,
};

export const TaskListContext =
    createContext<TaskListState>(initialTaskListState);

type TaskListContextActions =
    | {
        type: "setItems";
        payload: TaskModelWithSelectedStatus[];
    }
    | {
        type: "toggleSelectedById";
        payload: string;
    }
    | {
        type: "setNewData";
        payload: TaskListData;
    };

export const TaskListDispatchContext = createContext<
    React.Dispatch<TaskListContextActions>
>(null!);

export const useTaskListContext = () => useContext(TaskListContext);
export const useTaskListDispatch = () => useContext(TaskListDispatchContext);

export const TaskListContextReducer = (
    state: TaskListState,
    action: TaskListContextActions
): TaskListState => {
    switch (action.type) {
        case "setItems": {
            return {
                ...state,
                items: action.payload,
            };
        }
        case "setNewData": {
            return {
                ...state,
                items: action.payload.items.map((x) => {
                    return {
                        ...x,
                        selected: false,
                    };
                }),
                focusedTaskList: action.payload.list,
            };
        }
        case "toggleSelectedById":
            return {
                ...state,
                items: state.items.map((x) => {
                    return {
                        ...x,
                        selected: x.id === action.payload ? !x.selected : x.selected,
                    };
                }),
            };
        default: {
            return state;
        }
    }
};

TaskListContextReducer.displayName = "TaskListContextReducer";

export interface TaskListProviderProps {
    children: ReactNode;
    initialValues?: Partial<TaskListState>;
}
