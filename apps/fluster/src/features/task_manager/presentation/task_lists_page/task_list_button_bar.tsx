import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { useTaskListContext } from "#/task_manager/state/task_list_context";
import { Button } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

export const TaskListButtonBar = (): ReactNode => {
    const { items, focusedTaskList } = useTaskListContext();
    if (!focusedTaskList) {
        return null;
    }
    return (
        <div className="w-full flex flex-row justify-between items-center py-8">
            <div>
                <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    <InlineMdxContent mdx={focusedTaskList?.label} />
                </div>
                <div className="text-sm mt-2">{`Found ${items.length} tasks.`}</div>
            </div>
            <div>
                <Button
                    onClick={() => {
                        window.dispatchEvent(new CustomEvent("show-add-task-modal"));
                    }}
                >
                    Create
                </Button>
            </div>
        </div>
    );
};

TaskListButtonBar.displayName = "TaskListButtonBar";
