import React, { type ReactNode } from "react";
/* import { } from "@/lib/bindings"; */
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@fluster.io/dev";

interface EquationModalProps {
    /* data: EquationModel; */
}

/* RESUME: Come back here and handle this once the various database methods are in order. */
const EquationModal = (props: EquationModalProps): ReactNode => {
    return null;
    /* return ( */
    /*     <Card className="bg-background flex flex-col justify-center items-start @[800px]:flex-row @[800px]:grid @[800px]:grid-cols-[1fr_2fr] w-[min(768px,90%)]"> */
    /*         <CardHeader className="w-full @[800px]:w-fit @[800px]:min-w-[200px]"> */
    /*             <CardTitle>{data.label}</CardTitle> */
    /*             {data.desc?.length ? ( */
    /*                 <CardDescription>{data.desc}</CardDescription> */
    /*             ) : null} */
    /*         </CardHeader> */
    /*         <CardContent className="w-full @[800px]:flex-grow"> */
    /*             <div className="flex flex-col justify-start items-center"> */
    /*                 <CodeBlock */
    /*                     lang={data.lang} */
    /*                     code={data.body} */
    /*                     themes={themes} */
    /*                     darkMode={darkMode} */
    /*                     className="max-h-[400px] overflow-y-auto" */
    /*                 /> */
    /*                 { */
    /*                     <div className="w-full flex flex-row justify-start items-center gap-x-4 gap-y-2 flex-wrap mt-4"> */
    /*                         {data.tags.map((t) => { */
    /*                             return <Badge>{t}</Badge>; */
    /*                         })} */
    /*                     </div> */
    /*                 } */
    /*             </div> */
    /*         </CardContent> */
    /*     </Card> */
    /* ); */
};

EquationModal.displayName = "EquationModal";

export default EquationModal;
