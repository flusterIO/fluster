import React, { type ReactNode } from "react";
import "@google/model-viewer";
import { LoadingComponent } from "@/components/loading_screen";
import { useBinaryFileUrl } from "@/hooks/use_binary_file_url";

/* customElements.define("model-viewer", ModelViewerElement); */

interface GltfModelViewProps {
    file: string;
    rotate?: boolean;
    height?: number | string;
    alt?: string;
}

export const GltfModelView = (props: GltfModelViewProps): ReactNode => {
    const objectUrl = useBinaryFileUrl(props.file);
    if (objectUrl === null) {
        return (
            <div
                className="w-full flex flex-col justify-center items-center"
                style={{
                    height:
                        typeof props.height === "number" ? `${props.height}px` : props.height,
                }}
            >
                <LoadingComponent />
            </div>
        );
    }
    const _props: Record<string, boolean | string> = {};
    if (props.rotate) {
        _props["auto-rotate"] = true;
    }
    return (
        <div
            className="w-full h-[min(400px,90vh)] flex flex-col justify-center items-center"
            style={{
                height:
                    typeof props.height === "number" ? `${props.height}px` : props.height,
            }}
        >
            <model-viewer
                alt={props.alt}
                src={objectUrl}
                ar
                ar-modes="scene-viewer quick-look"
                camera-controls
                interaction-prompt="none"
                {..._props}
                className="h-full w-full"
            />
        </div>
    );
};

GltfModelView.displayName = "GltfModelView";
