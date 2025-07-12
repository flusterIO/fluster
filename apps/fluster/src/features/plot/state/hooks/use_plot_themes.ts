import { useEffect, useState } from "react";
import { Template } from "plotly.js";
import { commands } from "@/lib/bindings";
import { useSelector } from "react-redux";
import { AppState } from "@/state/initial_state";

export const usePlotThemes = () => {
  const themes = useSelector((state: AppState) => state.plot.themes);
  const [data, setData] = useState<{
    dark: Template;
    light: Template;
  } | null>(null);
  const getThemes = async (): Promise<void> => {
    const resLight = await commands.getPlotlyTheme(themes.light);
    const resDark = await commands.getPlotlyTheme(themes.dark);
    setData({
      dark: JSON.parse(resDark)["template"] as Template,
      light: JSON.parse(resLight)["template"] as Template,
    });
  };
  useEffect(() => {
    getThemes();
    /* eslint-disable-next-line  --  */
  }, [themes]);
  return data;
};
