import { SplitViewTextAreaInput } from "#/editor/presentation/split_view_input/split_view_input";
import { showToast } from "#/toast_notification/data/events/show_toast";
import { commands, TaskModel } from "@/lib/bindings";
import { Button, Form, TagInput } from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";
import { TaskNoteInputState } from "./types";
import dayjs from "dayjs";

const schema = z.object({
    inputValue: z.string(),
    tags: z.string().array(),
});

export const TaskNoteInput = ({
    initialValue,
}: {
    initialValue: string;
}): ReactNode => {
    const [searchParams] = useSearchParams();
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            inputValue: initialValue,
            tags: [],
        },
    });

    const handleSave = async (): Promise<void> => {
        const focusedTaskId = searchParams.get("fi");
        if (!focusedTaskId) {
            console.warn("No task id found. Cannot update task.");
            return;
        }
        const formData = form.getValues();
        const taskRes = await commands.getTaskById(focusedTaskId);
        if (taskRes.status === "ok") {
            const newData: TaskModel = {
                ...taskRes.data,
                ctime: new Date(taskRes.data.ctime ?? 0).valueOf().toString(),
                due_at: taskRes.data.due_at
                    ? dayjs(taskRes.data.due_at, {
                        utc: true,
                    })
                        .toDate()
                        .valueOf()
                        .toString()
                    : null,
                notes: formData.inputValue,
            };
            const res = await commands.createTask(
                newData,
                formData.tags.map((t) => {
                    return {
                        tag_value: t,
                        task_id: newData.id,
                    };
                })
            );
            if (res.status === "ok") {
                showToast({
                    title: "Success",
                    body: "Your task has been updated.",
                    duration: 5000,
                    variant: "Success",
                });
                window.dispatchEvent(
                    new CustomEvent("set-task-note-input-state", {
                        detail: {
                            state: TaskNoteInputState.showNote,
                        },
                    })
                );
            } else {
                console.error("Failed to update task: ", res.error);
            }
        } else {
            console.error("Failed to read task.");
        }
    };
    return (
        <Form {...form}>
            <TagInput
                form={form}
                name="tags"
                label="Tags"
                classes={{
                    formItem: "w-full mb-4",
                }}
            />
            <SplitViewTextAreaInput
                initialValue={initialValue}
                label="Note"
                form={form}
                name="inputValue"
            />
            <div className="w-full flex flex-row justify-end items-center">
                <Button onClick={handleSave}>Save</Button>
            </div>
        </Form>
    );
};

TaskNoteInput.displayName = "TaskNoteInput";
