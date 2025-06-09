import { Button, Form } from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { z } from "zod";
import { setBibPath, setCslPath } from "#/bibliography/state/slice";
import { FilePathInput } from "@fluster.io/dev";
import { SettingPageTitle } from "../components/setting_page_title";
import { saveSettingState } from "@/state/state_storage";
import { SettingPageContainer } from "../components/setting_page_container";

const connector = connect((state: AppState) => ({
    state: state.bib,
}));

const schema = z.object({
    bibPath: z.string().nullable(),
    cslPath: z.string().nullable(),
});

export const BibliographySettingsPage = connector(
    ({ state }: { state: AppState["bib"] }): ReactNode => {
        const dispatch = useDispatch();
        const form = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
                bibPath: state?.bibPath ?? "",
                cslPath: state?.cslPath ?? "",
            },
        });

        form.watch((formData) => {
            if (formData.bibPath?.length) {
                dispatch(setBibPath(formData.bibPath));
            }
            if (formData.cslPath?.length) {
                dispatch(setCslPath(formData.cslPath));
            }
        });

        return (
            <Form {...form}>
                <SettingPageContainer>
                    <SettingPageTitle title="Bibliography Settings" />
                    <FilePathInput
                        form={form}
                        name="bibPath"
                        label="Bibliography File Path"
                        desc="The path relative to your note's root directory that points to a .bib file."
                    />
                    <FilePathInput
                        form={form}
                        name="cslPath"
                        label="CSL File Path"
                        desc="The path relative to your note's root directory that points to a .csl file to be used for citation formatting."
                    />
                    <div>
                        <Button onClick={saveSettingState}>Save</Button>
                    </div>
                </SettingPageContainer>
            </Form>
        );
    }
);

BibliographySettingsPage.displayName = "BibliographySettings";
