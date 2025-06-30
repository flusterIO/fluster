import { BibEntryParsed } from "#/bibliography/data/models/bib_entry_parsed";
import { getPdfUrl } from "#/pdf/data/utils/get_pdf_url";
import { showToast } from "#/toast_notification/data/events/show_toast";
import { BibEntryModel, commands } from "@/lib/bindings";
import { Button, cn } from "@fluster.io/dev";
import { XIcon } from "lucide-react";
import React, { type ReactNode } from "react";
import { NavLink } from "react-router";

interface LinkedPdfBibButtonProps {
    item: BibEntryParsed;
    setItem: (newItem: BibEntryParsed) => void;
    className?: string;
}

interface UpdateBibEntryEventProps {
    item: BibEntryModel;
}

declare global {
    interface WindowEventMap {
        "update-bib-entry": CustomEvent<UpdateBibEntryEventProps>;
    }
}

export const LinkedPdfBibButton = ({
    item,
    setItem,
    className,
}: LinkedPdfBibButtonProps): ReactNode => {
    if (!item.model.pdf_path) {
        return (
            <Button
                className={className}
                onClick={() => {
                    window.dispatchEvent(new CustomEvent("show-link-pdf-modal", {}));
                }}
            >
                Link Pdf
            </Button>
        );
    }

    const clearPdfPath = async (): Promise<void> => {
        const data: BibEntryModel = {
            ...item.model,
            ctime: new Date(item.model.ctime).valueOf().toString(),
            pdf_path: null,
        };
        const res = await commands.saveBibEntries([data]);
        if (res.status === "ok") {
            showToast({
                title: "Success",
                body: "Your pdf file is no longer linked to this bibliography entry",
                variant: "Success",
                duration: 5000,
            });
            window.dispatchEvent(new CustomEvent("request-bib-table-refresh"));
            setItem({
                ...item,
                model: {
                    ...item.model,
                    pdf_path: null,
                },
            });
        } else {
            console.error(
                "An error occurred while removing this link between your pdf and your bib entry."
            );
        }
    };
    return (
        <div
            className={cn(
                "w-full border rounded-lg px-4 py-2 grid grid-cols-[auto_1fr] gap-2 mt-4 bg-secondary text-secondary-foreground"
                /* className */
            )}
        >
            <XIcon
                className="w-4 h-4 place-self-center cursor-pointer"
                onClick={clearPdfPath}
            />
            <NavLink
                to={getPdfUrl(item.model.pdf_path)}
                className="text-sm hover:text-primary cursor-pointer transition-colors duration-300 text-wrap max-w-full break-all"
            >
                {item.model.pdf_path}
            </NavLink>
        </div>
    );
};

LinkedPdfBibButton.displayName = "LinkedPdfBibButton";
