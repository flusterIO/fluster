import { AiChatModel, commands } from "@/lib/bindings";
import { XIcon } from "lucide-react";
import React, { type ReactNode } from "react";
import dayjs from "dayjs";
import { useConfirmation } from "#/confirmation_modal/state/hooks/use_confirmation";
import { showToast } from "#/toast_notification/data/events/show_toast";
import { useNavigate, useSearchParams } from "react-router";
import { chatRouteById } from "#/router/data/route_utils";
import { AppRoutes, cn } from "@fluster.io/dev";

interface AiChatHistoryCardProps {
    item: AiChatModel;
}

export const AiChatHistoryCard = ({
    item,
}: AiChatHistoryCardProps): ReactNode => {
    const d = dayjs(item.ctime);
    const nav = useNavigate();
    const [searchParams] = useSearchParams();
    const isActive = searchParams.get("chat_id") === item.id;

    const handleDelete = async (): Promise<void> => {
        const res = await commands.deleteChatById(item.id);
        if (res.status === "ok") {
            window.dispatchEvent(new CustomEvent("request-new-chat-list", {}));
        } else {
            console.log("Response: ", res);
            console.error("An error occurred while deleting a saved chat.");
        }
    };
    const confirmationId = `delete-chat-${item.id}`;
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
            handleDelete().catch(() => {
                showToast({
                    title: "Oh no",
                    body: "Something went wrong while deleting this chat.",
                    variant: "Error",
                    duration: 5000,
                });
            });
        }
    );

    return (
        <div
            onClick={() =>
                nav(isActive ? AppRoutes.aiMainChat : chatRouteById(item.id))
            }
            role="button"
            className={cn(
                "w-full grid grid-cols-[32px_1fr] border rounded-lg hover:bg-muted/60 transition-colors duration-150 cursor-pointer pl-2 pr-4 py-5",
                isActive && "bg-muted/80"
            )}
        >
            <XIcon
                onClick={() => confirm.setVisible(true)}
                className="place-self-center w-4 h-4"
            />
            <div className="w-full">
                <h5 className="text-lg font-bold">{item.label}</h5>
                <p className="text-sm text-muted-foreground">
                    {d.format("MM/DD/YYYY")}
                </p>
            </div>
        </div>
    );
};

AiChatHistoryCard.displayName = "AiChatHistoryCard";
