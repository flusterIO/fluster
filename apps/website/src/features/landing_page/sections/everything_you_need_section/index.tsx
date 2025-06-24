"use client";
import React, { type ReactNode } from "react";
import {
    Brain,
    Database,
    BookOpen,
    CheckSquare,
    Kanban,
    Code,
    BarChart3,
    FileText,
    Puzzle,
} from "lucide-react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "#/core/shad/ui/card";

interface DataItem {
    body: string;
    title: string;
    icon: typeof Puzzle;
}

const data: DataItem[] = [
    {
        title: "AI-Powered RAG",
        body: "Intelligent retrieval augmented generation across all your research materials",
        icon: Brain,
    },
    {
        title: "Vector Database",
        body: "Advanced semantic search and similarity matching for your notes and documents",
        icon: Database,
    },
    {
        title: "Bibliography Manager",
        body: "Organize citations, references, and generate bibliographies automatically",
        icon: BookOpen,
    },
    {
        title: "Task Management",
        body: "Keep track of research tasks, deadlines, and project milestones",
        icon: CheckSquare,
    },
    {
        title: "Kanban Boards",
        body: "Visual project management for research workflows and collaboration",
        icon: Kanban,
    },
    {
        title: "Jupyter Cells",
        body: "Execute code directly in your notes with interactive computational cells",
        icon: Code,
    },
    {
        title: "Interactive Plotting",
        body: "Create dynamic visualizations and charts directly within your research notes",
        icon: BarChart3,
    },
    {
        title: "Universal Format Support",
        body: "Import and work with MDX, Markdown, CSV, Excel, PDFs, images, and videos",
        icon: FileText,
    },
    {
        title: "Plugin Ecosystem",
        body: "Extend functionality with APIs in Python, Go, TypeScript, Rust, and Lua",
        icon: Puzzle,
    },
];

const EverythingYouNeedSection = (): ReactNode => {
    return (
        <section id="features" className="py-20 px-4 w-full">
            <div className="mx-auto max-w-[min(1080px,90vw)]">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
                        Everything You Need for Research
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Comprehensive tools designed specifically for scientific research,
                        academic writing, and collaborative projects.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((d) => {
                        return (
                            <Card
                                key={d.title}
                                className="border-2 hover:!border-sky-500 transition-colors cursor-default"
                            >
                                <CardHeader>
                                    <d.icon className="w-10 h-10 text-primary mb-2" />
                                    <CardTitle>{d.title}</CardTitle>
                                    <CardDescription>{d.body}</CardDescription>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

EverythingYouNeedSection.displayName = "EverythingYouNeedSection";

export default EverythingYouNeedSection;
