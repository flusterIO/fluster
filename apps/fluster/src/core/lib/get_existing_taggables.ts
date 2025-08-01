import { commands, SharedTaggableModel, AllTaggableData } from "./bindings";

export const getExistingTaggables = async (): AllTaggableData => {
    const existingTaggables = await commands.getExistingTaggables();
    return {
        tags: existingTaggables.tags.map((t: SharedTaggableModel) => {
            return {
                value: t.value,
                ctime: new Date(t.ctime).valueOf().toString(),
            };
        }),
        topics: existingTaggables.tags.map((t: SharedTaggableModel) => {
            return {
                value: t.value,
                ctime: new Date(t.ctime).valueOf().toString(),
            };
        }),
        subjects: existingTaggables.tags.map((t: SharedTaggableModel) => {
            return {
                value: t.value,
                ctime: new Date(t.ctime).valueOf().toString(),
            };
        }),
    };
};
