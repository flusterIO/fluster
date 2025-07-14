import React, { type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { TaskList } from "./task_list";
import { NoSelectedTaskList } from "./no_selected_task_list";
import { AddTaskModal } from "./add_task_modal";
import { TaskListProvider } from "#/task_manager/state/task_list_provider";
import { TaskListSearchParamHandler } from "#/task_manager/state/task_list_search_param_handler";
import { TaskListButtonBar } from "./task_list_button_bar";

export const TaskListsPage = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const taskListId = searchParams.get("listId");
    return (
        <div className="flex flex-col justify-start items-center h-[calc(100vh-4rem)]">
            <TaskListProvider>
                <TaskListSearchParamHandler />
                <AddTaskModal />
                <div className="w-[min(768px,90%)] h-full">
                    {taskListId ? (
                        <div className="flex flex-col w-full h-full max-h-screen">
                            <TaskListButtonBar />
                            <TaskList />
                        </div>
                    ) : (
                        <NoSelectedTaskList />
                    )}
                </div>
            </TaskListProvider>
        </div>
    );
};

TaskListsPage.displayName = "TaskListsPage";
