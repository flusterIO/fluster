import React, { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { FocusedTaskDetail } from "./focused_task_detail";
import { NoFocusedTaskBanner } from "./no_focused_task";
import { commands, TaskModel, TaskModelWithTags } from "@/lib/bindings";
import { TaskNoteInput } from "./task_note_input";
import { useEventListener } from "@fluster.io/dev";
import { TaskNoteInputState } from "./types";
import { SetDueAtModal } from "./set_due_date_modal";
import { BodyPortal } from "@/components/body_portal";

interface SetTaskNoteInput {
    state: TaskNoteInputState;
}

declare global {
    interface WindowEventMap {
        "set-task-note-input-state": CustomEvent<SetTaskNoteInput>;
    }
}

export const TaskDetailPanelRight = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<TaskModelWithTags | null>(null);
    const [inputType, setInputType] = useState<TaskNoteInputState>(
        data ? TaskNoteInputState.showNote : TaskNoteInputState.noteNotFound
    );

    useEffect(() => {
        setInputType(
            data ? TaskNoteInputState.showNote : TaskNoteInputState.noteNotFound
        );
    }, [data]);

    useEventListener("set-task-note-input-state", (e) => {
        setInputType(e.detail.state);
    });

    const focusedTaskId = searchParams.get("fi");

    const getData = async (_id: string): Promise<void> => {
        if (focusedTaskId) {
            const res = await commands.getTaskById(_id);
            if (res.status === "ok") {
                setData(res.data);
            } else {
                console.error("Could not get task details by id.");
            }
        }
    };

    useEffect(() => {
        if (
            inputType !== TaskNoteInputState.noteNotFound &&
            inputType !== TaskNoteInputState.showNote
        ) {
            return;
        }
        if (focusedTaskId) {
            getData(focusedTaskId);
        } else {
            setData(null);
        }
        /* eslint-disable-next-line  --  */
    }, [focusedTaskId, inputType]);

    const handleCreateNote = async (): Promise<void> => {
        setInputType(TaskNoteInputState.showNoteInput);
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center pb-6">
            <BodyPortal>
                <SetDueAtModal />
            </BodyPortal>
            {inputType === TaskNoteInputState.noteNotFound && <NoFocusedTaskBanner />}
            {inputType === TaskNoteInputState.showNote && data && (
                <FocusedTaskDetail handleCreateNote={handleCreateNote} data={data} />
            )}
            {inputType === TaskNoteInputState.showNoteInput && data && (
                <TaskNoteInput initialValue={data.notes} tags={data.tags} />
            )}
        </div>
    );
};

TaskDetailPanelRight.displayName = "TaskDetailPanelRight";
