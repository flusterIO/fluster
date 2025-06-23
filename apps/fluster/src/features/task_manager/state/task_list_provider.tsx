import React, { useReducer } from "react";
import {
    initialTaskListState,
    TaskListContext,
    TaskListContextReducer,
    TaskListDispatchContext,
    TaskListProviderProps,
} from "./task_list_context";

export const TaskListProvider = ({
    children,
    initialValues,
}: TaskListProviderProps) => {
    const [state, dispatch] = useReducer(
        TaskListContextReducer,
        initialValues
            ? { ...initialValues, ...initialTaskListState }
            : initialTaskListState
    );

    return (
        <TaskListContext.Provider value={state}>
            <TaskListDispatchContext.Provider value={dispatch}>
                {children}
            </TaskListDispatchContext.Provider>
        </TaskListContext.Provider>
    );
};
