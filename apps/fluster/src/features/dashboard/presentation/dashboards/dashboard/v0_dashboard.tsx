"use client";

import React, { useEffect, useState } from "react";
import {
    FileText,
    Plus,
    Search,
    Filter,
    Clock,
    CheckSquare,
    Brain,
    Sparkles,
    Star,
} from "lucide-react";
import {
    Button,
    Badge,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    showToast,
    buttonVariants,
    AppRoutes,
    cn,
    Checkbox,
} from "@fluster.io/dev";
import { dashboardStaticData } from "../../../data/models/dashboard_static_data";
import QuickActionCard from "../../quick_action_card";
import {
    commands,
    DashboardData,
    MdxNoteGroup,
    TaskModel,
} from "@/lib/bindings";
import { LoadingComponent } from "@/components/loading_screen";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { getRecentlyAccessedNotes } from "#/command_palette/data/tree/recently_accessed";
import { getSubjectUrl, getTopicUrl } from "@/lib/url_utils";
import { DashboardTaggableList } from "./taggable_list";
import dayjs from "dayjs";
import { getMdxNoteUrl } from "#/mdx/utils/get_mdx_note_url";
import { onEnter } from "@/events/on_enter";
import { useNavigate } from "react-router";
import { parseDate } from "@/lib/date_utils";

const todoItems = [
    {
        id: 1,
        text: "Review literature on CRISPR applications",
        completed: false,
        priority: "high",
    },
    {
        id: 2,
        text: "Analyze experimental data from last week",
        completed: true,
        priority: "medium",
    },
    {
        id: 3,
        text: "Prepare presentation for conference",
        completed: false,
        priority: "high",
    },
    {
        id: 4,
        text: "Update research methodology notes",
        completed: false,
        priority: "low",
    },
];

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

    if (data === null) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <LoadingComponent />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Organize your knowledge and accelerate discovery
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
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
                                className="pl-10 w-64"
                            />
                        </div>
                    </div>
                </div>

                {/* AI Assistant Greeting */}
                <Card className="border-2 border-dashed border-primary/10 dark:border-border bg-primary/20 dark:bg-primary/80">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                            <div className="rounded-full bg-accent p-3">
                                <Brain className="h-6 w-6 text-accent-foreground" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-primary dark:text-primary-foreground">
                                    Good morning, Dr. Researcher! 🧬
                                </h3>
                                <p className="mt-1 text-sm text-foreground dark:text-primary-foreground/90">
                                    I've analyzed your recent notes and found 3 potential
                                    connections between your quantum mechanics and bioinformatics
                                    research. Would you like me to help you explore these
                                    interdisciplinary insights?
                                </p>
                                <div className="mt-3 flex space-x-2">
                                    <Button size="sm" className="bg-primary">
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Show Insights
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        Ask AI Assistant
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
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
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
                            {dashboardStaticData.quickCreateItems.map((item) => (
                                <QuickActionCard key={`quick-action-${item.id}`} item={item} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Recent Notes */}
                        <Card>
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
                                {data.notes.slice(0, 10).map((note) => (
                                    <div
                                        key={note.mdx.file_path}
                                        className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                                            <FileText className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium truncate">
                                                <a
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    href={getMdxNoteUrl(note.mdx.file_path)}
                                                >
                                                    <InlineMdxContent mdx={note.front_matter.title} />
                                                </a>
                                            </h4>
                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <a
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    href={
                                                        note.front_matter?.subject?.value
                                                            ? getSubjectUrl(note.front_matter.subject.value)
                                                            : undefined
                                                    }
                                                >
                                                    {note.front_matter?.subject?.value ?? "No Subject"}{" "}
                                                </a>
                                                <span>•</span>
                                                <a
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    href={
                                                        note.front_matter?.topic?.value
                                                            ? getTopicUrl(note.front_matter.topic.value)
                                                            : undefined
                                                    }
                                                >
                                                    {note.front_matter?.topic?.value ?? "No Topic"}
                                                </a>
                                                <span>•</span>
                                                <span>
                                                    {dayjs(note.mdx.last_read, {
                                                        utc: true,
                                                    }).format("MMM Do, YYYY [at] hh:mm a")}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {note.tags.slice(0, 3).map((tag) => (
                                                    <Badge
                                                        key={`tag-${tag.value}`}
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        {tag.value}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Star
                                                className={cn(
                                                    "h-4 w-4",
                                                    data.bookmarks.some(
                                                        (bookmark) =>
                                                            bookmark.file_path === note.mdx.file_path
                                                    )
                                                        ? "fill-primary"
                                                        : "fill-none"
                                                )}
                                            />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Research Progress */}
                        <Card>
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
                                            <p
                                                className={`text-sm ${item.complete ? "line-through" : ""
                                                    }`}
                                            >
                                                <InlineMdxContent mdx={item.label} />
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
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
                        <Card>
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
