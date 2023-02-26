import { useState, useEffect, createContext, useContext } from "react";
import { BackgroundTypes, IBackgroundColor } from "./background";
import { SearchEngine } from "./search-engine";

interface IContextUI {
    background: BackgroundTypes,
    searchEngine: SearchEngine
};

type TContextUI = {
    currentUI: IContextUI
    setUiProperty: (
        property: "background" | "search-engine",
        value: BackgroundTypes | SearchEngine
    ) => void
};

let defaultUI: IContextUI = localStorage.getItem("context-ui")
    ? JSON.parse(localStorage.getItem("context-ui") as string)
    : {
        background: {
            value: "#ffffff",
            type: "color"
        } as IBackgroundColor,
        searchEngine: {
            browser: "Google",
            background_color: "#000000",
            text_color: "#F8FAFC",
            acrylic: 65
        } as SearchEngine
    };

const ContextUI = createContext<TContextUI>({
    currentUI: defaultUI,
    setUiProperty: () => { }
});


export function ProviderUI({ children }: { children: JSX.Element | JSX.Element[] }) {
    const [currentUI, setCurrentUI] = useState<IContextUI>(defaultUI);
    const setUiProperty = (
        property: "background" | "search-engine",
        value: BackgroundTypes | SearchEngine
    ) => {
        if (property === "background") {
            setCurrentUI({ ...currentUI, background: value as BackgroundTypes })
        } else if(property === "search-engine") {
            setCurrentUI({...currentUI, searchEngine: value as SearchEngine})
        };

    };

    useEffect(() => localStorage.setItem("context-ui", JSON.stringify(currentUI)), [currentUI]);

    return (
        <ContextUI.Provider value={{ currentUI, setUiProperty }}>
            {children}
        </ContextUI.Provider>
    );
};

export function useContextUI() {
    return useContext(ContextUI);
};