import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/onboarding": {};
  "/bibliography": {};
  "/dictionary": {};
  "/kanban-boards": {};
  "/embedded_docs": {};
  "/bookmarks": {};
  "/taskLists": {};
  "/settings": {};
  "/equations": {};
  "/mdx-split-view": {};
  "/snippets": {};
  "/mdx/mdx/:id": {
    "id": string;
  };
  "/assets/assets/mathjax": {};
  "/assets/assets/mathjax_fonts": {};
};