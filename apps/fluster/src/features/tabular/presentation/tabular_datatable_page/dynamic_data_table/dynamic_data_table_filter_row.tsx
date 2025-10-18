import { capitalize } from "@/lib/string_utils";
import {
    Button,
    Checkbox,
    Form,
    Popover,
    PopoverContentNoPortal,
    PopoverTrigger,
    TextInputGroup,
} from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import React, { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TABLE_EMPTY_STRING_KEY } from "./dynamic_data_table_constants";

interface DynamicDatatableFilterRowProps {
    columnVisibility: Record<string, boolean>;
    setColumnVisibility: (newVisibility: Record<string, boolean>) => void;
}

const formSchema = z.object({
    query: z.string(),
});

export const DynamicDatatableFilterRow = (
    props: DynamicDatatableFilterRowProps
): ReactNode => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
        },
    });
    return (
        <Form {...form}>
            <div className="flex flex-row justify-between items-end w-full mb-6">
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
                <div>
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
