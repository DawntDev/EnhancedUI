import { useState, useEffect, createContext } from "react";

import { IBackground } from "./background";
import { IComponent } from "./components";
import { IHotkey } from "./hot-key";
import { IWidget } from "./widget";

interface IContextUI {
    background: IBackground;
    components: Array<IComponent>;
    hotkeys: Array<IHotkey>;
    widgets: Array<IWidget>;
}

type TContextUI = {
    currentUI: IContextUI;

    setUI: (
        context: "background" | "components" | "hotkeys" | "widgets",
        value: IBackground | IComponent | IHotkey | IWidget
    ) => void;

    deleteUI: (
        context: "background" | "components" | "hotkeys" | "widgets",
        value: IBackground | IComponent | IHotkey | IWidget
    ) => void;
};

let defaultUI: IContextUI = localStorage.getItem("ui")
    ? JSON.parse(localStorage.getItem("ui") as string)
    : {
        background: {
            type: "color",
            value: "#ffffff",
        },
        components: [],
        hotkeys: [],
        widgets: [],
    };

const ContextUI = createContext<TContextUI>({
    currentUI: defaultUI,
    setUI: () => { },
    deleteUI: () => { },
});


export const ProviderUI = ({ children }: { children: Array<JSX.Element> | JSX.Element }) => {
    const [currentUI, setCurrentUI] = useState<IContextUI>(defaultUI);

    useEffect(() => {
        const ui = localStorage.getItem("ui");
        if (ui) {
            localStorage.setItem("ui", JSON.stringify(currentUI));
        } else {
            localStorage.setItem("ui", JSON.stringify(defaultUI));
        };
    }, [currentUI]);


    const setUI = (
        context: "background" | "components" | "hotkeys" | "widgets",
        value: IBackground | IComponent | IHotkey | IWidget
    ): void => {
        switch (context) {
            case "background":
                setCurrentUI({
                    ...currentUI,
                    background: value as IBackground,
                });
                break;
            case "components":
                setCurrentUI({
                    ...currentUI,
                    components: [...currentUI.components, value as IComponent],
                });
                break;
            case "hotkeys":
                setCurrentUI({
                    ...currentUI,
                    hotkeys: [...currentUI.hotkeys, value as IHotkey],
                });
                break;
            case "widgets":
                setCurrentUI({
                    ...currentUI,
                    widgets: [...currentUI.widgets, value as IWidget],
                });
                break;
        };
    };

    const deleteUI = (
        context: "background" | "components" | "hotkeys" | "widgets",
        value: IBackground | IComponent | IHotkey | IWidget
    ) => {
        switch (context) {
            case "background":
                setCurrentUI({
                    ...currentUI,
                    background: defaultUI.background,
                });
                break;
            case "components":
                setCurrentUI({
                    ...currentUI,
                    components: currentUI.components.filter((component: IComponent) => component.id !== (value as IComponent).id),
                });
                break;
            case "hotkeys":
                setCurrentUI({
                    ...currentUI,
                    hotkeys: currentUI.hotkeys.filter((hotkey: IHotkey) => hotkey !== value),
                });
                break;
            case "widgets":
                setCurrentUI({
                    ...currentUI,
                    widgets: currentUI.widgets.filter((widget: IWidget) => widget !== value),
                });
                break;
        };
    };

    return (
        <ContextUI.Provider value={{ currentUI, setUI, deleteUI }}>
            {children}
        </ContextUI.Provider>
    );
};

export const ConsumerUI = ContextUI.Consumer;
export default ContextUI;
