"use client";

import React, { useEffect, useState } from "react";
import { Plus, Search, Clock, CheckSquare } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    showToast,
    buttonVariants,
    AppRoutes,
    Checkbox,
    useEventListener,
} from "@fluster.io/dev";
import { dashboardStaticData } from "../../../data/models/dashboard_static_data";
import QuickActionCard from "../../quick_action_card";
import { commands, DashboardData, MdxNoteGroup } from "@/lib/bindings";
import { LoadingComponent } from "@/components/loading_screen";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { getRecentlyAccessedNotes } from "#/command_palette/data/tree/recently_accessed";
import { getSubjectUrl, getTopicUrl } from "@/lib/url_utils";
import { DashboardTaggableList } from "./taggable_list";
import { onEnter } from "@/events/on_enter";
import { useNavigate } from "react-router";
import { parseDate } from "@/lib/date_utils";
import { DashboardNotesList } from "./notes_list";

export function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const nav = useNavigate();

    const [data, setData] = useState<
        (DashboardData & { notes: MdxNoteGroup[] }) | null
    >(null);

    const getData = async (): Promise<void> => {
        const res = await commands.getDashboardData();
        if (res.status === "ok") {
            const recentlyAccessedNotes = await getRecentlyAccessedNotes();

            setData({
                ...res.data,
                notes: recentlyAccessedNotes,
            });
        } else {
            setData({
                notes: [],
                bookmarks: [],
                note_count: "0",
                subjects: [],
                topics: [],
                tags: [],
                incomplete_tasks: [],
            });
            showToast({
                title: "Something went wrong",
                body: "Fluster encountered an error while attempting to gather your dashboard data.",
                duration: 5000,
                variant: "Error",
            });
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEventListener("database-sync-success", getData);

    if (data === null) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <LoadingComponent />
            </div>
        );
    }

    return (
        <div className="min-h-screen @container/dashboard flex flex-col justify-start items-center w-full px-4 sm:px-0">
            <div className="container py-6 space-y-6 w-full @[600px]/dashboard:px-8">
                {/* Header */}
                <div className="flex flex-col gap-x-6 @[600px]/dashboard:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="w-full @[600px]:w-auto">
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Organize your knowledge and accelerate discovery
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 w-full @[600px]/dashboard:w-fit @[600px]/dashboard:mt-0">
                        <div className="relative w-full @[600px]:w-auto">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                autoFocus
                                placeholder="Search notes, equations, code..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) =>
                                    onEnter(e, () => {
                                        const sp = new URLSearchParams();
                                        sp.set("query", (e.target as HTMLInputElement).value);
                                        nav(`${AppRoutes.semanticSearch}?${sp.toString()}`);
                                    })
                                }
                                className="pl-10 @[600px]/dashboard:w-64 w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* AI Assistant Greeting */}
                {/* <Card className="border-2 border-dashed border-primary/10 dark:border-border bg-primary/20 dark:bg-primary/80"> */}
                {/*     <CardContent className="p-6"> */}
                {/*         <div className="flex items-start space-x-4"> */}
                {/*             <div className="rounded-full bg-accent p-3"> */}
                {/*                 <Brain className="h-6 w-6 text-accent-foreground" /> */}
                {/*             </div> */}
                {/*             <div className="flex-1"> */}
                {/*                 <h3 className="font-semibold text-primary dark:text-primary-foreground"> */}
                {/*                     Good morning, Dr. Researcher! 🧬 */}
                {/*                 </h3> */}
                {/*                 <p className="mt-1 text-sm text-foreground dark:text-primary-foreground/90"> */}
                {/*                     I've analyzed your recent notes and found 3 potential */}
                {/*                     connections between your quantum mechanics and bioinformatics */}
                {/*                     research. Would you like me to help you explore these */}
                {/*                     interdisciplinary insights? */}
                {/*                 </p> */}
                {/*                 <div className="mt-3 flex space-x-2"> */}
                {/*                     <Button size="sm" className="bg-primary"> */}
                {/*                         <Sparkles className="mr-2 h-4 w-4" /> */}
                {/*                         Show Insights */}
                {/*                     </Button> */}
                {/*                     <Button size="sm" variant="outline"> */}
                {/*                         Ask AI Assistant */}
                {/*                     </Button> */}
                {/*                 </div> */}
                {/*             </div> */}
                {/*         </div> */}
                {/*     </CardContent> */}
                {/* </Card> */}

                {/* Quick Actions */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Plus className="mr-2 h-5 w-5" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>
                            Convenient & frequently used actions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 @[450px]/dashboard:grid-cols-2 gap-3 @[600px]/dashboard:grid-cols-3 @[900px]/dashboard:grid-cols-6">
                            {dashboardStaticData.quickCreateItems.map((item) => (
                                <QuickActionCard key={`quick-action-${item.id}`} item={item} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex @[1080px]/dashboard:flex-row flex-col justify-center items-start gap-6 w-full @[1080px]/dashboard:max-w-[1440px]">
                    <div className="flex flex-col justify-start items-center gap-6 flex-grow w-full">
                        {/* Main Content */}
                        {/* Recent Notes */}
                        <Card className="w-full">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center">
                                            <Clock className="mr-2 h-5 w-5" />
                                            Recent Notes
                                        </CardTitle>
                                        <CardDescription>
                                            Your latest research entries
                                        </CardDescription>
                                    </div>
                                    <a
                                        href={(() => {
                                            const sp = new URLSearchParams();
                                            sp.set("all_notes", "true");
                                            return `${AppRoutes.search}?${sp.toString()}`;
                                        })()}
                                        className={buttonVariants({ variant: "ghost", size: "sm" })}
                                    >
                                        View All
                                    </a>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <DashboardNotesList
                                    bookmarks={data.bookmarks}
                                    items={data.notes}
                                    getData={getData}
                                />
                            </CardContent>
                        </Card>

                        {/* Research Progress */}
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <CheckSquare className="mr-2 h-5 w-5" />
                                    Tasks
                                </CardTitle>
                                <CardDescription>Keep track of your priorities</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 max-h-[350px] overflow-x-hidden overflow-y-auto">
                                {data.incomplete_tasks.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`flex flex-row items-center space-x-3 rounded-lg border p-3 ${item.complete ? "opacity-60" : ""
                                            }`}
                                    >
                                        <Checkbox
                                            checked={item.complete}
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                const res = await commands.createTask(
                                                    {
                                                        ...item,
                                                        ctime: parseDate(item.ctime).valueOf().toString(),
                                                        due_at: item.due_at
                                                            ? parseDate(item.due_at).valueOf().toString()
                                                            : null,
                                                        complete: true,
                                                    },
                                                    []
                                                );
                                                if (res.status === "ok") {
                                                    setData({
                                                        ...data,
                                                        incomplete_tasks: data.incomplete_tasks.filter(
                                                            (x) => x.id !== item.id
                                                        ),
                                                    });
                                                }
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div
                                                className={`text-sm ${item.complete ? "line-through" : ""
                                                    }`}
                                            >
                                                <InlineMdxContent mdx={item.label} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                    {/* Sidebar */}
                    <div className="flex flex-col justify-start items-center gap-6 w-full @[1080px]/dashboard:w-[min(450px,33%)]">
                        {/* Subjects */}
                        <DashboardTaggableList
                            items={data.subjects.map((t) => {
                                return {
                                    ...t,
                                    url: getSubjectUrl(t.value),
                                };
                            })}
                            label="Subjects"
                            desc="Search by subject"
                        />

                        {/* Topics List */}
                        <DashboardTaggableList
                            items={data.topics.map((t) => {
                                return {
                                    ...t,
                                    url: getTopicUrl(t.value),
                                };
                            })}
                            label="Topics"
                            desc="Search by topic"
                        />

                        {/* Quick Stats */}
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Total Notes
                                    </span>
                                    <span className="font-semibold">{data.note_count}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Topics</span>
                                    <span className="font-semibold">{data.topics.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Subjects
                                    </span>
                                    <span className="font-semibold">{data.subjects.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Tags</span>
                                    <span className="font-semibold">{data.tags.length}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
