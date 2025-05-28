"use client";

import React, { useState } from "react";
import {
    BookOpen,
    Calculator,
    Code,
    FileText,
    ImageIcon,
    Video,
    Table,
    Plus,
    Search,
    Filter,
    Clock,
    CheckSquare,
    Brain,
    Sparkles,
    TrendingUp,
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
    Progress,
    Input,
} from "@fluster.io/dev";

// Mock data for demonstration
const recentNotes = [
    {
        id: 1,
        title: "Quantum Entanglement Equations",
        type: "equation",
        subject: "Physics",
        topic: "Quantum Mechanics",
        lastModified: "2 hours ago",
        tags: ["quantum", "entanglement", "bell-states"],
    },
    {
        id: 2,
        title: "RNA Sequencing Protocol",
        type: "markdown",
        subject: "Biology",
        topic: "Molecular Biology",
        lastModified: "5 hours ago",
        tags: ["rna", "sequencing", "protocol"],
    },
    {
        id: 3,
        title: "Machine Learning Model Performance",
        type: "table",
        subject: "Computer Science",
        topic: "AI/ML",
        lastModified: "1 day ago",
        tags: ["ml", "performance", "metrics"],
    },
    {
        id: 4,
        title: "Protein Structure Analysis Code",
        type: "code",
        subject: "Bioinformatics",
        topic: "Structural Biology",
        lastModified: "2 days ago",
        tags: ["python", "protein", "structure"],
    },
];

const subjects = [
    { name: "Physics", noteCount: 45, color: "bg-blue-500" },
    { name: "Biology", noteCount: 32, color: "bg-green-500" },
    { name: "Chemistry", noteCount: 28, color: "bg-purple-500" },
    { name: "Computer Science", noteCount: 51, color: "bg-orange-500" },
    { name: "Mathematics", noteCount: 38, color: "bg-red-500" },
    { name: "Bioinformatics", noteCount: 22, color: "bg-teal-500" },
];

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

const getTypeIcon = (type: string) => {
    switch (type) {
        case "equation":
            return <Calculator className="h-4 w-4" />;
        case "code":
            return <Code className="h-4 w-4" />;
        case "markdown":
            return <FileText className="h-4 w-4" />;
        case "image":
            return <ImageIcon className="h-4 w-4" />;
        case "video":
            return <Video className="h-4 w-4" />;
        case "table":
            return <Table className="h-4 w-4" />;
        default:
            return <FileText className="h-4 w-4" />;
    }
};

export function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Research Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Organize your scientific knowledge and accelerate discovery
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search notes, equations, code..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-64"
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* AI Assistant Greeting */}
                <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                                <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                                    Good morning, Dr. Researcher! 🧬
                                </h3>
                                <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                                    I've analyzed your recent notes and found 3 potential
                                    connections between your quantum mechanics and bioinformatics
                                    research. Would you like me to help you explore these
                                    interdisciplinary insights?
                                </p>
                                <div className="mt-3 flex space-x-2">
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
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
                            Quick Create
                        </CardTitle>
                        <CardDescription>
                            Start a new note or research entry
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
                            {[
                                {
                                    type: "equation",
                                    label: "Equation",
                                    icon: Calculator,
                                    color: "bg-blue-500",
                                },
                                {
                                    type: "code",
                                    label: "Code",
                                    icon: Code,
                                    color: "bg-green-500",
                                },
                                {
                                    type: "markdown",
                                    label: "Notes",
                                    icon: FileText,
                                    color: "bg-purple-500",
                                },
                                {
                                    type: "table",
                                    label: "Data",
                                    icon: Table,
                                    color: "bg-orange-500",
                                },
                                {
                                    type: "image",
                                    label: "Image",
                                    icon: ImageIcon,
                                    color: "bg-pink-500",
                                },
                                {
                                    type: "video",
                                    label: "Video",
                                    icon: Video,
                                    color: "bg-red-500",
                                },
                            ].map((item) => (
                                <Button
                                    key={item.type}
                                    variant="outline"
                                    className="h-20 flex-col space-y-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    <div className={`rounded-lg p-2 ${item.color}`}>
                                        <item.icon className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-xs">{item.label}</span>
                                </Button>
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
                                    <Button variant="ghost" size="sm">
                                        View All
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {recentNotes.map((note) => (
                                    <div
                                        key={note.id}
                                        className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                                    >
                                        <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                                            {getTypeIcon(note.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium truncate">{note.title}</h4>
                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <span>{note.subject}</span>
                                                <span>•</span>
                                                <span>{note.topic}</span>
                                                <span>•</span>
                                                <span>{note.lastModified}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {note.tags.slice(0, 3).map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Star className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Research Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <TrendingUp className="mr-2 h-5 w-5" />
                                    Research Progress
                                </CardTitle>
                                <CardDescription>Track your ongoing projects</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Quantum Computing Research</span>
                                        <span>75%</span>
                                    </div>
                                    <Progress value={75} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Protein Folding Analysis</span>
                                        <span>45%</span>
                                    </div>
                                    <Progress value={45} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Machine Learning Models</span>
                                        <span>90%</span>
                                    </div>
                                    <Progress value={90} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Subjects */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Research Subjects
                                </CardTitle>
                                <CardDescription>Organize by field of study</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {subjects.map((subject) => (
                                    <div
                                        key={subject.name}
                                        className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`h-3 w-3 rounded-full ${subject.color}`}
                                            />
                                            <span className="font-medium">{subject.name}</span>
                                        </div>
                                        <Badge variant="secondary">{subject.noteCount}</Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* To-Do List */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <CheckSquare className="mr-2 h-5 w-5" />
                                    Research Tasks
                                </CardTitle>
                                <CardDescription>Keep track of your priorities</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {todoItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`flex items-start space-x-3 rounded-lg border p-3 ${item.completed ? "opacity-60" : ""
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={item.completed}
                                            className="mt-1"
                                            readOnly
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`text-sm ${item.completed ? "line-through" : ""
                                                    }`}
                                            >
                                                {item.text}
                                            </p>
                                            <Badge
                                                variant={
                                                    item.priority === "high"
                                                        ? "destructive"
                                                        : item.priority === "medium"
                                                            ? "default"
                                                            : "secondary"
                                                }
                                                className="mt-1 text-xs"
                                            >
                                                {item.priority}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" className="w-full">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Task
                                </Button>
                            </CardContent>
                        </Card>

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
                                    <span className="font-semibold">216</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        This Week
                                    </span>
                                    <span className="font-semibold">12</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        AI Insights
                                    </span>
                                    <span className="font-semibold">8</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Collaborations
                                    </span>
                                    <span className="font-semibold">3</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
