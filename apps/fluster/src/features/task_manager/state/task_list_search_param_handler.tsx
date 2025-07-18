import { commands } from "@/lib/bindings";
import { useEffect, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { useTaskListDispatch } from "./task_list_context";
import { useEventListener } from "@fluster.io/dev";

export const TaskListSearchParamHandler = (): ReactNode => {
    const dispatch = useTaskListDispatch();
    const [searchParams] = useSearchParams();
    const listId = searchParams.get("listId");
    const getData = async (_id: string): Promise<void> => {
        const res = await commands.getTaskListData(_id);
        if (res.status === "ok") {
            dispatch({
                type: "setNewData",
                payload: res.data,
            });
        } else {
            console.error(
                "An error occurred while getting the task list data: ",
                res.error
            );
        }
    };
    useEffect(() => {
        if (listId) {
            getData(listId);
        }
        /* eslint-disable-next-line  --  */
    }, [listId]);
    useEventListener("request-task-list-refresh", (e) => {
        const sp = searchParams.get("listId");
        const _id = e.detail.id.length ? e.detail.id : sp;
        if (_id) {
            getData(_id);
        }
    });
    return null;
};

TaskListSearchParamHandler.displayName = "TaskListSearchParamHandler";
