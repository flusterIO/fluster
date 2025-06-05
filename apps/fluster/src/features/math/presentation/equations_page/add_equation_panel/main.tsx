import SidePanelContainer from "@/components/side_panel_container";
import React, { useEffect, useState, type ReactNode } from "react";
import {
    Form,
    MathTextInput,
    TextAreaInput,
    TextInputGroup,
} from "@fluster.io/dev";
import { Button } from "@fluster.io/dev";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMatch, useNavigate, useSearchParams } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import { commands, EquationModel } from "@/lib/bindings";
import { requestEquationListRefresh } from "../../equations_list/equation_list_utils";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";

const connector = connect((state: AppState) => ({
    panelOpen: state.panelLeft.open,
}));

const addEquationSchema = z.object({
    id: z.string().nullable(),
    user_provided_id: z.string(),
    label: z
        .string()
        .min(2, "Your label needs to be at least 2 characters long."),
    tags: z.string().array(),
    desc: z.string(),
    body: z.string().min(3, "Please add a body to this equation."),
    snippet_ids: z.number().int().array().default([]),
});

export const AddEquationPanel = connector(
    ({ panelOpen }: { panelOpen: boolean }): ReactNode => {
        const [editingIdState, setEditingIdState] = useState<string | null>(null);
        const [searchParams] = useSearchParams();
        const isEquationsPage = useMatch(AppRoutes.equations);
        const nav = useNavigate();

        const exitEditingMode = () => {
            setEditingIdState(null);
            searchParams.delete("editing");
            nav(`${AppRoutes.equations}?${searchParams.toString()}`);
            form.reset();
        };
        const form = useForm({
            resolver: zodResolver(addEquationSchema),
            defaultValues: {
                id: null,
                user_provided_id: "",
                label: "",
                body: "",
                desc: "",
                tags: [],
                snippet_ids: [],
            },
        });

        const getEquationBeingEdited = async (id: string): Promise<void> => {
            console.log("id: ", id);
            /* FIXME: Return the related tags and snippet_ids in the `get_equation_by_id` method and populate the form properly here. Make sure they are being saved as well. */
            const data = await commands.getEquationById(id);
            if (data.status === "ok") {
                form.setValue("id", data.data.id);
                form.setValue("user_provided_id", data.data.equation_id ?? "");
                form.setValue("label", data.data.label);
                form.setValue("body", data.data.body);
                form.setValue("desc", data.data.desc);
                /* form.setValue("tags", data.data.) */
                /* form.setValue("snippet_ids", data.data.) */
            }
            /* TODO: Handle this once the snippets page is done. */
        };
        useEffect(() => {
            const editingId = searchParams.get("editing");
            if (!editingId) {
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
            /* eslint-disable-next-line  --  */
        }, [searchParams, editingIdState, isEquationsPage]);
        const handleSubmit = async (
            data: z.infer<typeof addEquationSchema>
        ): Promise<void> => {
            const now = new Date().valueOf().toString();
            let _unique_id = "";
            if (data.id === null) {
                _unique_id = await commands.getUniqueId();
            }
            const model: EquationModel = {
                id: data.id ?? _unique_id,
                label: data.label,
                desc: data.desc,
                body: data.body,
                ctime: now,
                utime: now,
                equation_id: data.user_provided_id,
            };
            const res = await commands.saveEquations([model]);
            if (res.status === "ok") {
                form.reset();
                requestEquationListRefresh();
            } else {
                console.error("Add equation response: ", res);
            }
            /* TODO: not implemented */
        };

        useEffect(() => {
            if (isEquationsPage && panelOpen) {
                document.getElementById("equation-name-input")?.focus();
            }
        }, [panelOpen, isEquationsPage]);

        return (
            <SidePanelContainer label="Add an equation">
                <Form {...form}>
                    <form
                        className="w-full max-w-[600px] flex flex-col justify-start items-center gap-6"
                        onSubmit={form.handleSubmit(async (_data) => handleSubmit(_data))}
                    >
                        <TextInputGroup
                            name="label"
                            form={form}
                            label="Name"
                            desc="This can include mdx, but all math must be wrapped with the '$' notation."
                        />
                        <TextInputGroup
                            name="user_provided_id"
                            label="Id"
                            form={form}
                            desc="Use this id field to easily reference this equation in your notes. This cannot include spaces or special characters."
                        />
                        <TextAreaInput
                            name="desc"
                            label="Description"
                            form={form}
                            rows={2}
                        />
                        <MathTextInput
                            classes={{
                                formItem: "w-full max-w-[600px]",
                            }}
                            label="Equation"
                            form={form}
                            name="body"
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
    }
);

AddEquationPanel.displayName = "AddEquationPanel";
