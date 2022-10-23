import { useEffect, useState, useRef, useCallback } from "react";
import { Menu } from "./components";
import { Account, Background, Components, Configs, HotKeys, Statics } from "./sections";
import { useTheme } from "./hooks";

export default function EnhancedUI() {
    const app = useRef<HTMLDivElement>(null);
    const [theme, changeTheme] = useTheme(app);
    const [menu, setMenu] = useState<boolean>(false);
    const toggleMenu = useCallback(
        (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === ".") setMenu(!menu);
        },
        [menu]
    );

    useEffect(() => {
        document.addEventListener("keydown", toggleMenu);
        return () => document.removeEventListener("keydown", toggleMenu);
    }, [toggleMenu]);

    return (
        <div id="EnhancedUI" ref={app}>
            {menu && (
                <Menu theme={theme} themeDispatch={changeTheme}>
                    <Background title="Background" />
                    <Components title="Components" />
                    <Statics title="Statics" />
                    <HotKeys title="HotKeys" />
                    <Configs title="Configs" />
                    <Account title="Account" />
                </Menu>
            )}
        </div>
    );
};
