import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { setPanelRightOpen } from "#/panel_right/state/slice";
import { commands, TaskModel } from "@/lib/bindings";
import { AppRoutes, Checkbox, cn } from "@fluster.io/dev";
import dayjs from "dayjs";
import React, { MouseEvent, type ReactNode } from "react";
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
        complete: !data.complete,
      };
      console.log("newData: ", newData);
      /* FIXME: Pass tags here. */
      const res = await commands.createTask(newData, []);
      console.log("res: ", res);
      if (res.status === "ok") {
        window.dispatchEvent(
          new CustomEvent("request-task-list-refresh", {
            detail: {
              id: data.task_list_id,
            },
          })
        );
      } else {
        console.error("An error occurred while updating your task.");
      }
    } catch (err) {
      console.log("Error: ", err);
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
        {data.due_at && (
          <div>{`Due: ${dayjs(data.due_at).format(
            "MM/DD/YY [at] HH:mm"
          )}`}</div>
        )}
      </div>
    </div>
  );
};

TaskListItem.displayName = "TaskListItem";
