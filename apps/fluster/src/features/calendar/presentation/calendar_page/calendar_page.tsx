import React, { useState, type ReactNode } from "react";
import { View, Calendar, Event, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop, {
    withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import { addHours } from "date-fns/addHours";
import { startOfHour } from "date-fns/startOfHour";
import "../../../../styles/calendar.scss";

const DnDCalendar = withDragAndDrop(Calendar);

export const CalendarPage = (): ReactNode => {
    const [focusedDate, setFocusedDate] = useState<Date>(new Date());
    const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
    const now = new Date();
    const start = endOfHour(now);
    const end = addHours(start, 2);
    const [view, setView] = useState<View>("week");
    const [events, setEvents] = useState<Event[]>([
        {
            title: "Learn cool stuff",
            start,
            end,
        },
    ]);
    const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
        const { start, end } = data;

        setEvents((currentEvents) => {
            const firstEvent = {
                start: new Date(start),
                end: new Date(end),
            };
            return [...currentEvents, firstEvent];
        });
    };

    const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
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
            <DnDCalendar
                defaultView={view}
                view={view}
                events={events}
                localizer={localizer}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                date={focusedDate}
                onNavigate={(newDate, view, action) => {
                    console.log("action: ", action);
                    console.log("newDate: ", newDate);
                    setFocusedDate(newDate);
                    setView(view);
                }}
                onView={(view) => {
                    console.log("view: ", view);
                    setView(view);
                }}
                resizable
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
