import { TaskModel } from "../lib/bindings";

export const parseTaskDates = (item: TaskModel): TaskModel => {
    return {
        ...item,
        due_at: item.due_at ? new Date(item.due_at).valueOf().toString() : null,
        ctime: new Date(item.ctime).valueOf().toString(),
    };
};
