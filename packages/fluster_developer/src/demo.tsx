import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

const DemoAndTestingPage = (): ReactNode => {
    return <div>Demo Page</div>;
};

DemoAndTestingPage.displayName = "DemoAndTestingPage";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <DemoAndTestingPage />
    </StrictMode>
);
