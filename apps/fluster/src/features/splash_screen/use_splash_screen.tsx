import { commands } from "@/lib/bindings";
import { useEffect, useState } from "react";

export const useSplashScreen = (delay = 3000) => {
    const [splashVisible, setSplashVisible] = useState(true);
    const hideSplash = async (): Promise<void> => {
        if (splashVisible) {
            await commands.hideSplashScreen();
            setSplashVisible(false);
        }
    };
    useEffect(() => {
        hideSplash();
    }, []);
};
