import { capitalize } from "@/lib/string_utils";
import {
    Button,
    Checkbox,
    Form,
    Popover,
    PopoverContentNoPortal,
    PopoverTrigger,
    TextInputGroup,
    TooltipContent,
    TooltipTrigger,
    Tooltip
} from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import React, { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TABLE_EMPTY_STRING_KEY } from "./dynamic_data_table_constants";
import { useSearchParams } from "react-router";
import { secondaryToolTip } from "../../../../../styles/classes";

interface DynamicDatatableFilterRowProps {
    columnVisibility: Record<string, boolean>;
    setColumnVisibility: (newVisibility: Record<string, boolean>) => void;
    setGlobalFilter: (query: string) => void;
}

const formSchema = z.object({
    query: z.string(),
    hasHeader: z.boolean()
});

export const DynamicDatatableFilterRow = (
    props: DynamicDatatableFilterRowProps
): ReactNode => {
    const [sp, setSp] = useSearchParams();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
            hasHeader: false
        },
    });
    const currentHasHeader = sp.get("hasHeader") === "true";
    form.watch((formData) => {
        if (typeof formData.query === "string") {
            props.setGlobalFilter(formData.query);
        }
        if (typeof formData.hasHeader === "boolean" && formData.hasHeader !== currentHasHeader) {
            sp.set("hasHeader", currentHasHeader ? "false" : "true")
            setSp(sp)
        }
    });
    return (
        <Form {...form}>
            <div className="flex flex-col @[600px]/dynamic_table:flex-row @[600px]/dynamic_table:justify-between justify-center @[600px]/dynamic_table:items-end items-start w-full mb-6">
                <div className="flex-grow">
                    <TextInputGroup
                        classes={{
                            input: "bg-input w-[min(100%,350px)]",
                        }}
                        form={form}
                        label="Search"
                        name="query"
                    />
                </div>
                <div className="flex flex-row justify-end items-center gap-6 @[600px]/dynamic_table:mt-0 mt-4">
                    <Tooltip>
                        <TooltipContent
                            className={secondaryToolTip}
                        >
                            Set to true if file includes a header.
                        </TooltipContent>
                        <TooltipTrigger asChild>
                            <Button
                                variant={currentHasHeader ? undefined : "outline"}
                                onClick={() => form.setValue("hasHeader", !currentHasHeader)}
                            >
                                Has Header
                            </Button>
                        </TooltipTrigger>
                    </Tooltip>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                Columns
                                <ChevronDown />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContentNoPortal className="w-fit border-border space-y-2">
                            {Object.entries(props.columnVisibility ?? {}).map((k) => {
                                return (
                                    <div
                                        className="grid grid-cols-[auto_1fr] gap-2"
                                        key={`col-${k[0]}`}
                                    >
                                        <Checkbox
                                            className="place-self-center"
                                            checked={k[1]}
                                            onClick={() => {
                                                props.setColumnVisibility({
                                                    ...props.columnVisibility,
                                                    [k[0] === "" ? TABLE_EMPTY_STRING_KEY : k[0]]: !k[1],
                                                });
                                            }}
                                        />
                                        <div className="text-foreground">{capitalize(k[0])}</div>
                                    </div>
                                );
                            })}
                        </PopoverContentNoPortal>
                    </Popover>
                </div>
            </div>
        </Form>
    );
};

DynamicDatatableFilterRow.displayName = "DynamicDatatableFilterRow";
