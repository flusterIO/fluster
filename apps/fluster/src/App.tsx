import React, { type ReactNode } from "react";
import DesktopScaffold from "./features/scaffold/presentation/desktop_scaffold";

interface AppProps { }

const App = (props: AppProps): ReactNode => {
    return (
        <main className="h-screen w-screen dark text-3xl">
            <DesktopScaffold />
        </main>
    );
};

App.displayName = "App";

export default App;
