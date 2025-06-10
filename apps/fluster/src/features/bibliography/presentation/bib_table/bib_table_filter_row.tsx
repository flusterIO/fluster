import {
  useBibTableContext,
  useBibTableDispatch,
} from "#/bibliography/state/bib_table_context";
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
import React, { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BibTableColumnId } from "./columns";
import { ChevronDown } from "lucide-react";

const formSchema = z.object({
  query: z.string(),
});

const hideVisibilityFilterIds: BibTableColumnId[] = [BibTableColumnId.select];

export const BibTableFilterRow = (): ReactNode => {
  const { columnVisibility } = useBibTableContext();
  const dispatch = useBibTableDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });
  return (
    <Form {...form}>
      <div className="flex flex-row justify-between items-end w-full px-8 mb-6">
        <div>
          <TextInputGroup
            classes={{
              input: "bg-input",
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
              {Object.entries(columnVisibility ?? {}).map((k) => {
                if (
                  hideVisibilityFilterIds.includes(k[0] as BibTableColumnId)
                ) {
                  return null;
                }
                return (
                  <div
                    className="grid grid-cols-[auto_1fr] gap-2"
                    key={`col-${k[0]}`}
                  >
                    <Checkbox
                      className="place-self-center"
                      checked={k[1]}
                      onClick={() => {
                        dispatch({
                          type: "setColumnVisibility",
                          payload: {
                            ...columnVisibility,
                            [k[0]]: !k[1],
                          },
                        });
                      }}
                    />
                    <div className="text-foreground">{`${k[0][0].toUpperCase()}${k[0].slice(
                      1,
                      k[0].length
                    )}`}</div>
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

BibTableFilterRow.displayName = "BibTableFilterRow";
