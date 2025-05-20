import store from "@/state/store.ts";
import { events } from "../lib/bindings.ts";
import { showToast } from "#/toast_notification/state/slice.ts";

events.showToast.listen((e) => {
    store.dispatch(
        showToast({
            title: e.payload.title,
            body: e.payload.body,
            duration: e.payload.duration ?? 5000,
            variant: e.payload.variant,
        }),
    );
});
