import { useConfirmation } from "#/confirmation_modal/state/hooks/use_confirmation";
import { AutoSettingModel, AutoSettingType, commands } from "@/lib/bindings";
import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  showToast,
} from "@fluster.io/dev";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, EllipsisVertical, MenuIcon } from "lucide-react";
import React from "react";

export interface KeymapTableData {
  /// The key in the AppState.keymap object, not the key pressed.
  settingKey: string;
  stringifiedKeymap: string;
  desc?: string;
}

export enum AutoSettingColumnId {
  id = "id",
  glob = "glob",
  value = "value",
  settingType = "settingType",
  actions = "actions",
}

export const getAutoSettingTableColumns = (): ColumnDef<AutoSettingModel>[] => {
  return [
    {
      id: AutoSettingColumnId.id,
      accessorKey: "id",
    },
    {
      id: AutoSettingColumnId.glob,
      accessorKey: "glob",
      header: "Glob",
      cell: ({ row }) => {
        const value = row.getValue(AutoSettingColumnId.glob) as string;
        return value;
      },
    },
    {
      id: AutoSettingColumnId.value,
      accessorKey: "value",
      header: "Value",
      cell: ({ row }) => {
        const value = row.getValue(AutoSettingColumnId.value) as string;
        return value;
      },
    },
    {
      accessorKey: "setting_type",
      id: AutoSettingColumnId.settingType,
      header: "Type",
      cell: ({ row }) => {
        const value = row.getValue(AutoSettingColumnId.settingType) as string;
        if (value === ("Tag" satisfies AutoSettingType)) {
          return <Badge>Tag</Badge>;
        }
        if (value === ("Topic" satisfies AutoSettingType)) {
          return (
            <Badge className="bg-green-500 text-white dark:bg-green-400 dark:text-black">
              Topic
            </Badge>
          );
        }
        if (value === ("Subject" satisfies AutoSettingType)) {
          return (
            <Badge className="bg-rose-500 dark:bg-rose-400 text-white">
              Subject
            </Badge>
          );
        }
      },
    },
    {
      id: AutoSettingColumnId.actions,
      header: "Actions",
      cell: ({ row }) => {
        const id = row.getValue(AutoSettingColumnId.id) as string;
        const handleDelete = async (): Promise<void> => {
          if (!id) {
            return showToast({
              title: "Oh no",
              body: "Something went wrong while deleting this auto setting.",
              variant: "Error",
              duration: 5000,
            });
          }
          const res = await commands.deleteAutoSettingById(id);
          if (res.status === "ok") {
            window.dispatchEvent(new CustomEvent("refresh-auto-setting-list"));
          }
        };
        /* eslint-disable-next-line  --  */
        const confirm = useConfirmation(
          {
            id: `auto-setting-${id}`,
            acceptButtonText: "Delete",
            denyButtonText: "Cancel",
            title: "Are you sure?",
            body: "This will permanently delete this auto setting.",
            confirmationVariant: "destructive",
          },
          () => {
            handleDelete().catch(() => {
              showToast({
                title: "Oh no",
                body: "Something went wrong while deleting this auto setting.",
                variant: "Error",
                duration: 5000,
              });
            });
          }
        );
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel className="text-foreground">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="text-foreground cursor-pointer"
                  onClick={() => confirm.setVisible(true)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
