import { commands, TraditionalSearchResults } from "@/lib/bindings";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useSearchResults = (): TraditionalSearchResults | null => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<TraditionalSearchResults | null>(null);

    const getByTag = async (val: string): Promise<void> => {
        const res = await commands.getTagSearchResults([val]);
        if (res.status === "ok") {
            setData(res.data);
        } else {
            console.error(
                `An error occurred while attempting to gather search results by tag.`
            );
        }
    };

    const getByTopic = async (val: string): Promise<void> => {
        const res = await commands.getTopicSearchResults([val]);
        if (res.status === "ok") {
            setData(res.data);
        } else {
            console.error(
                `An error occurred while attempting to gather search results by topic.`
            );
        }
    };
    const getBySubject = async (val: string): Promise<void> => {
        const res = await commands.getSubjectSearchResults([val]);
        if (res.status === "ok") {
            setData(res.data);
        } else {
            console.error(
                `An error occurred while attempting to gather search results by subject.`
            );
        }
    };

    useEffect(() => {
        if (searchParams.has("by_tag")) {
            getByTag(searchParams.get("by_tag")!);
        } else if (searchParams.has("by_topic")) {
            getByTopic(searchParams.get("by_topic")!);
        } else if (searchParams.has("by_subject")!) {
            getBySubject(searchParams.get("by_subject")!);
        }
    }, [searchParams]);
    return data;
};
