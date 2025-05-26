import { useState, type ReactNode } from "react";
import Toast from "./toast_item";
import { useEventListener } from "@/hooks/use_event_listener";
import { ToastItem } from "../types";

const ToastNotificationList = (): ReactNode => {
    const [items, setItems] = useState<(ToastItem & { createdAt: number })[]>([]);

    useEventListener("show-toast", (e) => {
        setItems([
            ...items,
            {
                ...e.detail,
                createdAt: Date.now(),
            },
        ]);
    });

    return (
        <div
            id="toast-list"
            className="h-fit flex flex-col justify-center items-center gap-6 max-w-[350px] max-h-screen absolute right-0 bottom-0 p-6 overflow-hidden overflow-y-auto"
        >
            {items
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((t: ToastItem) => (
                    <Toast
                        removeSelf={() =>
                            setItems(items.filter((x: ToastItem) => x.id !== t.id))
                        }
                        item={t}
                        key={t.id}
                    />
                ))}
        </div>
    );
};

ToastNotificationList.displayName = "ToastNotificationList";

export default ToastNotificationList;
