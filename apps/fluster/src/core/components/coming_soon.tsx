import React, { type ReactNode } from "react";
import { H1 } from "./typography/typography";

export const ComingSoon = ({
  featureName,
}: {
  /** 'this ${featureName} feature was present...' */
  featureName: string;
}): ReactNode => {
  return (
    <div className="w-fit text-center flex flex-col justify-center items-center">
      <H1>Coming Soon</H1>
      <div className="text-muted-foreground max-w-[540px] mt-4">
        {`This ${featureName} feature was present in the initial web based version of
                Fluster, but it is currently being rewritten in Rust.`}
      </div>
    </div>
  );
};

ComingSoon.displayName = "ComingSoon";
