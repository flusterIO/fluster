import { incrementOnboardingPageIndex } from "#/onboarding/state/actions/onboarding_index_utils";
import {
  useOnboardingStateContext,
  useOnboardingStateDispatch,
} from "#/onboarding/state/onboarding_context";
import { commands } from "@/lib/bindings";
import { buttonVariants, H1 } from "@fluster.io/dev";
import { Button } from "@fluster.io/dev";
import { openUrl } from "@tauri-apps/plugin-opener";
import React, { type ReactNode } from "react";
import { useNavigate } from "react-router";

export const OnboardingNotifyOfModelsDownloading = (): ReactNode => {
  const state = useOnboardingStateContext();
  const dispatch = useOnboardingStateDispatch();
  const nav = useNavigate();
  const handleClick = (): void => {
    commands.beginLanguageModelDownload();
    commands.beginEmbeddingModelDownload();
    incrementOnboardingPageIndex(state.pageIndex, dispatch, nav);
  };

  const openOllamaDocs = (): void => {
    openUrl("https://ollama.com/download");
  };
  return (
    <div className="max-w-[768px] flex flex-col justify-center items-start gap-8 px-8">
      <H1>Local AI</H1>
      <p className="text-muted-foreground">
        Fluster uses Ollama under the hood to manage local AI models. While
        Fluster can be used without this AI functionality, many tasks and more
        advanced features will be non-functional.
      </p>
      <p className="text-muted-foreground">
        If you do not already have Ollama installed, please click below to
        install it for your operating system.
      </p>
      <div className="w-full flex flex-row justify-end items-center gap-4">
        <a
          role="button"
          className={buttonVariants({ variant: "outline" })}
          onClick={openOllamaDocs}
        >
          Install Ollama
        </a>
        <Button onClick={handleClick}>I'm aware</Button>
      </div>
    </div>
  );
};

OnboardingNotifyOfModelsDownloading.displayName =
  "OnboardingNotifyOfModelsDownloading";
