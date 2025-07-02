import { useEffect, useState } from "react";
import { ArrayData, AxisData, MathFunctionProps } from "../types/plot_types";
import { Numpy } from "../../../math/numpy";
import { commands } from "../../../lib/bindings";

const getMathProps = (): MathFunctionProps => {
  return {
    np: () => new Numpy(),
  };
};

export const useAxisData = (data: AxisData): ArrayData | null => {
  const [value, setValue] = useState<ArrayData | null>(null);

  const handleData = async (d: AxisData): Promise<void> => {
    if (Array.isArray(d)) {
      return setValue(d);
    }
    if (typeof d === "function") {
      const res = d(getMathProps());
      if (Array.isArray(res)) {
        return setValue(res);
      } else {
        d = res;
      }
    }
    if ("min" in d) {
      const res = await commands.linspace(d.min, d.max, d.count);
      return setValue(res);
    }
  };

  useEffect(() => {
    handleData(data);
  }, [data]);
  return value;
};
