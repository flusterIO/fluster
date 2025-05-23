import React from "react";
import SidePanelContainer from "@/components/side_panel_container";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/shad/form";
import { Input } from "@/components/ui/shad/input";
import { useEffect, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SyntaxSupportedLanguageSelect from "../inputs/syntax_supported_language_select";
import { AppState } from "@/state/initial_state";
import { Textarea } from "@/components/ui/shad/textarea";
import { connect } from "react-redux";
import { useMatch } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import { Button } from "@/components/ui/shad/button";

const snippetSchema = z.object({
    language: z.string(),
    label: z.string(),
    body: z.string(),
});

const connector = connect((state: AppState, props: any) => ({
    panelOpen: state.panelLeft.open,
    props: props,
}));

const AddSnippetPanel = connector(
    ({ panelOpen }: { panelOpen: boolean }): ReactNode => {
        const form = useForm({
            resolver: zodResolver(snippetSchema),
        });
        const isSnippetsPage = useMatch(AppRoutes.snippets);
        useEffect(() => {
            if (isSnippetsPage && panelOpen) {
                document.getElementById("snippet-name-input")?.focus();
            }
        }, [panelOpen]);

        const handleSubmit = async (
            data: z.infer<typeof snippetSchema>,
        ): Promise<void> => {
            console.log("data: ", data);
        };

        return (
            <SidePanelContainer label="Add a snippet">
                <Form {...form}>
                    <form
                        className="w-full max-w-[600px] flex flex-col justify-start items-center gap-6"
                        onSubmit={form.handleSubmit(handleSubmit)}
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
                            name={"language"}
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
                                                    }}
                                                />
                                            </>
                                        </FormControl>
                                    </FormItem>
                                );
                            }}
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
                        <div className="w-full flex flex-row justify-end items-center">
                            <Button
                                type="submit"
                                disabled={
                                    form.watch("language")?.length > 0 &&
                                    form.watch("body")?.length > 0 &&
                                    form.watch("label")?.length > 0
                                }
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </Form>
            </SidePanelContainer>
        );
    },
);

AddSnippetPanel.displayName = "AddSnippetPanel";

export default AddSnippetPanel;
