import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { setPanelRightOpen } from "#/panel_right/state/slice";
import { refreshTaskList } from "#/task_manager/state/refresh_task_list";
import { commands, TaskModel } from "@/lib/bindings";
import { AppRoutes, Checkbox, cn, showToast } from "@fluster.io/dev";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
import { XIcon } from "lucide-react";
import React, { MouseEvent, useMemo, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

interface TaskListItemProps {
    data: TaskModel;
}

export const TaskListItem = ({ data }: TaskListItemProps): ReactNode => {
    const nav = useNavigate();
    const [searchParams] = useSearchParams();
    const focusedTaskId = searchParams.get("fi");
    const isActive = focusedTaskId === data.id;
    const dispatch = useDispatch();
    const handleCompletedUpdate = async (
        e: MouseEvent<HTMLButtonElement>
    ): Promise<void> => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const newData: TaskModel = {
                ...data,
                ctime: new Date(data.ctime).valueOf().toString(),
                due_at: data.due_at
                    ? dayjs(data.due_at, {
                        utc: true,
                    })
                        .toDate()
                        .valueOf()
                        .toString()
                    : null,
                complete: !data.complete,
            };
            /* FIXME: Pass tags here. */
            const res = await commands.createTask(newData, []);
            if (res.status === "ok") {
                refreshTaskList(data.task_list_id);
            } else {
                console.error("An error occurred while updating your task.");
            }
        } catch (err) {
            console.log("Error: ", err);
        }
    };

    const dueAtString: string | null = useMemo(() => {
        if (!data.due_at) {
            return null;
        }
        return dayjs(data.due_at, {
            utc: true,
        }).format("MMM Do, YYYY [at] hh:mm a");
    }, [data.due_at]);

    const timeRemaining = useMemo(() => {
        const d = dayjs(data.due_at, {
            utc: true,
        });
        return d.diff(dayjs(new Date()));
    }, [data.due_at]);

    const removeDueAt = async (e: MouseEvent): Promise<void> => {
        e.stopPropagation();
        e.preventDefault();
        const res = await commands.createTask(
            {
                ...data,
                due_at: null,
                ctime: new Date(data.ctime).valueOf().toString(),
            },
            []
        );
        console.log("res: ", res);
        if (res.status === "ok") {
            showToast({
                title: "Success",
                duration: 3000,
                body: "Your task's deadline was removed.",
                variant: "Info",
            });
            refreshTaskList(data.task_list_id);
        } else {
            console.error("Error: ", res.error);
        }
    };
    return (
        <div
            onClick={() => {
                if (isActive) {
                    searchParams.delete("fi");
                } else {
                    searchParams.set("fi", data.id);
                    dispatch(setPanelRightOpen(true));
                }
                nav(`${AppRoutes.taskLists}?${searchParams.toString()}`);
            }}
            className={cn(
                "p-4 @[540px]/task_list:pr-6 grid grid-cols-[4rem_1fr] border rounded-lg bg-card mb-2 hover:bg-muted/60 transition-colors duration-150 cursor-pointer",
                isActive && "bg-muted/80"
            )}
        >
            <div className="w-full h-full flex flex-col justify-center items-center">
                <Checkbox onClick={handleCompletedUpdate} checked={data.complete} />
            </div>
            <div>
                <InlineMdxContent mdx={data.label} />
                {dueAtString && (
                    <div
                        className={cn(
                            "text-sm text-muted-foreground w-fit px-2 py-1 rounded",
                            !data.complete &&
                            Boolean(timeRemaining) &&
                            timeRemaining <= 0 &&
                            "bg-destructive text-destructive-foreground"
                        )}
                    >
                        <XIcon className="w-3 h-3 inline mr-2" onClick={removeDueAt} />
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                window.dispatchEvent(
                                    new CustomEvent("show-set-due-at-modal", {
                                        detail: {
                                            id: data.id,
                                        },
                                    })
                                );
                            }}
                            className="cursor-pointer"
                        >
                            {dueAtString}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

TaskListItem.displayName = "TaskListItem";
