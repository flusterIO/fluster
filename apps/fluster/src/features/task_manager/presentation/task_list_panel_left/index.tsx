import SidePanelContainer from "@/components/side_panel_container";
import { commands, TaskListModel } from "@/lib/bindings";
import {
    Button,
    Form,
    TextInputGroup,
    useEventListener,
} from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TaskListCard } from "./task_list_card";

const schema = z.object({
    inputValue: z.string(),
});

declare global {
    interface WindowEventMap {
        "request-task-lists-refresh": CustomEvent<object>;
    }
}

export const TaskListPanelLeft = (): ReactNode => {
    const [lists, setLists] = useState<TaskListModel[]>([]);
    const inputValue = useRef("");
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            inputValue: "",
        },
    });
    const isValidInput = (inputVal: string): boolean => {
        const inputValLowercase = inputVal.toLowerCase();
        return (
            inputVal.length >= 3 &&
            !lists.some((x) => x.label.toLowerCase() === inputValLowercase)
        );
    };
    const _inputValue = form.watch("inputValue");
    useEffect(() => {
        inputValue.current = _inputValue;
    }, [_inputValue]);

    const getListData = async (): Promise<void> => {
        const res = await commands.getAllTaskLists();
        if (res.status === "ok") {
            setLists(res.data);
        } else {
            console.error(
                "An error occurred while attempting to read tasks lists from the database: ",
                res.error
            );
        }
    };
    useEffect(() => {
        getListData();
    }, []);
    useEventListener("request-task-lists-refresh", () => {
        getListData();
    });

    const handleCreateList = async (): Promise<void> => {
        if (isValidInput(inputValue.current)) {
            const now = new Date().valueOf().toString();
            const id = await commands.getUniqueId();
            const res = await commands.createTaskList({
                label: inputValue.current,
                ctime: now,
                desc: "",
                id,
            });
            if (res.status === "ok") {
                form.setValue("inputValue", "");
                await getListData();
            } else {
                console.error(
                    "An error occurred while creating this task list: ",
                    res.error
                );
            }
        }
    };

    return (
        <SidePanelContainer className="px-4" label="Task Lists">
            <Form {...form}>
                <TextInputGroup label="New List" form={form} name="inputValue" />
                <div className="w-full flex flex-row justify-end items-center">
                    <Button
                        disabled={!isValidInput(_inputValue)}
                        onClick={handleCreateList}
                    >
                        Create
                    </Button>
                </div>
            </Form>
            <div className="w-full flex flex-col justify-start items-start gap-4">
                {lists.map((l) => {
                    return <TaskListCard key={l.id} item={l} />;
                })}
            </div>
        </SidePanelContainer>
    );
};

TaskListPanelLeft.displayName = "TaskListPanelLeft";
