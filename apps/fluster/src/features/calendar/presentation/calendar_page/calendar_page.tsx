import React, { useEffect, useState, type ReactNode } from "react";
import { View, Calendar, Event, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop, {
    withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import "../../../../styles/calendar.scss";
import { commands, TaskModel } from "@/lib/bindings";
import { parseDate, showToast } from "@fluster.io/dev";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setPanelRightOpen } from "#/panel_right/state/slice";
import { BodyPortal } from "@/components/body_portal";
import { TaskDetailSideDrawer } from "#/task_manager/presentation/task_detail_side_drawer";

const DnDCalendar = withDragAndDrop(Calendar);

export const CalendarPage = (): ReactNode => {
    const dispatch = useDispatch();
    const [focusedDate, setFocusedDate] = useState<Date>(new Date());
    const [view, setView] = useState<View>("week");
    const [events, setEvents] = useState<Event[]>([]);
    const taskToEvent = (t: TaskModel): Event => {
        return {
            title: t.label,
            start: new Date(t.due_at as string),
            end: new Date(new Date(t.due_at as string).valueOf() + 7200000),
            resource: t,
        } satisfies Event;
    };
    const getEvents = async (): Promise<void> => {
        let items: Event[] = [];
        const taskLists = await commands.getAllTaskLists();
        if (taskLists.status === "error") {
            showToast({
                title: "Oh no",
                body: "Something went wrong while gathering your tasks.",
                duration: 5000,
                variant: "Error",
            });
            return;
        }
        for await (const taskList of taskLists.data) {
            const tasks = await commands.getTaskListTasks(taskList.id);
            if (tasks.status === "ok") {
                items = [
                    ...items,
                    ...tasks.data.filter((x) => x.due_at).map((t) => taskToEvent(t)),
                ];
            }
        }
        setEvents(items);
    };
    useEffect(() => {
        getEvents();
    }, []);
    const onEventDrop: withDragAndDropProps["onEventDrop"] = async (data) => {
        let task: TaskModel = data.event.resource;
        let newTask: TaskModel = {
            ...task,
            ctime: parseDate(task.ctime).valueOf().toString(),
            due_at: data.start.valueOf().toString(),
        };
        const res = await commands.createTask(newTask, []);
        if (res.status === "ok") {
            setEvents(
                events.map((e): Event => {
                    if ((e.resource as TaskModel).id === newTask.id) {
                        return {
                            title: newTask.label,
                            resource: newTask,
                            start: dayjs(parseInt(newTask.due_at as string), {
                                utc: true,
                            }).toDate(),
                            end: new Date(
                                dayjs(parseInt(newTask.due_at as string), {
                                    utc: true,
                                }).valueOf() + 7200000
                            ),
                        } satisfies Event;
                    } else {
                        return e;
                    }
                })
            );
        } else {
            console.error("An error occurred while modifying this task.");
        }
        console.log("newTask: ", newTask);
        console.log(data);
    };
    const locales = {
        "en-US": enUS,
    };
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    return (
        <div className="w-full h-full min-h-[calc(100vh-2rem)] flex flex-col justify-center items-center">
            <BodyPortal>
                <TaskDetailSideDrawer />
            </BodyPortal>
            <DnDCalendar
                defaultView={view}
                view={view}
                events={events}
                localizer={localizer}
                onEventDrop={onEventDrop}
                date={focusedDate}
                resizable={false}
                onNavigate={(newDate, view) => {
                    setFocusedDate(newDate);
                    setView(view);
                }}
                onSelectEvent={(event) => {
                    dispatch(setPanelRightOpen(true));
                    // FIXME: Horrible hack here. Fix this when you have time.
                    setTimeout(() => {
                        window.dispatchEvent(
                            new CustomEvent("show-task-details", {
                                detail: {
                                    taskId: ((event as Event).resource as TaskModel).id,
                                },
                            })
                        );
                    }, 500);
                }}
                onView={(view) => {
                    setView(view);
                }}
                style={{
                    height: "calc(100vh-6rem)",
                    maxHeight: "768px",
                    width: "1080px",
                    maxWidth: "90%",
                }}
            />
        </div>
    );
};

CalendarPage.displayName = "CalendarPage";
