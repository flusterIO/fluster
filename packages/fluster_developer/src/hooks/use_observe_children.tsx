import { ForwardedRef, RefObject, useEffect, useRef, useState } from "react";

export const useObserveChildren = <T extends HTMLElement>(
  cb: (mutations: MutationRecord[]) => void,
  opts?: MutationObserverInit & { once?: boolean },
  providedRef?: RefObject<T> | ForwardedRef<T>
) => {
  const r = useRef<T>(null!);
  const ref = providedRef ? providedRef : r;
  const o = useRef<MutationObserver>(null!);
  const [initial, setInitial] = useState(true);
  useEffect(() => {
    if (ref && "current"! in ref) {
      const observer = new MutationObserver((p) => {
        cb(p);
        setInitial(false);
      });
      o.current = observer;
      if (ref.current) {
        observer.observe(ref.current as HTMLElement, {
          childList: true,
          ...opts,
        });
      }
    }
    return () => {
      if (o.current) {
        o.current.disconnect();
      }
    };
    /* eslint-disable-next-line  --  */
  }, []);
  useEffect(() => {
    if (opts?.once && !initial) {
      o.current?.disconnect();
    }
    /* eslint-disable-next-line  --  */
  }, [initial]);

  return ref;
};
