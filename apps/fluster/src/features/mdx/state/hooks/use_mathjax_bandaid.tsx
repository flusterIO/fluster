import { useEffect } from "react";

export const mathjaxMutationObserver = () =>
    new MutationObserver((mutations) => {
        for (const m of mutations) {
            if (m.type === "childList") {
                m.target.parentElement
                    ?.querySelectorAll("[classname]")
                    .forEach((el) => {
                        el.classList.value = el.getAttribute("classname") || "";
                        el.removeAttribute("classname");
                    });
            }
        }
    });

export const applyMathjaxBandaid = (
    element: string | React.RefObject<HTMLElement>
) => {
    let em =
        typeof element === "string"
            ? document.getElementById(element)
            : element.current;
    if (!em) return;
    let observer = mathjaxMutationObserver();
    // WITH_WIFI: Improve this SIGNIFICANTLY. Look up the necessary properties to find just the classname attribute that's applied mistakenly by the parser.
    // TODO: Keep attributes field but make others dependent on a prop.
    observer.observe(em, {
        subtree: true, // Modifications to child nodes. Only has an effect if childList is true.
        childList: true, // Addition and removal of child nodes.
        attributes: true, // Just added (10-15-24). Make sure this doesn't cause any issues. attributeFilter was already present, but shouldn't have any effect unless attributes is also true.
        attributeFilter: ["classname"],
    });
    em.querySelectorAll("[classname]").forEach((el) => {
        el.classList.value = el.getAttribute("classname") || "";
        el.removeAttribute("classname");
    });
    return observer;
};

export const useMathjaxBandaid = (
    element: string | React.RefObject<HTMLElement>
) => {
    useEffect(() => {
        const observer = applyMathjaxBandaid(element);
        return () => {
            if (observer && "disconnect" in observer) {
                observer?.disconnect();
            }
        };
    }, [element]);
};

export const ApplyMathjaxBandaid = ({
    container,
}: {
    container: string | React.RefObject<HTMLElement>;
}) => {
    useMathjaxBandaid(container);
    return null;
};
