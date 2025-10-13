import React, { useState, type ReactNode } from "react";
import { ModelViewerElement } from "@google/model-viewer";
import { LoadingComponent } from "@/components/loading_screen";

/* customElements.define("model-viewer", ModelViewerElement); */

interface GltfModelViewProps {
    file: string;
}

export const GltfModelView = (props: GltfModelViewProps): ReactNode => {
    const [data, setData] = useState(null);
    if (data === null) {
        return (
            <div className="w-full flex flex-col justify-center items-center">
                <LoadingComponent />
            </div>
        );
    }
    return (
        <div className="w-full h-fit flex flex-col justify-center items-center">
            <model-viewer></model-viewer>
        </div>
    );
};

GltfModelView.displayName = "GltfModelView";
