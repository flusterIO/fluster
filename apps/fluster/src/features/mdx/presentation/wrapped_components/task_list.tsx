import { TaskList, TaskListProps } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { InlineMdxContent } from "../inline_mdx_content";

export const WrappedTaskList = (
    props: Omit<TaskListProps, "InlineMdxContent">
): ReactNode => {
    return <TaskList {...props} InlineMdxContent={InlineMdxContent} />;
};

WrappedTaskList.displayName = "WrappedTaskList";
