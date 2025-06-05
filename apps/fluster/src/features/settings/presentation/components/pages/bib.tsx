import { Form } from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { z } from "zod";
import { setBibPath } from "#/bibliography/state/slice";
import { FilePathInput } from "@fluster.io/dev";

const connector = connect((state: AppState) => ({
  state: state.bib,
}));

const schema = z.object({
  bib_path: z.string().nullable(),
  csl_path: z.string().nullable(),
});

export const BibliographySettingsPage = connector(
  ({ state }: { state: AppState["bib"] }): ReactNode => {
    const dispatch = useDispatch();
    const form = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        bib_path: state?.bib_path ?? null,
      },
    });

    form.watch((state) => {
      if (state.bib_path) {
        dispatch(setBibPath(state.bib_path));
      }
    });
    /* FIX: Create the language and theme select inputs and implement them here. */
    return (
      <Form {...form}>
        <form className="space-y-6">
          <FilePathInput
            form={form}
            name="bib_path"
            label="Bibliography File Path"
            desc="The path relative to your note's root directory that points to a .bib file."
          />
          <FilePathInput
            form={form}
            name="csl_path"
            label="CSL File Path"
            desc="The path relative to your note's root directory that points to a .csl file to be used for citation formatting."
          />
        </form>
      </Form>
    );
  }
);

BibliographySettingsPage.displayName = "BibliographySettings";
