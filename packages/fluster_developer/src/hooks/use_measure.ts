import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useIsomorphicLayoutEffect } from "./use_isomorphic_effect";

export const useMeasure = <T extends Element>(providedRef?: RefObject<T>) => {
  const ref = useRef<T>(null!);
  const [rect, setRect] = useState<DOMRect | null | undefined>(null);
  const t = providedRef ? providedRef : ref;
  useEffect(() => {
    const rs = new ResizeObserver(() => {
      setRect(t.current?.getBoundingClientRect());
    });
    if (t.current) {
      rs.observe(t.current);
    }
    return () => rs.disconnect();
  }, []);
  return [t, rect] as [MutableRefObject<T>, DOMRect];
};

interface BPObject {
  minWidth?: number;
  maxWidth?: number;
}

interface ElementBreakpointOpts<T extends BPObject, J> {
  /** dom id string of element or a reference to the element itself. */
  em: string | HTMLElement;
  bp: T;
  defaultValue?: J;
}

export const useElementBreakpoint = <T extends BPObject, J>(
  opts: ElementBreakpointOpts<T, J>
) => {
  const [bp, setBp] = useState<boolean | J>(
    typeof opts.defaultValue !== "undefined" ? opts.defaultValue : false
  );

  const handleRect = (rect: DOMRect | DOMRectReadOnly) => {
    if (opts.bp.minWidth && rect.width < opts.bp.minWidth) {
      return setBp(false);
    }
    if (opts.bp.maxWidth && rect.width > opts.bp.maxWidth) {
      return setBp(false);
    }
    setBp(true);
  };

  const handleResize: ResizeObserverCallback = (e) => {
    const rect = e.at(0)?.contentRect;
    if (!rect) {
      return;
    }
    handleRect(rect);
  };

  useIsomorphicLayoutEffect(() => {
    const em =
      typeof opts.em === "string" ? document.getElementById(opts.em) : opts.em;
    if (!em) {
      return;
    }
    const initialRect = em.getBoundingClientRect();
    handleRect(initialRect);
    const observer = new ResizeObserver(handleResize);
    observer.observe(em);
    return () => {
      observer.disconnect();
    };
  }, [opts]);

  return bp;
};
