import { AppRoutes } from "@fluster.io/dev";

export const getTopicUrl = (topicValue: string): string => {
    const sp = new URLSearchParams();
    sp.set("by_topic", topicValue);
    return `${AppRoutes.search}?${sp.toString()}`;
};

export const getSubjectUrl = (subjectValue: string): string => {
    const sp = new URLSearchParams();
    sp.set("by_subject", subjectValue);
    return `${AppRoutes.search}?${sp.toString()}`;
};
