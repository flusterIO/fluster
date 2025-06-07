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
import { useMatch, useNavigate, useSearchParams } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import { Button } from "@fluster.io/dev";
import { commands, SnippetModel } from "@/lib/bindings";
import { snippetSchema } from "#/snippets/data/snippet_schema";
import { useSnippetContext } from "#/snippets/state/snippet_context";
import { reloadSnippetList } from "#/snippets/data/events/reload_snippet_list";

const connector = connect((state: AppState) => ({
    panelOpen: state.panelLeft.open,
    defaultLanguage: state.code.defaultLanguage,
}));

const AddSnippetPanel = connector(
    ({
        panelOpen,
        defaultLanguage,
    }: {
        panelOpen: boolean;
        defaultLanguage: AppState["code"]["defaultLanguage"];
    }): ReactNode => {
        const now = new Date().valueOf().toString();
        const form = useForm({
            resolver: zodResolver(snippetSchema),
            defaultValues: {
                label: "",
                lang: defaultLanguage,
                body: "",
                desc: "",
                tags: [],
                ctime: now,
                utime: now,
                id: null,
            },
        });
        form.watch((data) => {
            window.dispatchEvent(
                new CustomEvent("set-snippet-preview", {
                    detail: {
                        data,
                    },
                })
            );
        });
        const state = useSnippetContext();
        const isSnippetsPage = useMatch(AppRoutes.snippets);
        const [editingIdState, setEditingIdState] = useState<string | null>(null);
        const [searchParams] = useSearchParams();

        useEffect(() => {
            const editingId = searchParams.get("editing");
            if (!editingId) {
                return;
            }
            const getSnippetBeingEdited = async (id: string): Promise<void> => {
                const res = await commands.getSnippetById(id);
                if (res.status === "ok") {
                    const snippetItem = res.data[0];
                    const tags = res.data[1];
                    form.setValue("label", snippetItem.label);
                    form.setValue("id", snippetItem.id);
                    form.setValue("lang", snippetItem.lang);
                    form.setValue("body", snippetItem.body);
                    form.setValue("desc", snippetItem.desc ?? "");
                    form.setValue("utime", snippetItem.utime ?? now);
                    form.setValue("ctime", snippetItem.ctime ?? now);
                    form.setValue(
                        "tags",
                        tags.map((t) => t.value)
                    );
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
            /* eslint-disable-next-line  --  */
        }, [searchParams, isSnippetsPage, form, editingIdState]);

        useEffect(() => {
            if (isSnippetsPage && panelOpen) {
                document.getElementById("snippet-name-input")?.focus();
            }
        }, [panelOpen, isSnippetsPage]);

        const handleSubmit = async (
            data: z.infer<typeof snippetSchema>
        ): Promise<void> => {
            const snippetModel: SnippetModel = {
                id: null,
                label: data.label,
                body: data.body,
                desc: data.desc,
                lang: data.lang,
                ctime: data.ctime,
                utime: data.utime,
            };
            const res = await commands.saveSnippets([snippetModel], [data.tags]);
            console.log("res: ", res);
            if (res.status === "ok") {
                form.reset();
                reloadSnippetList(state.languageFilter);
            } else {
                console.error(
                    "The server returned an error while attempting to save this snippet: ",
                    res.error
                );
            }
        };

        const nav = useNavigate();

        const exitEditingMode = () => {
            setEditingIdState(null);
            searchParams.delete("editing");
            const sp = searchParams.toString();
            nav(`${AppRoutes.snippets}?${sp}`);
            form.reset();
            /* requestSnippetListRefresh(); */
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
                                            <div className="w-full max-w-[600px]">
                                                <Input
                                                    id={"snippet-name-input"}
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        form.setValue("label", e.target.value)
                                                    }
                                                />
                                                <FormMessage />
                                            </div>
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
                                            <div className="w-full max-w-[600px]">
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
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name={"desc"}
                            render={({ field }) => {
                                return (
                                    <FormItem className="w-full max-w-[600px]">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <div className="w-full max-w-[600px]">
                                                <Textarea
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        form.setValue(field.name, e.target.value)
                                                    }
                                                    rows={2}
                                                />
                                                <FormMessage />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                );
                            }}
                        />
                        <TagInput
                            label="Tags"
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
                                            <div className="w-full max-w-[600px]">
                                                <Textarea
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        form.setValue(field.name, e.target.value)
                                                    }
                                                    rows={8}
                                                />
                                                <FormMessage />
                                            </div>
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    const is_valid = Object.values(form.formState.errors).every(
                                        (x) => x
                                    );
                                    if (is_valid) {
                                        const data = form.getValues();
                                        handleSubmit(data);
                                    } else {
                                        console.error(
                                            "An error occurred while attempting to gather the data to be sent to the server. This is client side error."
                                        );
                                    }
                                }}
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
