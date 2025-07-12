import { commands } from "@/lib/bindings";
import { parseBibFile } from "bibtex";
import Cite from "citation-js";
import { BibEntryModel } from "@/lib/bindings";

export const syncBib = async (
    bibPath: string,
    cslPath?: string | null
): Promise<
    | {
        status: "error";
        error: unknown;
    }
    | {
        status: "ok";
        data: null;
    }
> => {
    const res = await commands.readUtf8File(bibPath);
    const existingEntries = await commands.getBibEntries(null, {
        per_page: 9999999 as unknown as string,
        page_number: 1 as unknown as string,
    });
    if (res.status === "error") {
        console.error(
            `An error occurred while attempting to read the bibliography at ${bibPath}`
        );
        return {
            status: "error",
            error: res.error,
        };
    }
    let csl_found = false;
    if (cslPath) {
        const cslRes = await commands.readUtf8File(cslPath);
        if (cslRes.status === "error") {
            console.error(
                `An error occurred while attempting to read the csl file at ${cslPath}`
            );
        } else {
            const config = Cite.plugins.config.get("@csl");
            config?.templates.add("user-defined", cslRes.data);
            csl_found = true;
        }
    }

    const citations = new Cite(res.data);
    const parsed = parseBibFile(res.data);
    const ids = citations.getIds() as string[];
    const lowerCaseIds = ids.map((x) => x.toLowerCase());
    const items: BibEntryModel[] = [];
    for (const entry of parsed.entries_raw) {
        const id = entry._id.toLowerCase();
        const existingItem =
            existingEntries.status === "ok"
                ? existingEntries.data.find((x) => x.id === id)
                : null;
        const html_citation = await citations.format("bibliography", {
            format: "html",
            template: csl_found ? "user-defined" : "apa",
            entry: ids[lowerCaseIds.indexOf(entry._id.toLowerCase())],
        });
        // Apply entries in a loop using the getFieldAsString method to avoid any formatting issues.
        const data: Record<string, string> = {};
        for (const entry_key of Object.keys(entry.fields)) {
            data[entry_key as string] = entry.getFieldAsString(entry_key) as string;
        }
        const ctime: string = existingItem
            ? new Date(existingItem.ctime).valueOf().toString()
            : new Date().valueOf().toString();
        items.push({
            id,
            user_provided_id: existingItem ? existingItem.user_provided_id : null,
            ctime,
            // Get rid of the leading superscript so that can be provided independently.
            html_citation: html_citation.replace("<sup>1</sup>", ""),
            data: JSON.stringify(data),
            pdf_path: existingItem ? existingItem.pdf_path : null,
        });
        const syncRes = await commands.syncBib(items);
        if (syncRes.status === "error") {
            console.log(`An error occcurred while syncing your bibliography.`);
        }
    }
    return {
        status: "ok",
        data: null,
    };
};
