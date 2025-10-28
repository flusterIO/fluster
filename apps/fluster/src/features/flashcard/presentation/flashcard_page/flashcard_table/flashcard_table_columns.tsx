import { DataTableSortHeader } from "#/bibliography/presentation/bib_table/sort_header";
import { useConfirmation } from "#/confirmation_modal/state/hooks/use_confirmation";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { commands, FlashcardModel } from "@/lib/bindings";
import {
    Button,
    Checkbox,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    showErrorToast,
} from "@fluster.io/dev";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React, { ReactNode } from "react";

export const flashcardTableColumns: ColumnDef<FlashcardModel>[] = [
    {
        id: "select",
        size: 64,
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="border border-muted-foreground"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="border border-muted-foreground"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
        accessorKey: "label",
        header: ({ column }) => (
            <DataTableSortHeader title="Label" column={column} />
        ),
        cell: ({ row }) => (
            <div
                onClick={() => {
                    window.dispatchEvent(
                        new CustomEvent("show-flashcard-detail", {
                            detail: {
                                flashcard_id: row.getValue("id"),
                            },
                        })
                    );
                }}
                className="cursor-pointer"
            >
                <InlineMdxContent abortIfNoMath mdx={row.getValue("label")} />
            </div>
        ),
    },
    {
        accessorFn: (flashcard) => {
            const n = Math.round(
                (flashcard.correct_count /
                    (flashcard.correct_count + flashcard.incorrect_count)) *
                100
            );
            if (Number.isNaN(n)) {
                return 0;
            } else {
                return n;
            }
        },
        id: "accuracy",
        size: 180,
        header: ({ column }) => (
            <DataTableSortHeader title="Accuracy" column={column} />
        ),
        cell: ({ row }) => (
            <div
                onClick={() => {
                    window.dispatchEvent(
                        new CustomEvent("show-flashcard-detail", {
                            detail: {
                                flashcard_id: row.getValue("id"),
                            },
                        })
                    );
                }}
                className="cursor-pointer"
            >
                {`${row.getValue("accuracy")}%`}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        maxSize: 100,
        size: 100,
        header: "Actions",
        cell: ({ row }): ReactNode => {
            const confirmationId = `flashcard-${row.getValue("id")}`;
            const handleDelete = async (): Promise<void> => {
                const res = await commands.deleteFlashcardById(row.getValue("id"));
                if (res.status === "error") {
                    showErrorToast(
                        "Fluster failed to delete this flashcard. If this continues, please file an issue on Github."
                    );
                }
            };
            /* eslint-disable-next-line  -- This *is* a react component. */
            const confirm = useConfirmation(
                {
                    id: confirmationId,
                    acceptButtonText: "Delete",
                    denyButtonText: "Cancel",
                    title: "Are you sure?",
                    body: "This will permanently delete this chat.",
                    confirmationVariant: "destructive",
                },
                () => {
                    handleDelete()
                        .then(() => {
                            window.dispatchEvent(
                                new CustomEvent("request-update-flashcard-table")
                            );
                        })
                        .catch(() => {
                            showErrorToast(
                                "Fluster could not delete this flashcard. If this continues, please file an issue on Github."
                            );
                        });
                }
            );
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => confirm.setVisible(true)}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
