import { Form, GeneralSelectInput, H3 } from "@fluster.io/dev";
import React, { useMemo, type ReactNode } from "react";
import { SettingPageContainer } from "../components/setting_page_container";
import { SettingPageTitle } from "../components/setting_page_title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { plotThemeList } from "#/plot/data/plot_theme_list";
import { useDispatch } from "react-redux";
import { setPlotThemes } from "#/plot/state/slice";
import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
import { PlotlyTheme } from "@/lib/bindings";

const schema = z.object({
    plotDarkTheme: z.string(),
    plotLightTheme: z.string(),
});

const connector = connect((state: AppState) => ({
    currentThemes: state.plot.themes,
}));

export const MathSettingsPage = connector(
    ({
        currentThemes,
    }: {
        currentThemes: AppState["plot"]["themes"];
    }): ReactNode => {
        const form = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
                plotDarkTheme: currentThemes.dark,
                plotLightTheme: currentThemes.light,
            },
        });
        const dispatch = useDispatch();
        form.watch((formState) => {
            dispatch(
                setPlotThemes({
                    dark: (formState.plotDarkTheme ?? currentThemes.dark) as PlotlyTheme,
                    light: (formState.plotLightTheme ??
                        currentThemes.light) as PlotlyTheme,
                })
            );
        });
        const plotThemeItems = useMemo(() => {
            return plotThemeList.map((x) => {
                return {
                    value: x,
                    label: x
                        .replace("_", " ")
                        .split(" ")
                        .map((k) => `${k[0].toUpperCase()}${k.slice(1, k.length)}`)
                        .join(" "),
                };
            });
        }, []);
        return (
            <Form {...form}>
                <SettingPageContainer>
                    <SettingPageTitle title="General Settings" />
                    <H3>Plot Themes</H3>
                    <div className="grid grid-cols-1 @[540px]/settings_page:grid-cols-2 gap-x-8 gap-y-6">
                        <GeneralSelectInput
                            label="Dark Mode"
                            form={form}
                            placeholder="Plot dark theme"
                            name="plotDarkTheme"
                            items={plotThemeItems}
                            classes={{
                                formItem: "w-full min-w-full",
                                selectTrigger: "w-full min-w-full",
                            }}
                        />
                        <GeneralSelectInput
                            label="Light Mode"
                            form={form}
                            placeholder="Plot light theme"
                            name="plotLightTheme"
                            items={plotThemeItems}
                            classes={{
                                formItem: "w-full min-w-full",
                                selectTrigger: "w-full min-w-full",
                            }}
                        />
                    </div>
                </SettingPageContainer>
            </Form>
        );
    }
);

MathSettingsPage.displayName = "MathSettingsPage";
