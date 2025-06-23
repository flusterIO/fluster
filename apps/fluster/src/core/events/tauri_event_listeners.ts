import { events } from "../lib/bindings.ts";
import { showToast } from "#/toast_notification/data/events/show_toast";

events.showToast.listen((e) => {
    showToast(e.payload);
});

