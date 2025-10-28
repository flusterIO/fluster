import { commands, FlashcardGroup } from "@/lib/bindings";
import {
    AppRoutes,
    Badge,
    Button,
    H4,
    LargeText,
    showErrorToast,
    useEventListener,
} from "@fluster.io/dev";
import React, { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { TagBadge } from "#/search/presentation/utils/tag_badge";
import { getSubjectUrl, getTopicUrl } from "@/lib/url_utils";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setPanelLeftOpen } from "#/panel_left/state/slice";

interface EventProps {
    flashcard_id: string;
}
declare global {
    interface WindowEventMap {
        "show-flashcard-detail": CustomEvent<EventProps>;
    }
}

const FlashcardDetailPaneInner = ({
    data,
    hide,
}: {
    data: FlashcardGroup;
    hide: () => void;
}): ReactNode => {
    const [show, setShow] = useState<boolean | null>(null);
    useEffect(() => setShow(true), []);
    useEffect(() => {
        if (show === false) {
            setTimeout(hide, 1000);
        }
        /* eslint-disable-next-line  -- I hate this rule. */
    }, [show]);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const desc = data.question_description.length
        ? data.question_description
        : data.answer_description.length
            ? data.answer_description
            : null;
    return (
        <>
            <motion.div
                className="absolute w-screen h-screen bg-background/40 top-0 right-0 left-0 bottom-0"
                initial={"hide"}
                animate={show ? "show" : "hide"}
                variants={{
                    hide: {
                        scale: 0,
                    },
                    show: {
                        scale: 1,
                    },
                }}
                onClick={() => setShow(false)}
            />
            <motion.div
                className="h-screen w-fit px-4 pb-5 pt-8 absolute top-0 bottom-0 right-0 z-50 border-l bg-card min-w-[min(450px,90vw)] flex flex-col justify-between items-center"
                initial={"hide"}
                animate={show ? "show" : "hide"}
                variants={{
                    hide: {
                        translateX: "100%",
                    },
                    show: {
                        translateX: 0,
                    },
                }}
                transition={{
                    bounce: 0,
                }}
            >
                <div className="w-full flex-grow">
                    <H4>
                        <InlineMdxContent abortIfNoMath mdx={data.label} />
                    </H4>
                    {desc ? (
                        <div className="text-sm">
                            <InlineMdxContent abortIfNoMath mdx={desc} />
                        </div>
                    ) : null}
                    <div className="w-full mt-8">
                        <LargeText>Tags</LargeText>
                        <div className="flex flex-row justify-start items-center gap-2 flex-wrap">
                            {data.tags.map((t) => (
                                <TagBadge
                                    tagValue={t.tag_value}
                                    key={`${data.id}-${t.tag_value}`}
                                    onClick={() => setShow(false)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-full mt-8">
                        <LargeText>Topic</LargeText>
                        <Badge
                            className={
                                data.topic?.topic_value.length ? "cursor-pointer" : undefined
                            }
                            onClick={
                                data.topic?.topic_value.length
                                    ? () => {
                                        nav(getTopicUrl(data.topic!.topic_value));
                                        setShow(false);
                                    }
                                    : undefined
                            }
                            aria-disabled={!data.topic?.topic_value.length}
                            variant={
                                !data.topic?.topic_value.length ? "secondary" : undefined
                            }
                        >
                            {data.topic?.topic_value.length ? data.topic.topic_value : "--"}
                        </Badge>
                    </div>
                    <div className="w-full mt-8">
                        <LargeText>Subject</LargeText>
                        <Badge
                            className={
                                data.subject?.subject_value.length
                                    ? "cursor-pointer"
                                    : undefined
                            }
                            onClick={
                                data.subject?.subject_value.length
                                    ? () => {
                                        nav(getSubjectUrl(data.subject!.subject_value));
                                        setShow(false);
                                    }
                                    : undefined
                            }
                            aria-disabled={!data.subject?.subject_value.length}
                            variant={
                                !data.subject?.subject_value.length ? "secondary" : undefined
                            }
                        >
                            {data.subject?.subject_value.length
                                ? data.subject.subject_value
                                : "--"}
                        </Badge>
                    </div>
                </div>
                <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => {
                        const sp = new URLSearchParams();
                        sp.set("editing", data.id);
                        nav(`${AppRoutes.flashcard}?${sp.toString()}`);
                        dispatch(setPanelLeftOpen(true));
                    }}
                >
                    Edit
                </Button>
            </motion.div>
        </>
    );
};

export const FlashcardDetailPane = (): ReactNode => {
    const [data, setData] = useState<FlashcardGroup | null>(null);
    const getData = async (id: string): Promise<void> => {
        const res = await commands.getFlashcardData(id);
        if (res.status === "ok") {
            setData(res.data);
        } else {
            showErrorToast(
                "Fluster could not get your flashcard's data. If this continues, pleaase file an issue on Github."
            );
        }
    };
    useEventListener("show-flashcard-detail", (e) =>
        getData(e.detail.flashcard_id)
    );
    if (!data) {
        return null;
    }
    return createPortal(
        <FlashcardDetailPaneInner data={data} hide={() => setData(null)} />,
        document.body
    );
};

FlashcardDetailPane.displayName = "FlashcardDetailPane";
