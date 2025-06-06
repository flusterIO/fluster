import SidePanelContainer from "@/components/side_panel_container";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    TagInput,
} from "@fluster.io/dev";
import { Input } from "@fluster.io/dev";
import React, { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SyntaxSupportedLanguageSelect from "../inputs/syntax_supported_language_select";
import { AppState } from "@/state/initial_state";
import { Textarea } from "@fluster.io/dev";
import { connect } from "react-redux";
import { useMatch, useSearchParams } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import { Button } from "@fluster.io/dev";
import { commands, SnippetItem } from "@/lib/bindings";

const snippetSchema = z.object({
    lang: z.string(),
    label: z.string(),
    body: z.string(),
    desc: z.string(),
    tags: z.string().array(),
    id: z.number().int().nullable(),
});

const connector = connect((state: AppState) => ({
    panelOpen: state.panelLeft.open,
}));

const AddSnippetPanel = connector(
    ({ panelOpen }: { panelOpen: boolean }): ReactNode => {
        const form = useForm({
            resolver: zodResolver(snippetSchema),
            defaultValues: {
                label: "",
                lang: "python",
                body: "",
                desc: "",
                tags: [],
                id: null,
            },
        });
        const isSnippetsPage = useMatch(AppRoutes.snippets);
        const [editingIdState, setEditingIdState] = useState<number | null>(null);
        const [searchParams] = useSearchParams();

        useEffect(() => {
            const editingIdString = searchParams.get("editing");
            if (!editingIdString) {
                return;
            }
            const editingId = parseInt(editingIdString);
            if (editingIdState === editingId || `${editingId}` !== editingIdString) {
                return;
            }
            const getSnippetBeingEdited = async (id: number): Promise<void> => {
                const res = await commands.getSnippetById(id);
                console.log("res: ", res);
                if (res.status === "ok") {
                    const snippetItem = res.data[0];
                    const tags = res.data[1];
                    form.setValue("label", snippetItem.label);
                    form.setValue("id", snippetItem.id);
                    form.setValue("lang", snippetItem.lang);
                    form.setValue("body", snippetItem.body);
                    form.setValue("desc", snippetItem.desc);
                    form.setValue(
                        "tags",
                        tags.map((t) => t.value)
                    );
                    /* form.setValue("tags", res.data.tags); */
                }
            };

            if (isSnippetsPage && editingId) {
                setEditingIdState(editingId);
                getSnippetBeingEdited(editingId).catch(() => {
                    console.error(
                        "Fluster attempted to find a snippet that you intended to edit and was unsuccessful."
                    );
                });
            }
        }, [searchParams, isSnippetsPage, form, editingIdState]);

        useEffect(() => {
            if (isSnippetsPage && panelOpen) {
                document.getElementById("snippet-name-input")?.focus();
            }
        }, [panelOpen, isSnippetsPage]);

        const handleSubmit = async (
            data: z.infer<typeof snippetSchema>
        ): Promise<void> => {
            const snippetItem: SnippetItem = {
                id: null,
                label: data.label,
                body: data.body,
                desc: data.desc,
                lang: data.lang,
            };
            const res = await commands.saveSnippet(snippetItem, data.tags);
            console.log("res: ", res);
            if (res.status === "ok") {
                form.reset();
                window.dispatchEvent(new CustomEvent("reload-snippet-list", {}));
            }
        };

        const exitEditingMode = () => {
            setEditingIdState(null);
            searchParams.delete("editing");
            form.reset();
        };

        return (
            <SidePanelContainer label="Add a snippet">
                <Form {...form}>
                    <form
                        className="w-full max-w-[600px] flex flex-col justify-start items-center gap-6"
                        onSubmit={form.handleSubmit(async (_data) => handleSubmit(_data))}
                    >
                        <FormField
                            control={form.control}
                            name={"label"}
                            render={({ field }) => {
                                return (
                                    <FormItem className="w-full max-w-[600px]">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <>
                                                <Input
                                                    id={"snippet-name-input"}
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        form.setValue("label", e.target.value)
                                                    }
                                                />
                                                <FormMessage />
                                            </>
                                        </FormControl>
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name={"lang"}
                            render={({ field }) => {
                                return (
                                    <FormItem className="w-full max-w-[600px]">
                                        <FormLabel>Language</FormLabel>
                                        <FormControl>
                                            <>
                                                <FormMessage />
                                                <SyntaxSupportedLanguageSelect
                                                    value={field.value}
                                                    onChange={(newVal) =>
                                                        form.setValue(field.name, newVal)
                                                    }
                                                    classes={{
                                                        button: "w-full max-w-[600px]",
                                                        popover: "w-full",
                                                        popoverContainer: "w-full max-w-[600px]",
                                                    }}
                                                />
                                            </>
                                        </FormControl>
                                    </FormItem>
                                );
                            }}
                        />
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
                                        form.watch("lang")?.length > 0 &&
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

AddSnippetPanel.displayName = "AddSnippetPanel";

export default AddSnippetPanel;
