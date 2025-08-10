import React, { useEffect, useState, type ReactNode } from "react";
import { commands, TaskListData } from "../../../lib/bindings";
import {
    TaskListDataTable,
    TaskListDataTableProps,
} from "../task_list_data_table";
import { useEventListener } from "../../../hooks/use_event_listener";

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

const TaskListNotFound = ({ list }: Pick<TaskListProps, "list">): ReactNode => {
    return (
        <div className="w-full text-center">
            The <span className="italic">{list}</span> task list could not be found.
        </div>
    );
};

export const TaskList = (props: TaskListProps): ReactNode => {
    /// Set to false if item not found.
    const [data, setData] = useState<TaskListData | null | false>(null);
    const getItems = async (list: string): Promise<void> => {
        const taskLists = await commands.getAllTaskLists();
        if (taskLists.status === "ok") {
            const item = taskLists.data.find(
                (x) => x.label.toLowerCase() === list.toLowerCase()
            );
            if (item) {
                const taskListData = await commands.getTaskListData(item.id);
                if (taskListData.status === "ok") {
                    setData(taskListData.data);
                } else {
                    setData(false);
                }
            } else {
                setData(false);
            }
        } else {
            console.error("An error occurred while attempting to get task lists.");
        }
    };
    useEffect(() => {
        getItems(props.list);
    }, [props.list]);

    useEventListener("refresh-embedded-task-list", (e) => {
        if (data && e.detail.taskListId === data.list.id) {
            getItems(props.list);
        }
    });

    if (data === false) {
        return <TaskListNotFound list={props.list} />;
    }

    if (data === null) {
        return <div className="w-full h-fit text-center">loading task list...</div>;
    }
    return <TaskListDataTable {...props} data={data} />;
};

TaskList.displayName = "TaskList";
