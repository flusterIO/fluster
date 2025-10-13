import { SharedTaggableModel } from "@/lib/bindings";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@fluster.io/dev";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, type ReactNode } from "react";

interface TaggableListProps {
    items: (SharedTaggableModel & { url: string })[];
    label: ReactNode;
    desc: ReactNode;
}

export const DashboardTaggableList = (props: TaggableListProps): ReactNode => {
    const PER_PAGE = 5;
    const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-orange-500",
        "bg-red-500",
        "bg-teal-500",
    ];
    const [page, setPage] = useState(0);
    const pageStart = page * PER_PAGE;
    return (
        <Card className="max-h-[450px]">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    {props.label}
                </CardTitle>
                <CardDescription>{props.desc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {props.items
                    .slice(pageStart, pageStart + PER_PAGE)
                    .map((item, index) => (
                        <a
                            key={`topic-${item.value}`}
                            className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                            href={item.url}
                        >
                            <div className="flex items-center space-x-3">
                                <div
                                    className={`h-3 w-3 rounded-full ${colors[index % colors.length]
                                        }`}
                                />
                                <span className="font-medium">{item.value}</span>
                            </div>
                        </a>
                    ))}
            </CardContent>
            <div className="flex flex-row justify-end items-center gap-3 px-4">
                <Button
                    size="icon"
                    className="w-5 h-5"
                    variant={"secondary"}
                    disabled={page === 0}
                    onClick={() => {
                        setPage(page - 1);
                    }}
                >
                    <ChevronLeft className="w-3 h-3" />
                </Button>
                <Button
                    size="icon"
                    className="w-5 h-5"
                    variant={"secondary"}
                    disabled={props.items.length <= PER_PAGE * (page + 1)}
                    onClick={() => {
                        setPage(page + 1);
                    }}
                >
                    <ChevronRight className="w-3 h-3" />
                </Button>
            </div>
        </Card>
    );
};

DashboardTaggableList.displayName = "TaggableList";
