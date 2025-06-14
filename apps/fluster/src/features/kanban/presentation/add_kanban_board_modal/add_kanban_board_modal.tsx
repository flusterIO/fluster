import {
  KanbanActions,
  useKanbanContext,
  useKanbanDispatch,
} from "#/kanban/state/kanban_provider";
import { Button, Form, TextInputGroup } from "@fluster.io/dev";
import ModalBackdrop from "@/components/util/modal_backdrop";
import React, { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
});

const AddKanbanBoardModalInner = (): ReactNode => {
  const dispatch = useKanbanDispatch();
  const { addBoardModalOpen } = useKanbanContext();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
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
    /* TODO: Implement this method here. Everything else is connected. Make sure to redirect after the board is created. */
    closeModal();
  };
  const inputValue = form.watch("name");
  return (
    <ModalBackdrop onClick={closeModal}>
      <div
        className="rounded border z-50 p-4 md:p-6 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-foreground flex flex-col justify-center items-center gap-6"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Form {...form}>
          <TextInputGroup
            form={form}
            label="Name"
            name="name"
            inputProps={{
              id: "add-kanban-board-input",
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
    return createPortal(
      <AddKanbanBoardModalInner />,
      document.getElementById("main-scaffold")!
    );
  }
  return null;
};

AddKanbanBoardModal.displayName = "AddKanbanBoardModal";

export default AddKanbanBoardModal;
