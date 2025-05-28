import { staticContent } from "#/core/static_content";
import { FileText, ImageIcon, Pencil, Table, Video, PiIcon } from "lucide-react";
import { MiniFeature } from "./types";

export const allMiniFeatures: MiniFeature[] = [
  {
    title: "Mdx & Markdown",
    desc: (
      <div>
        Write most of your notes in Mdx, a superset of markdown that allows you
        to embed pre-built react components directly in your notes.
      </div>
    ),
    icon: (x) => <Pencil className={x.className} />,
    seeMoreHref: staticContent.links.docs.internal.organization_docs,
  },
  {
    title: "Tabular Data",
    desc: (
      <div>
        With support for tabular data of all sorts (csv, excel, etc.), any
        format that can be interpreted by popular dataframe libraries like
        Polars and Pandas can be utilized by Fluster.
      </div>
    ),
    icon: (x) => <Table className={x.className} />,
    featureKey: "plotting",
  },
  {
    title: "Numerical Data",
    desc: (
      <div>
                {"Use one of our powerful API's to save your numerical data from a Jupyter session or a long running calculation. Save your data however your workflow requires and allow Fluster to pipe this data to interactive plots and LLM's."}
      </div>
    ),
    icon: (x) => <PiIcon className={x.className} />,
    featureKey: "insertDataFromApis",
  },
  {
    title: "Pdf",
    desc: "Use Fluster as your Rust powered personal RAG pipeline. Let Fluster feed your personal notes along side your bibliography to llm's either locally or remotely to organize your notes like never before.",
    icon: (x) => <FileText className={x.className} />,
    featureKey: "bibliography",
  },
  {
    title: "Images",
    desc: "Use the built-in task manager to keep track of your work by project, by assignment, by class, or however you see fit. Embed task lists directly in your notes to take organization to the next level.",
    icon: (x) => <ImageIcon className={x.className} />,
    featureKey: "taskManager",
  },
  {
    title: "Video",
    desc: "Include lecture recordings and embed links to timestamps directly within your mdx notes with syntax that anyone can learn in 20 minutes.",
    icon: (x) => <Video className={x.className} />,
    featureKey: "inputs",
  },
];
