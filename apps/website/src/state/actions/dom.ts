export const setHeroVisibility = (shouldShow: boolean) => {
    document
        .getElementById("blobSection")
        ?.classList[shouldShow ? "remove" : "add"]("inactive");
};

export const setTheme = (newTheme: string = "ulld") => {
    document.querySelector("html")?.setAttribute("data-ulld-theme", newTheme);
};

export const applyTableCodeStyles = (parent: HTMLElement = document.body) => {
    parent?.querySelectorAll("td").forEach((em) => {
        const code = em.querySelector("code");
        if (code) {
            const span = document.createElement("span");
            span.innerHTML = em.innerHTML;
            span.classList.value =
                "border text-left [&[align=center]]:text-center [&[align=right]]:text-rightrounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold";
            em.replaceChildren(span);
        }
    });
    return true
};
