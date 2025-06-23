import { useEffect, useState } from "react";

export const useMdxContainerSize = () => {
  const [size, setSize] = useState<{ width: number; height: number } | null>();
  const getEm = (): Element | undefined => {
    const ems = document.getElementsByClassName("@container/mdx");
    if (ems.length > 1) {
      console.error(
        "Attempted to get mdx container dimensions but fofund multiple containers with the @container/mdx class applied."
      );
    }
    if (ems.length === 0) {
      console.error(
        "Attempted to get the mdx container size but could not find a container"
      );
      return;
    }
    return ems[0];
  };

  const getSize = (): void => {
    const em = getEm();
    if (em) {
      const rect = em.getBoundingClientRect();
      setSize({
        width: rect.width,
        height: rect.height,
      });
    }
  };

  useEffect(() => {
    getSize();
    const em = getEm();
    if (em) {
      em.addEventListener("resize", getSize);
      return () => em.removeEventListener("resize", getSize);
    }
  }, []);
  return size;
};
