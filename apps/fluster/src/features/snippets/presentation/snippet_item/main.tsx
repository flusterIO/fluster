import { H3 } from "@/components/typography/typography";
import { commands, SnippetItem } from "@/lib/bindings";
import React, { type ReactNode } from "react";
import CodeBlock from "../code_block/main";
import { Button, buttonVariants } from "@fluster.io/dev";
import { useConfirmation } from "#/confirmation_modal/state/hooks/use_confirmation";
import { reloadSnippetList } from "#/snippets/data/events/reload_snippet_list";
import { copyStringToClipboard } from "@/lib/copy_string_to_clipboard";
import { showToast } from "#/toast_notification/data/events/show_toast";
import { motion } from "motion/react";
import store from "@/state/store";
import { setPanelLeftOpen } from "#/panel_left/state/slice";
import { NavLink } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import { cn } from "@/lib/utils";

interface SnippetItemComponentProps {
  item: SnippetItem;
  idx: number;
}

const SnippetListItem = ({
  item,
  idx,
}: SnippetItemComponentProps): ReactNode => {
  const confirmationId = `delete-snippet-${item.id}`;
  const handleDelete = async (): Promise<void> => {
    if (item.id) {
      const res = await commands.deleteSnippetById(item.id);
      if (res.status === "ok") {
        reloadSnippetList();
      }
    }
  };
  const confirm = useConfirmation(
    {
      id: confirmationId,
      acceptButtonText: "Delete",
      denyButtonText: "Cancel",
      title: "Are you sure?",
      body: "Deleting this snippet is irreversable.",
      confirmationVariant: "destructive",
    },
    () => {
      handleDelete().catch(() => {
        showToast({
          title: "Oh no",
          body: "Something went wrong while deleting this snippet.",
          variant: "Error",
          duration: 5000,
        });
      });
    }
  );

  const handleDeleteClick = (): void => {
    confirm.setVisible(true);
  };

  const handleCopyClick = async () => {
    const res = await copyStringToClipboard(item.body);
    if (res) {
      showToast({
        title: "Success",
        body: `Your ${item.lang} code has been copied to your clipboard.`,
        duration: 5000,
        variant: "Success",
      });
    }
  };

  const handleEditClick = (): void => {
    store.dispatch(setPanelLeftOpen(true));
  };

  return (
    <motion.div
      className="w-[min(90%,1080px)] h-fit px-6 pb-6 pt-4 border rounded @container/snippet_item"
      initial="initial"
      animate="show"
      transition={{
        delay: idx * 0.1,
      }}
      variants={{
        initial: {
          x: idx % 2 === 0 ? -200 : 200,
          opacity: 0,
        },
        show: {
          x: 0,
          opacity: 1,
        },
      }}
    >
      <H3 className="mb-2">{item.label}</H3>
      <div className="text-sm text-muted-foreground mb-3">{item.lang}</div>
      {item.desc && item.desc !== "" && <div className="mb-3">{item.desc}</div>}
      <CodeBlock lang={item.lang} code={item.body} />
      <div className="w-full flex flex-col justify-between items-center gap-4 @[300px]/snippet_item:gap-6 @[300px]/snippet_item:flex-row mt-4">
        <Button
          className="w-full @[300px]/snippet_item:w-fit"
          variant={"destructive"}
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
        <div className="flex flex-col justify-end items-center gap-4 w-full @[300px]/snippet_item:flex-row">
          <NavLink
            className={cn(
              "w-full @[300px]/snippet_item:w-fit",
              buttonVariants({
                variant: "outline",
              })
            )}
            /* variant={"outline"} */
            onClick={handleEditClick}
            to={`${AppRoutes.snippets}?editing=${item.id}`}
          >
            Edit
          </NavLink>
          <Button
            className="w-full @[300px]/snippet_item:w-fit"
            onClick={() => handleCopyClick()}
          >
            Copy
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

SnippetListItem.displayName = "SnippetListItem";

export default SnippetListItem;
