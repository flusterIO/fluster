import { showToast } from "#/toast_notification/data/events/show_toast";
import { commands, TraditionalSearchResults } from "@/lib/bindings";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const useSearchResults = (): TraditionalSearchResults | null => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<TraditionalSearchResults | null>(null);

    const getByDict = async (by_dict: string): Promise<void> => {
        const res = await commands.getNoteByDictEntryLabel(by_dict);
        if (res.status === "ok") {
            setData(res.data);
        } else {
            console.error("Error: ", res.error);
            showToast({
                title: "Something went wrong",
                body: "We could not find that dictionary entry. Have you sync'd your database since you added that entry?",
                duration: 10000,
                variant: "Error",
            });
        }
    };

    const getByBibEntry = async (bibEntryId: string): Promise<void> => {
        console.log("bibEntryId: ", bibEntryId);
        const res = await commands.getNotesByBibEntryId(bibEntryId);
        console.log("res: ", res);
        if (res.status === "ok") {
            setData(res.data);
        } else {
            console.error("Error: ", res.error);
            showToast({
                title: "Something went wrong",
                body: "We could not find that bib entry. Did you sync your database since you added that bibliography entry?",
                duration: 10000,
                variant: "Error",
            });
        }
    };

    const getByTag = async (val: string): Promise<void> => {
        const res = await commands.getTagSearchResults([val]);
        console.log("res: ", res);
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

    const getByEquation = async (equationId: string): Promise<void> => {
        const res = await commands.getNotesByEquationId(equationId);
        if (res.status === "ok") {
            setData(res.data);
        } else {
            console.error(
                `An error occurroed while getting notes by equation: ${res.error}`
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
        } else if (searchParams.has("by_bib")) {
            getByBibEntry(searchParams.get("by_bib")!);
        } else if (searchParams.has("by_dict")) {
            getByDict(searchParams.get("by_dict")!);
        } else if (searchParams.has("by_equation")) {
            getByEquation(searchParams.get("by_equation")!);
        }
    }, [searchParams]);
    return data;
};
