import { commands } from "@/lib/bindings";
import { useKanbanContext, useKanbanDispatch } from "../kanban_provider"
import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { getKanbanBoardData } from "../methods/get_kanban_board_data";



export const useKanbanBoardList = () => {
    const state = useKanbanContext();
    const dispatch = useKanbanDispatch();
    const data = useLoaderData();

    const getData = async (): Promise<void> => {
        const res = await getKanbanBoardData()
    }

    useEffect(() => {

    }, [])

}
