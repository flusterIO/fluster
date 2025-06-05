import React, { type ReactNode } from "react";
import { FormInputProps } from "../types";
import { FieldValues, PathValue } from "react-hook-form";
import { Input } from "../../shad/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../shad/form";
import { cn } from "../../../utils/cn";
import { File } from "lucide-react";
import { Button } from "../../shad/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../shad/tooltip";

interface FilePathInputProps<T extends FieldValues> extends FormInputProps<T> {
  classes?: {
    formItem?: string;
    container?: string;
    input?: string;
  };
  dialogTitle?: string;
  /// True if the file dialog should prefer a directory instead of a file.
  directory?: boolean;
  defaultPath?: string;
  /// Allow the user to select multiple entries.
  multiple?: boolean;
}

export const FilePathInput = <T extends FieldValues>({
  name,
  form,
  label,
  desc,
  directory = false,
  defaultPath = undefined,
  dialogTitle,
  multiple = false,
  classes = {},
}: FilePathInputProps<T>): ReactNode => {
  const openDialog = async (): Promise<void> => {
    /* WITH_WIFI: Look up the docs for typing this `withGlobalTauri` option. */
    /* @ts-expect-error -- Need to type this properly, but It's not worht the extra tme it would take while offline. */
    const { open } = window.__TAURI__.dialog;
    const res = await open({
      multiple,
      directory,
      defaultPath,
      title: dialogTitle,
    });
    form.setValue(name, res as PathValue<T, typeof name>);
  };
  const value = form.watch(name);
  return (
    <FormField
      name={name}
      control={form.control}
      render={() => {
        return (
          <FormItem className={cn("w-full max-w-[600px]", classes.formItem)}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className={cn("w-full max-w-[600px]", classes.container)}>
                <div className="w-full flex flex-row justify-center items-center gap-2">
                  <Input
                    id={"equation-name-input"}
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) =>
                      form.setValue(
                        name,
                        e.target.value as Parameters<typeof form.setValue>[1]
                      )
                    }
                    className={cn("flex-grow", classes.input)}
                  />
                  <Button
                    onClick={() => {
                      openDialog();
                    }}
                    size={"icon"}
                  >
                    <Tooltip>
                      <TooltipContent>
                        Use a file picker to select a file.
                      </TooltipContent>
                      <TooltipTrigger asChild>
                        <File />
                      </TooltipTrigger>
                    </Tooltip>
                  </Button>
                </div>
                {desc?.length ? (
                  <FormDescription className="mt-2">{desc}</FormDescription>
                ) : null}
                <FormMessage />
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

FilePathInput.displayName = "FilePathInput";
