import { H3 } from "@/components/typography/typography";
import { commands, SnippetItem } from "@/lib/bindings";
import { type ReactNode } from "react";
import CodeBlock from "../code_block/main";
import { Button } from "@/components/ui/shad/button";
import { useConfirmation } from "#/confirmation_modal/state/hooks/use_confirmation";
import { reloadSnippetList } from "#/snippets/data/events/reload_snippet_list";
import { copyStringToClipboard } from "@/lib/copy_string_to_clipboard";
import { showToast } from "#/toast_notification/data/events/show_toast";

interface SnippetItemComponentProps {
    item: SnippetItem;
}

const SnippetListItem = ({ item }: SnippetItemComponentProps): ReactNode => {
    const confirmationId = `delete-snippet-${item.id}`;
    const handleDelete = async (): Promise<void> => {
        if (item.id) {
            let res = await commands.deleteSnippetById(item.id);
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
            handleDelete();
        }
    );
    const handleDeleteClick = async (): Promise<void> => {
        confirm.setVisible(true);
    };

    const handleCopyClick = async () => {
        let res = await copyStringToClipboard(item.body);
        if (res) {
            showToast({
                title: "Success",
                body: `Your ${item.lang} code has been copied to your clipboard.`,
                duration: 5000,
                variant: "Success",
            });
        }
    };
    return (
        <div className="w-[min(90%,1080px)] h-fit px-6 pb-6 pt-4 border rounded">
            <H3 className="mb-2">{item.label}</H3>
            <div className="text-sm text-muted-foreground mb-3">{item.lang}</div>
            {item.desc && item.desc !== "" && <div className="mb-3">{item.desc}</div>}
            <CodeBlock lang={item.lang} code={item.body} />
            <div className="flex flex-row justify-end items-center gap-4 w-full mt-4">
                <Button variant={"destructive"} onClick={handleDeleteClick}>
                    Delete
                </Button>
                <Button onClick={handleCopyClick}>Copy</Button>
            </div>
        </div>
    );
};

SnippetListItem.displayName = "SnippetListItem";

export default SnippetListItem;
