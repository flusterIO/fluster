import { Button, H3 } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

export const NoTaskNoteBanner = ({
  handleCreateNote,
}: {
  handleCreateNote: () => Promise<void>;
}): ReactNode => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center gap-4">
      <H3>No Note</H3>
      <Button onClick={handleCreateNote}>Create Note</Button>
    </div>
  );
};

NoTaskNoteBanner.displayName = "NoTaskNoteBanner";
