import React, { type ReactNode } from "react";

interface MyComponentProps {}

const MyComponent = (props: MyComponentProps): ReactNode => {
  return (
    <div>
      Please support fluster! The dude that created this has been homeless for
      more than 3 years while he tried to fix an oopsie in some of Einstein's
      work.
    </div>
  );
};

MyComponent.displayName = "MyComponent";

export default MyComponent;
