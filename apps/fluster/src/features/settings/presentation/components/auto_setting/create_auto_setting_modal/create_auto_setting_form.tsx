import { AutoSettingType, commands } from "@/lib/bindings";
import { AppState } from "@/state/initial_state";
import {
  Button,
  Form,
  GeneralSelectInput,
  Input,
  showToast,
  TextInputGroup,
} from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { z } from "zod";

const connector = connect((state: AppState) => ({
  notesDir: state.core.notesDirectory,
}));

const schema = z.object({
  glob: z.string(),
  value: z.string(),
  type: z.string(),
  id: z.string(),
});

interface CreateAutoSettingFormProps {
  notesDir: string;
  close: () => void;
}

export const CreateAutoSettingForm = connector(
  (props: CreateAutoSettingFormProps): ReactNode => {
    const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
        glob: "",
        value: "",
        type: "Tag",
        id: "",
      },
    });
    const handleSave = async (): Promise<void> => {
      if (
        form.formState.errors.id ||
        form.formState.errors.glob ||
        form.formState.errors.root ||
        form.formState.errors.type ||
        form.formState.errors.value
      ) {
        return;
      }
      const data = form.getValues();
      const id = data.id === "" ? await commands.getUniqueId() : data.id;
      const res = await commands.createAutoSetting([
        {
          value: data.value,
          setting_type: data.type as AutoSettingType,
          glob: data.glob,
          id,
        },
      ]);
      if (res.status === "ok") {
        showToast({
          title: "Auto Setting Created",
          body: "Your auto setting was created successfully",
          variant: "Info",
          duration: 3000,
        });
        form.reset();
        window.dispatchEvent(new CustomEvent("refresh-auto-setting-list", {}));
        props.close();
      } else {
        console.error("Error: ", res.error);
      }
    };
    return (
      <Form {...form}>
        <form
          className="space-y-6 mt-4"
          /* onSubmit={form.handleSubmit(handleSave)} */
        >
          <div className="grid @[400px]/auto_setting_modal:grid-cols-[auto_1fr] place-items-center gap-2">
            <div className="text-muted-foreground hidden @[400px]/auto_setting_modal:inline-block">
              {props.notesDir ?? "/"}
            </div>
            <Input
              value={form.watch("glob")}
              onChange={(e) => form.setValue("glob", e.target.value)}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              placeholder="**/*"
              className="hidden @[400px]/auto_setting_modal:inline-block"
            />
            <TextInputGroup
              classes={{
                formItem: "@[400px]/auto_setting_modal:hidden w-full",
                input: "w-full",
              }}
              form={form}
              name="glob"
              label="Glob"
            />
          </div>
          <div className="w-full grid grid-cols-1 @[400px]/auto_setting_modal:grid-cols-[150px_1fr] gap-4">
            <GeneralSelectInput
              form={form}
              name="type"
              label="Type"
              placeholder="Tag"
              classes={{
                formItem: "w-full",
                selectTrigger: "w-full",
              }}
              items={[
                {
                  label: "Tag",
                  value: "Tag" satisfies AutoSettingType,
                },
                {
                  label: "Topic",
                  value: "Topic" satisfies AutoSettingType,
                },
                {
                  label: "Subject",
                  value: "Subject" satisfies AutoSettingType,
                },
              ]}
            />
            <TextInputGroup
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              form={form}
              name="value"
              label="Value"
            />
          </div>
          <div className="w-full flex flex-row justify-end items-center mt-3">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </form>
      </Form>
    );
  }
);

CreateAutoSettingForm.displayName = "CreateAutoSettingForm";
