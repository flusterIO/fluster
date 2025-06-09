import { zodResolver } from "@hookform/resolvers/zod";
import React, { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { connect, useDispatch } from "react-redux";
import { AppState } from "@/state/initial_state";
import {
  Form,
  GeneralSelectInput,
  SelectOption,
  SyntaxSupportedLanguageSelect,
} from "@fluster.io/dev";
import { setDefaultLanguage, setEditorKeymap } from "#/editor/state/slice";
import { BundledLanguage } from "shiki";
import { SettingPageTitle } from "../components/setting_page_title";
import { SettingPageContainer } from "../components/setting_page_container";

const connector = connect((state: AppState) => ({
  state: state.code,
}));

interface Props {
  state: AppState["code"];
}

const schema = z.object({
  defaultLanguage: z.string(),
  keymap: z.literal("vim").or(z.literal("standard")),
});

const keymapOptions: SelectOption<AppState["code"]["keymap"]>[] = [
  {
    label: "Standard",
    value: "standard",
  },
  {
    label: "Vim",
    value: "vim",
  },
];

export const CodeSettingsPage = connector(({ state }: Props): ReactNode => {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      defaultLanguage: state.defaultLanguage,
      keymap: state.keymap,
    },
  });

  form.watch((formState) => {
    if (formState.defaultLanguage) {
      dispatch(
        setDefaultLanguage(formState.defaultLanguage as BundledLanguage)
      );
    }
    if (formState.keymap) {
      console.log("setting keymap: ");
      dispatch(setEditorKeymap(formState.keymap));
    }
  });

  /* FIX: Create the language and theme select inputs and implement them here. */
  return (
    <Form {...form}>
      <SettingPageContainer>
        <SettingPageTitle title="Code Settings" />
        <SyntaxSupportedLanguageSelect
          form={form}
          name="defaultLanguage"
          label="Default Language"
          classes={{
            button: "w-full",
          }}
        />
        <GeneralSelectInput
          placeholder="Keymap"
          label="Keymap"
          form={form}
          name="keymap"
          items={keymapOptions}
          classes={{
            selectTrigger: "w-full",
          }}
        />
      </SettingPageContainer>
    </Form>
  );
});

CodeSettingsPage.displayName = "CodeSettingsPage";
