"use client";
import {
    Button,
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    Badge,
} from "@fluster/dev";
import {
    Brain,
    Database,
    BookOpen,
    CheckSquare,
    Kanban,
    Code,
    BarChart3,
    FileText,
    ImageIcon,
    Video,
    FileSpreadsheet,
    Zap,
    Globe,
    Cpu,
    Puzzle,
    Download,
    Github,
    Sparkles,
    Target,
    Users,
} from "lucide-react";
import LandingPageTitle from "./landing_title";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">Fluster</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <a
                            href="#features"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#performance"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Performance
                        </a>
                        <a
                            href="#extensibility"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Extensibility
                        </a>
                        <Button variant="outline" size="sm">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                        </Button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <Badge variant="secondary" className="mb-4">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI-Powered Research Platform
                    </Badge>
                    <LandingPageTitle />
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed"></p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className=""></Button>
                        <Button variant="outline" size="lg">
                            <Video className="w-5 h-5 mr-2" />
                            Watch Demo
                        </Button>
                    </div>
                    <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Globe className="w-4 h-4 mr-2" />
                            Cross-Platform
                        </div>
                        <div className="flex items-center">
                            <Zap className="w-4 h-4 mr-2" />
                            Rust Performance
                        </div>
                        <div className="flex items-center">
                            <Brain className="w-4 h-4 mr-2" />
                            AI-Powered
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Everything You Need for Research
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Comprehensive tools designed specifically for scientific research,
                            academic writing, and collaborative projects.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="border-2 hover:border-emerald-200 transition-colors">
                            <CardHeader>
                                <Brain className="w-10 h-10 text-emerald-600 mb-2" />
                                <CardTitle>AI-Powered RAG</CardTitle>
                                <CardDescription>
                                    Intelligent retrieval augmented generation across all your
                                    research materials
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-emerald-200 transition-colors">
                            <CardHeader>
                                <Database className="w-10 h-10 text-emerald-600 mb-2" />
                                <CardTitle>Vector Database</CardTitle>
                                <CardDescription>
                                    Advanced semantic search and similarity matching for your
                                    notes and documents
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-emerald-200 transition-colors">
                            <CardHeader>
                                <BookOpen className="w-10 h-10 text-emerald-600 mb-2" />
                                <CardTitle>Bibliography Manager</CardTitle>
                                <CardDescription>
                                    Organize citations, references, and generate bibliographies
                                    automatically
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-emerald-200 transition-colors">
                            <CardHeader>
                                <CheckSquare className="w-10 h-10 text-emerald-600 mb-2" />
                                <CardTitle>Task Management</CardTitle>
                                <CardDescription>
                                    Keep track of research tasks, deadlines, and project
                                    milestones
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-emerald-200 transition-colors">
                            <CardHeader>
                                <Kanban className="w-10 h-10 text-emerald-600 mb-2" />
                                <CardTitle>Kanban Boards</CardTitle>
                                <CardDescription>
                                    Visual project management for research workflows and
                                    collaboration
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-emerald-200 transition-colors">
                            <CardHeader>
                                <Code className="w-10 h-10 text-emerald-600 mb-2" />
                                <CardTitle>Jupyter Cells</CardTitle>
                                <CardDescription>
                                    Execute code directly in your notes with interactive
                                    computational cells
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-emerald-200 transition-colors">
                            <CardHeader>
                                <BarChart3 className="w-10 h-10 text-emerald-600 mb-2" />
                                <CardTitle>Interactive Plotting</CardTitle>
                                <CardDescription>
                                    Create dynamic visualizations and charts directly within your
                                    research notes
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-emerald-200 transition-colors">
                            <CardHeader>
                                <FileText className="w-10 h-10 text-emerald-600 mb-2" />
                                <CardTitle>Universal Format Support</CardTitle>
                                <CardDescription>
                                    Import and work with MDX, Markdown, CSV, Excel, PDFs, images,
                                    , videos and more
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-2 hover:border-emerald-200 transition-colors">
                            <CardHeader>
                                <Puzzle className="w-10 h-10 text-emerald-600 mb-2" />
                                <CardTitle>Plugin Ecosystem</CardTitle>
                                <CardDescription>
                                    Extend functionality with APIs in Python, Go, TypeScript,
                                    Rust, and Lua
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Performance Section */}
            <section
                id="performance"
                className="py-20 px-4 bg-gradient-to-r from-gray-50 to-slate-50"
            >
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="outline" className="mb-4">
                                <Cpu className="w-3 h-3 mr-1" />
                                Built with <span className="text-yellow-400">Rust</span>
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Uncompromising Performance
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Built from the ground up in Rust, ScientificNotes delivers
                                blazing-fast performance while maintaining memory safety and
                                reliability. Handle massive datasets, complex computations, and
                                large document collections without breaking a sweat.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                                    <span className="text-gray-700">
                                        Lightning-fast search across millions of documents
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                                    <span className="text-gray-700">
                                        Real-time collaboration without lag
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                                    <span className="text-gray-700">
                                        Minimal memory footprint
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                                    <span className="text-gray-700">
                                        Cross-platform native performance
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                Performance Metrics
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Search Speed</span>
                                        <span className="font-semibold">{"<1ms"}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-emerald-500 h-2 rounded-full w-[95%]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Memory Usage</span>
                                        <span className="font-semibold">{"<50MB"}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-emerald-500 h-2 rounded-full w-[85%]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Startup Time</span>
                                        <span className="font-semibold">{"<500ms"}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-emerald-500 h-2 rounded-full w-[90%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* File Format Support */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Work with Any File Format
                    </h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                        Import, edit, and organize all your research materials in one place.
                        No more switching between different applications.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                        {[
                            { icon: FileText, label: "MDX" },
                            { icon: FileText, label: "Markdown" },
                            { icon: FileSpreadsheet, label: "CSV" },
                            { icon: FileSpreadsheet, label: "TSV" },
                            { icon: FileSpreadsheet, label: "Excel" },
                            { icon: FileText, label: "PDF" },
                            { icon: Video, label: "Video" },
                            { icon: ImageIcon, label: "Images" },
                        ].map((format, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <format.icon className="w-8 h-8 text-emerald-600 mb-2" />
                                <span className="text-sm font-medium text-gray-700">
                                    {format.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Extensibility Section */}
            <section
                id="extensibility"
                className="py-20 px-4 bg-gradient-to-r from-emerald-50 to-teal-50"
            >
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Extend with Powerful APIs
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Build custom plugins and integrations using your favorite
                            programming language. The possibilities are endless.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-6">
                        {[
                            { name: "Python", color: "bg-yellow-500" },
                            { name: "Go", color: "bg-cyan-500" },
                            { name: "TypeScript", color: "bg-blue-500" },
                            { name: "Rust", color: "bg-orange-500" },
                            { name: "Lua", color: "bg-purple-500" },
                        ].map((lang, index) => (
                            <Card
                                key={index}
                                className="text-center hover:shadow-lg transition-shadow"
                            >
                                <CardHeader>
                                    <div
                                        className={`w-12 h-12 ${lang.color} rounded-lg mx-auto mb-3 flex items-center justify-center`}
                                    >
                                        <Code className="w-6 h-6 text-white" />
                                    </div>
                                    <CardTitle className="text-lg">{lang.name}</CardTitle>
                                    <CardDescription>
                                        Full API access for custom plugins and integrations
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Research?
                    </h2>
                    <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of researchers, scientists, and students who have
                        already revolutionized their note-taking and research workflow.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-white text-emerald-600 hover:bg-gray-50"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Download for Free
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-emerald-600"
                        >
                            <Github className="w-5 h-5 mr-2" />
                            View on GitHub
                        </Button>
                    </div>
                    <div className="mt-8 flex flex-wrap justify-center gap-8 text-emerald-100">
                        <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            10,000+ Active Users
                        </div>
                        <div className="flex items-center">
                            <Target className="w-4 h-4 mr-2" />
                            500+ Universities
                        </div>
                        <div className="flex items-center">
                            <Github className="w-4 h-4 mr-2" />
                            Open Source
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                    <Brain className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">
                                    ScientificNotes
                                </span>
                            </div>
                            <p className="text-gray-400">
                                The ultimate note-taking application for scientists,
                                researchers, and students.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        API Reference
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-4">Community</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Discord
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Forum
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Bug Reports
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Feature Requests
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 ScientificNotes. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
