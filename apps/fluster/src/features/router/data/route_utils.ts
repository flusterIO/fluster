import { AppRoutes } from "@fluster.io/dev";

export const chatRouteById = (chatId: string): string => {
    const sp = new URLSearchParams();
    sp.set("chat_id", chatId);
    return `${AppRoutes.aiMainChat}?${sp.toString()}`;
};
