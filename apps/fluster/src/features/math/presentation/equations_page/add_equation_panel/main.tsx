import SidePanelContainer from "@/components/side_panel_container";
import React, { useEffect, useState, type ReactNode } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TagInput,
} from "@fluster.io/dev";
import { Textarea } from "@fluster.io/dev";
import { Button } from "@fluster.io/dev";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMatch, useSearchParams } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";

const addEquationSchema = z.object({
  id: z.number().int().nullable(),
  label: z
    .string()
    .min(2, "Your label needs to be at least 2 characters long."),
  tags: z.string().array(),
  desc: z.string(),
  body: z.string().min(3, "Please add a body to this equation."),
  snippet_ids: z.number().int().array().default([]),
});

export const AddEquationPanel = (): ReactNode => {
  const [editingIdState, setEditingIdState] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const isEquationsPage = useMatch(AppRoutes.equations);

  const exitEditingMode = () => {
    setEditingIdState(null);
    searchParams.delete("editing");
    form.reset();
  };
  const form = useForm({
    resolver: zodResolver(addEquationSchema),
    defaultValues: {
      label: "",
      body: "",
      desc: "",
      tags: [],
      id: null,
    },
  });

  const getEquationBeingEdited = async (id: number): Promise<void> => {
    console.log("id: ", id);
    /* TODO: Handle this once the snippets page is done. */
  };
  useEffect(() => {
    const editingIdString = searchParams.get("editing");
    if (!editingIdString) {
      return;
    }
    const editingId = parseInt(editingIdString);
    if (editingIdState === editingId || `${editingId}` !== editingIdString) {
      return;
    }
    if (isEquationsPage && editingId) {
      setEditingIdState(editingId);
      getEquationBeingEdited(editingId).catch(() => {
        console.error(
          "Fluster attempted to find a snippet that you intended to edit and was unsuccessful."
        );
      });
    }
  }, [searchParams, editingIdState, isEquationsPage]);
  const handleSubmit = (data: z.infer<typeof addEquationSchema>): void => {
    console.log("data: ", data);
    /* TODO: not implemented */
  };
  return (
    <SidePanelContainer label="Add an equation">
      <Form {...form}>
        <form
          className="w-full max-w-[600px] flex flex-col justify-start items-center gap-6"
          onSubmit={form.handleSubmit(async (_data) => handleSubmit(_data))}
        >
          <TagInput
            form={form}
            name="tags"
            classes={{
              formItem: "w-full max-w-[600px]",
            }}
            desc="Click on a tag to remove it."
          />
          <FormField
            control={form.control}
            name={"body"}
            render={({ field }) => {
              return (
                <FormItem className="w-full max-w-[600px]">
                  <FormLabel>Snippet Content</FormLabel>
                  <FormControl>
                    <>
                      <FormMessage />
                      <Textarea
                        value={field.value}
                        onChange={(e) =>
                          form.setValue(field.name, e.target.value)
                        }
                        rows={8}
                      />
                    </>
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <div className="w-full flex flex-row justify-end items-center gap-6">
            {editingIdState && (
              <Button variant={"destructive"} onClick={exitEditingMode}>
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={
                !(
                  form.watch("body")?.length > 0 &&
                  form.watch("label")?.length > 0
                )
              }
            >
              {editingIdState ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </SidePanelContainer>
  );
};

AddEquationPanel.displayName = "AddEquationPanel";
