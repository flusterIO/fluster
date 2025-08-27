import { TaskList, TaskListProps } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { InlineMdxContent } from "../inline_mdx_content";
import { AddTaskModal } from "#/task_manager/presentation/task_lists_page/add_task_modal";

export const WrappedTaskList = (
    props: Omit<TaskListProps, "InlineMdxContent" | "TaskListModal">
): ReactNode => {
    return (
        <TaskList
            {...props}
            InlineMdxContent={InlineMdxContent}
            AddTaskModal={AddTaskModal}
        />
    );
};

WrappedTaskList.displayName = "WrappedTaskList";
