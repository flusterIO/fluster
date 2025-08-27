import { TaskModel } from "../lib/bindings";
import { parseDate } from "./parse_date";

export const parseTaskDates = (item: TaskModel): TaskModel => {
    return {
        ...item,
        due_at: item.due_at
            ? parseDate(item.due_at).toDate().valueOf().toString()
            : null,
        ctime: parseDate(item.ctime).toDate().valueOf().toString(),
    };
};
