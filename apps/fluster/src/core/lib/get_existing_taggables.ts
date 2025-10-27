import { parseDate } from "@fluster.io/dev";
import { commands, SharedTaggableModel, AllTaggableData } from "./bindings";

export const getExistingTaggables = async (): Promise<AllTaggableData> => {
    const existingTaggables = await commands.getExistingTaggables();
    return {
        tags: existingTaggables.tags.map((t: SharedTaggableModel) => {
            return {
                utime: parseDate(t.utime).valueOf().toString(),
                value: t.value,
            };
        }),
        topics: existingTaggables.topics.map((t: SharedTaggableModel) => {
            return {
                utime: parseDate(t.utime).valueOf().toString(),
                value: t.value,
            };
        }),
        subjects: existingTaggables.subjects.map((t: SharedTaggableModel) => {
            return {
                utime: parseDate(t.utime).valueOf().toString(),
                value: t.value,
            };
        }),
    };
};
