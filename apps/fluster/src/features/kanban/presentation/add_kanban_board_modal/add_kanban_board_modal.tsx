import {
    KanbanActions,
    useKanbanContext,
    useKanbanDispatch,
} from "#/kanban/state/kanban_provider";
import {
    Button,
    Form,
    showToast,
    TextAreaInput,
    TextInputGroup,
} from "@fluster.io/dev";
import ModalBackdrop from "@/components/util/modal_backdrop";
import React, { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { commands, KanbanBoardModel } from "@/lib/bindings";

const schema = z.object({
    id: z.string().nullish(),
    label: z.string(),
    desc: z.string().nullish(),
});

const AddKanbanBoardModalInner = (): ReactNode => {
    const dispatch = useKanbanDispatch();
    const { addBoardModalOpen } = useKanbanContext();
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            label: "",
            id: "",
            desc: "",
        },
    });
    useEffect(() => {
        if (addBoardModalOpen) {
            document.getElementById("add-kanban-board-input")?.focus();
        }
    }, [addBoardModalOpen]);
    const closeModal = (): void => {
        dispatch({
            type: KanbanActions.showAddBoardModal,
            payload: false,
        });
    };
    const addKanbanBoard = async () => {
        const _data = form.getValues();
        if (_data.label.length < 3) {
            return;
        }
        const data: KanbanBoardModel = {
            label: _data.label,
            id: _data.id?.length ? _data.id : await commands.getUniqueId(),
            desc: _data.desc?.length ? _data.desc : null,
        };
        const res = await commands.createNewKanbanBoard(data);
        if (res.status === "error") {
            console.error("Error: ", res.error);
            showToast({
                title: "Oh no",
                body: "An error occurred while attempting to create this board.",
                duration: 5000,
                variant: "Error",
            });
        } else {
            closeModal();
        }
    };
    const inputValue = form.watch("label");
    return (
        <ModalBackdrop onClick={closeModal}>
            <div
                className="rounded border z-50 p-4 md:p-6 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-foreground flex flex-col justify-center items-center gap-6 bg-card"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <Form {...form}>
                    <TextInputGroup
                        form={form}
                        label="Name"
                        name="label"
                        ids={{
                            input: "add-kanban-board-input",
                        }}
                        inputProps={{
                            onKeyDown: (e) => {
                                if (e.key === "Backspace" && inputValue === "") {
                                    closeModal();
                                } else if (e.key === "Enter" && inputValue.length >= 3) {
                                    addKanbanBoard();
                                }
                            },
                            style: {
                                minWidth: `${Math.min(350, window.innerWidth - 64)}px`,
                            },
                        }}
                    />
                    <TextAreaInput
                        form={form}
                        placeholder="Optional"
                        label="Description"
                        name="desc"
                    />
                </Form>
                <div className="w-full flex flex-row justify-end items-center">
                    <Button onClick={addKanbanBoard} disabled={inputValue.length < 3}>
                        Create
                    </Button>
                </div>
            </div>
        </ModalBackdrop>
    );
};

const AddKanbanBoardModal = (): ReactNode => {
    const { addBoardModalOpen: open } = useKanbanContext();
    if (open) {
        return createPortal(<AddKanbanBoardModalInner />, document.body!);
    }
    return null;
};

AddKanbanBoardModal.displayName = "AddKanbanBoardModal";

export default AddKanbanBoardModal;
