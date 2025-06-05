"use client";
import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  ExternalLink,
  BookOpen,
  Calendar,
  Users,
  Tag,
} from "lucide-react";
import {
  Table,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@fluster.io/dev";

const bibliographyData = [
  {
    id: 1,
    title:
      "CRISPR-Cas9 gene editing: A revolutionary tool for precision medicine",
    authors: ["Zhang, F.", "Sander, J.D.", "Maeder, M.L."],
    journal: "Nature Biotechnology",
    year: 2023,
    doi: "10.1038/nbt.2675",
    citations: 1247,
    tags: ["Gene Editing", "CRISPR", "Precision Medicine"],
    dateAdded: "2024-01-15",
    type: "Journal Article",
  },
  {
    id: 2,
    title: "Machine learning applications in drug discovery and development",
    authors: ["Chen, H.", "Engkvist, O.", "Wang, Y.", "Olivecrona, M."],
    journal: "Drug Discovery Today",
    year: 2023,
    doi: "10.1016/j.drudis.2023.103472",
    citations: 892,
    tags: ["Machine Learning", "Drug Discovery", "AI"],
    dateAdded: "2024-01-12",
    type: "Review Article",
  },
  {
    id: 3,
    title: "Climate change impacts on global biodiversity patterns",
    authors: ["Smith, A.B.", "Johnson, C.D.", "Williams, E.F."],
    journal: "Science",
    year: 2023,
    doi: "10.1126/science.abc1234",
    citations: 2156,
    tags: ["Climate Change", "Biodiversity", "Ecology"],
    dateAdded: "2024-01-10",
    type: "Research Article",
  },
  {
    id: 4,
    title: "Quantum computing algorithms for optimization problems",
    authors: ["Kumar, R.", "Patel, S.", "Anderson, M."],
    journal: "Physical Review Letters",
    year: 2023,
    doi: "10.1103/PhysRevLett.130.123456",
    citations: 634,
    tags: ["Quantum Computing", "Optimization", "Algorithms"],
    dateAdded: "2024-01-08",
    type: "Journal Article",
  },
  {
    id: 5,
    title: "Advances in renewable energy storage technologies",
    authors: ["Liu, X.", "Brown, K.L.", "Davis, R.M."],
    journal: "Energy & Environmental Science",
    year: 2023,
    doi: "10.1039/d2ee01234a",
    citations: 1089,
    tags: ["Renewable Energy", "Energy Storage", "Sustainability"],
    dateAdded: "2024-01-05",
    type: "Review Article",
  },
  {
    id: 6,
    title: "Neuroplasticity mechanisms in learning and memory",
    authors: ["Thompson, J.R.", "Garcia, M.A.", "Lee, S.H."],
    journal: "Nature Neuroscience",
    year: 2023,
    doi: "10.1038/s41593-023-01234-5",
    citations: 756,
    tags: ["Neuroscience", "Learning", "Memory", "Plasticity"],
    dateAdded: "2024-01-03",
    type: "Research Article",
  },
];

export default function BibliographyPageContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const filteredData = bibliographyData.filter((entry) => {
    const matchesSearch =
      searchTerm === "" ||
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.authors.some((author) =>
        author.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      entry.journal.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag === "" || entry.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(bibliographyData.flatMap((entry) => entry.tags))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Research Bibliography</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your scientific references
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Entries</p>
                  <p className="text-2xl font-bold">
                    {bibliographyData.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Citations
                  </p>
                  <p className="text-2xl font-bold">
                    {bibliographyData
                      .reduce((sum, entry) => sum + entry.citations, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">This Year</p>
                  <p className="text-2xl font-bold">
                    {
                      bibliographyData.filter((entry) => entry.year === 2023)
                        .length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Unique Tags</p>
                  <p className="text-2xl font-bold">{allTags.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Search & Filter</CardTitle>
            <CardDescription>
              Find specific bibliography entries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, author, or journal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="min-w-[120px]">
                    <Filter className="h-4 w-4 mr-2" />
                    {selectedTag || "All Tags"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Filter by Tag</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedTag("")}>
                    All Tags
                  </DropdownMenuItem>
                  {allTags.map((tag) => (
                    <DropdownMenuItem
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Bibliography Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bibliography Entries</CardTitle>
            <CardDescription>
              Showing {filteredData.length} of {bibliographyData.length} entries
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Title & Authors</TableHead>
                    <TableHead>Journal</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Citations</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="space-y-1">
                          <h4 className="font-medium leading-tight">
                            {entry.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {entry.authors.join(", ")}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {entry.type}
                            </Badge>
                            <span>Added {entry.dateAdded}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{entry.journal}</p>
                          <p className="text-xs text-muted-foreground">
                            DOI: {entry.doi}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{entry.year}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">
                            {entry.citations.toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {entry.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{entry.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                •••
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Entry</DropdownMenuItem>
                              <DropdownMenuItem>
                                Add to Collection
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Export Citation
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Delete Entry
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
