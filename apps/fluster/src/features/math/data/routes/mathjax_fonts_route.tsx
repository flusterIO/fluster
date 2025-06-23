import { commands } from "@/lib/bindings";

interface MathjaxFontLoaderProps {
    params: {
        font_path?: string;
    };
}

export async function mathjaxFontLoader({
    params,
}: MathjaxFontLoaderProps): Promise<Response> {
    debugger;
    const sub_path = params.font_path;
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
            "Content-Type": "application/font-woff",
        },
    });
}
