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
    CardTitle,
    cn,
} from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { requestEquationListRefresh } from "./equation_list_utils";
import { useDispatch } from "react-redux";
import { setPanelLeftOpen } from "#/panel_left/state/slice";
import { NavLink } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";

interface EquationListItemProps {
    item: EquationModel;
}

const EquationListItem = ({ item }: EquationListItemProps): ReactNode => {
    const dispatch = useDispatch();
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

    const handleEditClick = (): void => {
        dispatch(setPanelLeftOpen(true));
    };

    return (
        <Card className="@container/equation_item w-[min(768px,90%)]">
            <CardHeader>
                <CardTitle>
                    <InlineMdxContent mdx={item.label} />
                </CardTitle>
                {item.desc?.length ? (
                    <CardDescription>{item.desc}</CardDescription>
                ) : null}
            </CardHeader>
            <CardContent>
                <MdxContent
                    mdx={formatMathBlockString(item.body)}
                    className="w-full flex flex-col justify-center items-center"
                />
            </CardContent>
            <div className="w-full flex flex-col justify-between items-center gap-4 @[300px]/equation_item:gap-6 @[300px]/equation_item:flex-row mt-4 px-6">
                <Button
                    variant={"destructive"}
                    onClick={() => handleDelete(item.id!)}
                    className="w-full @[300px]/equation_item:w-fit"
                >
                    Delete
                </Button>
                <div className="flex flex-col justify-end items-center gap-4 w-full @[300px]/equation_item:flex-row">
                    <NavLink
                        className={cn(
                            "w-full @[300px]/equation_item:w-fit",
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
                        className="w-full @[300px]/equation_item:w-fit"
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
