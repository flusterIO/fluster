import { commands, TaskModel } from "@/lib/bindings";
import { showToast, useEventListener } from "@fluster.io/dev";
import dayjs from "dayjs";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* BETA: This component is not currently used. Come back to this later and either remove this component and the related notifications or take a new approach, because this one is causing the same notification to show repeatedly. */

export const TaskManagerTimerHandler = (): ReactNode => {
    const [data, setData] = useState<TaskModel[]>([]);
    const [haveNotified, setHaveNotified] = useState(false);
    const timer = useRef<NodeJS.Timeout>(null);
    const getData = async (): Promise<void> => {
        const res = await commands.getIncompleteTasksWithDueDate();
        if (res.status === "ok") {
            setData(res.data);
        } else {
            console.error("Could not get tasks with due date.");
        }
    };
    useEffect(() => {
        getData();
    }, []);

    useEventListener("refresh-task-manager-timers", getData);

    useEffect(() => {
        if (data.length === 0) {
            return;
        }
        const overdue = data.filter(
            (a) =>
                dayjs(a.due_at, {
                    utc: true,
                })
                    .toDate()
                    .valueOf() <= new Date().valueOf()
        );
        if (overdue.length > 0) {
            if (haveNotified) {
                return;
            }
            const lists: string[] = [];
            for (const item of overdue) {
                if (!lists.includes(item.task_list_id)) {
                    lists.push(item.task_list_id);
                }
            }
            showToast({
                title: "Overdue Tasks",
                body: `Found ${overdue.length} overdue tasks on ${lists.length} list${lists.length > 1 ? "s" : ""
                    }.`,
                variant: "Info",
                duration: 5000,
            });
            setHaveNotified(true);
        } else {
            const item = data.sort(
                (a, b) =>
                    dayjs(a.due_at, {
                        utc: true,
                    })
                        .toDate()
                        .valueOf() -
                    dayjs(b.due_at, {
                        utc: true,
                    })
                        .toDate()
                        .valueOf()
            )[0];
            console.log("item: ", item);
            const timeRemaining =
                dayjs(item.due_at, {
                    utc: true,
                })
                    .toDate()
                    .valueOf() - new Date().valueOf();
            console.log("timeRemaining: ", timeRemaining);
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                showToast({
                    title: "Overdue Task",
                    body: item.label,
                    duration: 5000,
                    variant: "Info",
                });
            }, timeRemaining);
        }
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, [data]);
    return null;
};

TaskManagerTimerHandler.displayName = "TaskManagerTimerHandler";
