import { events } from "../lib/bindings.ts";
import { showToast } from "#/toast_notification/data/events/show_toast";

events.showToast.listen((e) => {
    showToast(e.payload);
});

// RESUME: Add a handler for the SetDbConnectionUri event here and set that as a variable attached to the window so postgres can be queried directly from the front end.
