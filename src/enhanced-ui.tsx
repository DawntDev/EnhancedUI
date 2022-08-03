import { useEffect, useState, useRef } from "react";
import { Menu } from "./components";
import { About, Components, Configs, HotKeys, Statics } from "./sections";
import { useTheme } from "./hooks";

export default function EnhancedUI() {
    const app = useRef<HTMLDivElement>(null);
    const [theme, changeTheme] = useTheme(app);
    const [menu, setMenu] = useState<boolean>(false);

    useEffect(() => {
        document.onkeyup = (e: globalThis.KeyboardEvent): void => {
            if ((e.ctrlKey && e.key === ".") || (e.key === "Escape" && menu)) {
                setMenu(!menu);
            };
        };
        return () => { document.onkeyup = null; };
    }, [menu]);

    return (
        <div id="EnhancedUI" ref={app}>
            {
                menu &&
                <Menu def="Components" theme={theme} themeDispatch={changeTheme} >
                    <Components title="Components" />
                    <Statics title="Statics" />
                    <HotKeys title="HotKeys" />
                    <Configs title="Configs" />
                    <About title="About" />
                </Menu>
            }
        </div>
    );
};
