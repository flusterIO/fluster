import {
  AppRoutes,
  Button,
  FilePathInput,
  Form,
  Hint,
  showToast,
  SwitchInput,
} from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { SettingPageTitle } from "../components/setting_page_title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { connect, useDispatch } from "react-redux";
import { AppState } from "@/state/initial_state";
import { setNotesDirectory, setRespectGitIgnore } from "#/settings/state/slice";
import { SettingPageContainer } from "../components/setting_page_container";
import { KeymapSettingsGroup } from "#/keymap/presentation/keymap_settings_table";
import { commands } from "@/lib/bindings";
import { useNavigate } from "react-router";
import { useConfirmation } from "#/confirmation_modal/state/hooks/use_confirmation";

const connector = connect((state: AppState) => ({
  state: state.core,
}));

const schema = z.object({
  notesDirectory: z.string(),
  useGitIgnore: z.boolean(),
});

export const GeneralSettingsPage = connector(
  ({ state }: { state: AppState["core"] }): ReactNode => {
    const confirmationId = "clear-database";
    const dispatch = useDispatch();
    const nav = useNavigate();
    const form = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        notesDirectory: state?.notesDirectory ?? "",
        useGitIgnore: state?.useGitIgnore ?? false,
      },
    });

    form.watch((formData) => {
      if (formData.notesDirectory) {
        dispatch(setNotesDirectory(formData.notesDirectory));
      }
      if (typeof formData.useGitIgnore === "boolean") {
        dispatch(setRespectGitIgnore(formData.useGitIgnore));
      }
    });

    const showFailToClearNotification = (): void => {
      showToast({
        title: "Failed",
        body: "Something went wrong while attempting to clear your database.",
        duration: 5000,
        variant: "Error",
      });
    };

    const handleClearDatabase = async (): Promise<void> => {
      const res = await commands.wipeDatabase();
      if (res.status === "ok") {
        showToast({
          title: "Success",
          variant: "Info",
          body: "Your database has been wiped successfully.",
          duration: 5000,
        });
        nav(AppRoutes.onboarding);
      } else {
        showFailToClearNotification();
      }
    };

    const confirm = useConfirmation(
      {
        id: confirmationId,
        acceptButtonText: "Delete",
        denyButtonText: "Cancel",
        title: "Are you sure?",
        body: "This will permanently clear your database. Data that can not be automatically generated from your file system will be lost.",
        confirmationVariant: "destructive",
      },
      () => {
        handleClearDatabase().catch((err) => {
          console.error("Error: ", err);
          showFailToClearNotification();
        });
      }
    );

    return (
      <Form {...form}>
        <SettingPageContainer>
          <SettingPageTitle title="General Settings" />
          <FilePathInput
            label="Notes Directory"
            form={form}
            name="notesDirectory"
            directory
            desc="This is the primary directory that contains all of your notes. You can nest content in this directory as deeply as you wish."
            classes={{
              formItem: "w-full max-w-full",
              container: "w-full max-w-full",
            }}
          />
          <SwitchInput
            form={form}
            name={"useGitIgnore"}
            label="Respect .gitignore"
            desc="If true, files ignored by a .gitignore file within your notes will be ignored by Fluster as well. Be aware that some notes may be visible under file glob based search even when ignored."
          />
          <SettingPageTitle
            title="Keymap"
            subtitle="Customizing keymaps is in beta. This feature may be unreliable."
          />
          <Hint note>
            Keep in mind that many of these keymaps are applied conditionally.
            Not all pages have both a left and a right panel, for example.
          </Hint>
          <KeymapSettingsGroup />
          <div className="bg-card rounded border px-4 py-3">
            <SettingPageTitle
              title="Danger"
              subtitle="These actions are destructive and cannot be undone."
            />
            <Button
              variant={"destructive"}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                confirm.setVisible(true);
              }}
            >
              Clear Database
            </Button>
          </div>
        </SettingPageContainer>
      </Form>
    );
  }
);

GeneralSettingsPage.displayName = "GeneralSettingsPage";
