import MdxNotePage from "#/mdx/presentation/mdx_note_page";
import React, { type ReactNode } from "react";
import { useLoaderData } from "react-router";

const EmbeddedDocsByIdPage = (): ReactNode => {
  const data = useLoaderData();
  return <MdxNotePage content={data?.content ?? ""} />;
};

EmbeddedDocsByIdPage.displayName = "EmbeddedDocsByIdPage";

export default EmbeddedDocsByIdPage;
