import PanelContainer from "@/components/util/panel_container";
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
        <PanelContainer className="flex flex-col justify-start items-center">
            <TaskListProvider>
                <TaskListSearchParamHandler />
                <AddTaskModal />
                <div className="w-[min(768px,90%)]">
                    {taskListId ? (
                        <>
                            <TaskListButtonBar />
                            <TaskList />
                        </>
                    ) : (
                        <NoSelectedTaskList />
                    )}
                </div>
            </TaskListProvider>
        </PanelContainer>
    );
};

TaskListsPage.displayName = "TaskListsPage";
