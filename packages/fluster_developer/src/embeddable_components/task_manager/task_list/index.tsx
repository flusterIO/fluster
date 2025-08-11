import React, { type ReactNode } from "react";
import {
    TaskListDataTable,
    TaskListDataTableProps,
} from "../task_list_data_table";

declare global {
    interface WindowEventMap {
        "refresh-embedded-task-list": CustomEvent<{
            taskListId: string;
        }>;
    }
}

export interface TaskListProps extends Omit<TaskListDataTableProps, "data"> {
    list: string;
}

export const TaskList = (props: TaskListProps): ReactNode => {
    /// Set to false if item not found.

    return <TaskListDataTable {...props} />;
};

TaskList.displayName = "TaskList";
