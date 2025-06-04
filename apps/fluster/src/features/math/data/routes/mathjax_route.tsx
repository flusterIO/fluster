import { commands } from "@/lib/bindings";

interface MathjaxLoaderProps {
    params: {
        sub_path?: string;
    };
}

export async function mathjaxLoader({
    params,
}: MathjaxLoaderProps): Promise<Response> {
    debugger;
    const sub_path = params.sub_path;
    let content = "";
    if (sub_path) {
        const res = await commands.readMathjaxFontFile(sub_path);
        console.log("res: ", res);
        if (res.status === "ok") {
            content = res.data;
        }
    }
    /* const report = await getReport(params.id); */
    /* const pdf = await generateReportPDF(report); */
    return new Response(content, {
        status: 200,
        headers: {
            /* "Content-Type": "font/woff", */
            "Content-Type": "application/javascript",
        },
    });
}
