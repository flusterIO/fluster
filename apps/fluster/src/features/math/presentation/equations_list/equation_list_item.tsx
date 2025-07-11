import { formatMathBlockString } from "#/math/data/utils/format_math_string";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { MdxContent } from "#/mdx/presentation/mdx_content";
import { showToast } from "#/toast_notification/data/events/show_toast";
import { commands, EquationModel } from "@/lib/bindings";
import { copyStringToClipboard } from "@/lib/copy_string_to_clipboard";
import {
    Button,
    buttonVariants,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    cn,
    MdxH3,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@fluster.io/dev";
import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { requestEquationListRefresh } from "./equation_list_utils";
import { useDispatch } from "react-redux";
import { setPanelLeftOpen } from "#/panel_left/state/slice";
import { NavLink } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import { secondaryToolTip } from "../../../../styles/classes";
import { useConfirmation } from "#/confirmation_modal/state/hooks/use_confirmation";

interface EquationListItemProps {
    item: EquationModel;
}

const useEquationHasNotes = (equationId: string): boolean => {
    const [hasNotes, setHasNotes] = useState(false);

    const getHasNotes = async (eqId: string): Promise<void> => {
        const res = await commands.getNotesByEquationId(eqId);
        setHasNotes(res.status === "ok" ? res.data.notes.length > 0 : false);
    };

    useEffect(() => {
        getHasNotes(equationId);
    }, [equationId]);

    return hasNotes;
};

const EquationListItem = ({ item }: EquationListItemProps): ReactNode => {
    const confirmationId = "confirm-equation-delete"
    const dispatch = useDispatch();
    const byEquationUrl = useMemo(() => {
        const sp = new URLSearchParams();
        sp.set("by_equation", item.id);
        return `${AppRoutes.search}?${sp.toString()}`;
    }, [item]);
    const hasNotes = useEquationHasNotes(item.id);
    const handleLatexCopy = (): void => {
        copyStringToClipboard(item.body);
        showToast({
            title: "Success",
            body: `Your equation's latex was successfully copied to your clipboard.`,
            duration: 5000,
            variant: "Success",
        });
    };

    const handleDelete = async (id: string): Promise<void> => {
        const res = await commands.deleteEquationById(id);
        if (res.status === "ok") {
            requestEquationListRefresh();
        }
    };

    const confirm = useConfirmation(
        {
            id: confirmationId,
            acceptButtonText: "Delete",
            denyButtonText: "Cancel",
            title: "Are you sure?",
            body: "This will permanently delete this chat.",
            confirmationVariant: "destructive",
        },
        () => {
            handleDelete(item.id).catch(() => {
                showToast({
                    title: "Oh no",
                    body: "Something went wrong while deleting this chat.",
                    variant: "Error",
                    duration: 5000,
                });
            });
        }
    );


    const handleEditClick = (): void => {
        dispatch(setPanelLeftOpen(true));
    };

    return (
        <Card className="@container/equation_item w-[min(768px,90%)]">
            <CardHeader>
                <MdxH3 mdx={item.label} InlineMdxContent={InlineMdxContent} />
                {item.desc?.length ? (
                    <CardDescription className="[&_*]:text-muted-foreground">
                        <InlineMdxContent mdx={item.desc} />
                    </CardDescription>
                ) : null}
            </CardHeader>
            <CardContent>
                <MdxContent
                    mdx={item.body.length ? formatMathBlockString(item.body) : ""}
                    className="hide-math-labels w-full flex flex-col justify-center items-center"
                />
            </CardContent>
            <div className="w-full flex flex-col justify-between items-center gap-4 @[450px]/equation_item:gap-6 @[450px]/equation_item:flex-row mt-4 px-6">
                <Button
                    variant={"destructive"}
                    onClick={() => confirm.setVisible(true)}
                    className="w-full @[450px]/equation_item:w-fit"
                >
                    Delete
                </Button>
                <div className="flex flex-col justify-end items-center gap-4 w-full @[450px]/equation_item:flex-row">
                    {hasNotes ? (
                        <NavLink
                            className={cn(
                                "w-full @[450px]/equation_item:w-fit",
                                buttonVariants({
                                    variant: "outline",
                                })
                            )}
                            to={byEquationUrl}
                        >
                            Notes
                        </NavLink>
                    ) : (
                        <Tooltip>
                            <TooltipContent
                                className={secondaryToolTip}
                                color="hsl(var(--secondary))"
                            >
                                No notes found.
                            </TooltipContent>
                            <TooltipTrigger>
                                <Button
                                    disabled
                                    variant={"outline"}
                                    className={
                                        "w-full @[450px]/equation_item:w-fit cursor-default"
                                    }
                                >
                                    Notes
                                </Button>
                            </TooltipTrigger>
                        </Tooltip>
                    )}
                    <NavLink
                        className={cn(
                            "w-full @[450px]/equation_item:w-fit",
                            buttonVariants({
                                variant: "outline",
                            })
                        )}
                        onClick={handleEditClick}
                        to={`${AppRoutes.equations}?editing=${item.id}`}
                    >
                        Edit
                    </NavLink>
                    <Button
                        className="w-full @[450px]/equation_item:w-fit"
                        onClick={handleLatexCopy}
                    >
                        Copy Latex
                    </Button>
                </div>
            </div>
        </Card>
    );
};

EquationListItem.displayName = "EquationListItem";

export default EquationListItem;
