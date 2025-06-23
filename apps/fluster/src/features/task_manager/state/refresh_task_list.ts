export const refreshTaskList = (listId?: string | null) => {
    window.dispatchEvent(
        new CustomEvent("request-task-list-refresh", {
            detail: {
                id: listId ?? "",
            },
        })
    );
};
