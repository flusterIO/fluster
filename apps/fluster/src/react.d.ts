// import { ModelViewerElement } from "@google/model-viewer";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            > & {
                src?: string;
                alt?: string;
                poster?: string;
                "shadow-intensity"?: string; // Example prop, add others as needed
                "camera-controls"?: boolean;
                "auto-rotate"?: boolean;
                // ... other model-viewer attributes
            };
        }
    }
}
