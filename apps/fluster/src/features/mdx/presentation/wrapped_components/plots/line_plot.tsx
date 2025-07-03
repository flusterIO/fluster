import { type ReactNode } from "react";

export const WrappedLinePlot = (
    props: object
    /* props: Omit<LinePlotProps, "darkMode" | "InlineMdxContent"> */
): ReactNode => {
    console.log("props: ", props);
    /* const darkMode = useDarkMode(); */
    return null;
    /* return ( */
    /*     <LinePlotComponent */
    /*         darkMode={darkMode} */
    /*         InlineMdxContent={InlineMdxContent} */
    /*         {...props} */
    /*     /> */
    /* ); */
};

WrappedLinePlot.displayName = "WrappedLinePlot";
