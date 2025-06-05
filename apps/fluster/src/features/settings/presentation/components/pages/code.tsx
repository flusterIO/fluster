import { zodResolver } from "@hookform/resolvers/zod";
import React, { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { connect, useDispatch } from "react-redux";
import { AppState } from "@/state/initial_state";
import { Form, SyntaxSupportedLanguageSelect } from "@fluster.io/dev";
import { setDefaultLanguage } from "#/editor/state/slice";
import { BundledLanguage } from "shiki";

const connector = connect((state: AppState) => ({
  state: state.code,
}));

interface Props {
  state: AppState["code"];
}

const schema = z.object({
  defaultLanguage: z.string(),
});

const CodeSettingsPage = connector(({ state }: Props): ReactNode => {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      defaultLanguage: state.defaultLanguage,
    },
  });

  form.watch((state) => {
    if (state.defaultLanguage) {
      dispatch(setDefaultLanguage(state.defaultLanguage as BundledLanguage));
    }
  });
  /* FIX: Create the language and theme select inputs and implement them here. */
  return (
    <Form {...form}>
      <SyntaxSupportedLanguageSelect
        form={form}
        name="defaultLanguage"
        label="Default Language"
        classes={{
          button: "w-[min(300px,80%)]",
        }}
      />
    </Form>
  );
});

CodeSettingsPage.displayName = "CodeSettingsPage";

export default CodeSettingsPage;
