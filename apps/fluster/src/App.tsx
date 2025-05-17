import React, { type ReactNode } from "react";
import DesktopScaffold from "./features/scaffold/presentation/desktop_scaffold";
import { useGlobalKeymap } from "#/keymap/state/hooks/use_global_keymap";

const App = (): ReactNode => {
  useGlobalKeymap();
  return (
    <main className="h-screen w-screen dark">
      <DesktopScaffold />
    </main>
  );
};

App.displayName = "App";

export default App;
