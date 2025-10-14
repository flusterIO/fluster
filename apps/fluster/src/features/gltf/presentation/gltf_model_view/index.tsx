import React, { type ReactNode } from "react";
import "@google/model-viewer";
import { LoadingComponent } from "@/components/loading_screen";
import { useBinaryFileUrl } from "@/hooks/use_binary_file_url";

/* customElements.define("model-viewer", ModelViewerElement); */

interface GltfModelViewProps {
    file: string;
}

export const GltfModelView = (props: GltfModelViewProps): ReactNode => {
    const objectUrl = useBinaryFileUrl(props.file);
    if (objectUrl === null) {
        return (
            <div className="w-full flex flex-col justify-center items-center">
                <LoadingComponent />
            </div>
        );
    }
    return (
        <div className="w-full h-fit min-h-[400px] flex flex-col justify-center items-center">
            <model-viewer src={objectUrl}></model-viewer>
        </div>
    );
};

GltfModelView.displayName = "GltfModelView";
