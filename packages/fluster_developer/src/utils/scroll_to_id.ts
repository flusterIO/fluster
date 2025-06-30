export const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
    });
};
