/* eslint-disable  @typescript-eslint/no-explicit-any  --  */
import React, { FC } from "react";
import {
    Tag,
    Admonition,
    Ul,
    Hint,
    Hl,
    QrCode,
    BlockQuote,
    ColorSwatch,
    EmbeddableCard,
    type QrCodeProps,
    ColorPalette,
    InlineCitation,
    Small,
    Grid,
    GridItem,
    MdxInput,
    Abstract,
    Div,
    EqRef,
    DictionaryEntry,
    EquationTag,
    AppRoute,
    Blockquote,
    H1,
    H2,
    H3,
    H4,
    P,
    AnchorTag,
    VideoTimestampLink,
    AudioTimestampLink,
    Center,
    Youtube,
} from "@fluster.io/dev";
import { MDXComponents } from "mdx/types";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { commands } from "@/lib/bindings";
import { WrappedCodeBlock } from "#/mdx/presentation/wrapped_components/code";
import { ScatterPlot } from "#/plot/presentation/plots/2d/scatter_plot/index";
import { LinePlot } from "#/plot/presentation/plots/2d/line_plot/index";
import { PlotRef } from "#/plot/utils/plot_ref";
import { PieChart } from "#/plot/presentation/plots/2d/pie_chart/index";
import { SurfacePlot } from "#/plot/presentation/plots/3d/surface_plot/index";
import { LinePlot3d } from "#/plot/presentation/plots/3d/line_plot/index";
import { ScatterPlot3d } from "#/plot/presentation/plots/3d/scatter_plot/index";
import { PlotBareAss } from "#/plot/presentation/plots/bare_ass";
import { WrappedVideoComponent } from "#/mdx/presentation/wrapped_components/video";
import { WrappedAudioComponent } from "#/mdx/presentation/wrapped_components/audio";
import { WrappedImage } from "#/mdx/presentation/wrapped_components/image";
import { WrappedTaskList } from "#/mdx/presentation/wrapped_components/task_list";
import { JupyterCell } from "#/jupyter/presentation/cell";

interface ComponentMapItem {
    /// A regex that will return true if this component is to be included in the component map. This will be prepended with a `<`, so the name should match the component as it will be used in the user's note.
    query: string | string[];
    component: FC<any>;
    requiresInlineMdx?: boolean;
}

export const componentOverrides: MDXComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    p: P,
    blockquote: BlockQuote,
    mark: Hl,
    pre: WrappedCodeBlock,
    a: AnchorTag,
    /* hr: Hr, */
    /* a: A, */
    input: MdxInput,
    /* img: ImgComponent as any, */
};

const items: ComponentMapItem[] = [
    // -- Utility --
    {
        query: "Div",
        component: Div,
    },
    {
        query: "EqRef",
        component: EqRef,
    },
    {
        query: "TaskList",
        component: WrappedTaskList,
    },
    // -- Academic --
    {
        query: "Abstract",
        component: Abstract,
    },
    //    -- Plots --
    {
        query: "Plot",
        component: PlotBareAss,
    },
    {
        query: "ScatterPlot",
        component: ScatterPlot,
    },
    {
        query: "LinePlot",
        component: LinePlot,
    },
    {
        query: "PieChart",
        component: PieChart,
    },
    {
        query: "PieChart",
        component: PieChart,
    },
    //     -- 3d --
    {
        query: "SurfacePlot",
        component: SurfacePlot,
    },
    {
        query: "LinePlot3d",
        component: LinePlot3d,
    },
    {
        query: "ScatterPlot3d",
        component: ScatterPlot3d,
    },
    //    -- Plot Utils --
    {
        query: "PlotRef",
        component: PlotRef,
    },
    // -- Layout --
    {
        query: "Admonition",
        component: Admonition,
        requiresInlineMdx: true,
    },
    {
        query: "Card",
        component: EmbeddableCard,
        requiresInlineMdx: true,
    },
    {
        query: "Grid",
        component: Grid,
    },
    {
        query: "GridItem",
        component: GridItem,
    },
    {
        query: "Center",
        component: Center,
    },
    // -- Text --
    {
        query: "Small",
        component: Small,
    },
    // -- Attention Getters --
    {
        query: "Hint",
        component: Hint,
    },
    {
        query: "Ul",
        component: Ul,
    },
    {
        query: "Hl",
        component: Hl,
    },
    {
        query: "Quote",
        component: Blockquote,
    },
    // -- Media --
    {
        query: "Video",
        component: WrappedVideoComponent,
    },
    {
        query: "Audio",
        component: WrappedAudioComponent,
    },
    {
        query: "Image",
        component: WrappedImage,
    },
    {
        query: ["Youtube", "YouTube"],
        component: Youtube,
    },
    {
        query: ["Cell", "JupyterCell"],
        component: JupyterCell,
    },
    // -- Less Commonly Used Components --
    {
        query: "Qr",
        component: (props: QrCodeProps) => (
            <QrCode {...props} getQrCodeSvg={commands.getQrCodeSvg} />
        ),
    },
    {
        query: "Color",
        component: ColorSwatch,
    },
    {
        query: "ColorPalette",
        component: ColorPalette,
    },
    // -- Auto Inserted --
    {
        query: "InlineCitation",
        component: InlineCitation,
    },
    {
        query: "Tag",
        component: Tag,
    },
    {
        query: "DictionaryEntry",
        component: DictionaryEntry,
    },
    {
        query: "EquationTag",
        component: EquationTag,
    },
    {
        query: "VideoTimestampLink",
        component: VideoTimestampLink,
    },
    {
        query: "AudioTimestampLink",
        component: AudioTimestampLink,
    },
    // -- Documentation Only --
    {
        query: "AppRoute",
        component: AppRoute,
    },
];

export const getComponentMap = (mdxContent: string): MDXComponents => {
    const components: MDXComponents = componentOverrides;
    for (const item of items) {
        for (const query of Array.isArray(item.query) ? item.query : [item.query]) {
            const isIncluded = mdxContent.includes(`<${query}`);
            if (isIncluded) {
                const C = item.component;
                const props = {
                    InlineMdxContent: item.requiresInlineMdx
                        ? InlineMdxContent
                        : undefined,
                };
                components[query] = (_props: object) => <C {...props} {..._props} />;
            }
        }
    }
    return components;
};
