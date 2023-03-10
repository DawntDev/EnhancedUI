import { useState, useEffect, createContext, useContext } from "react";
import { BackgroundTypes, IBackgroundColor } from "./background";
import { ISearchEngine } from "./search-engine";
import { IConnections } from "./connections";

interface IContextUI {
    background: BackgroundTypes,
    searchEngine: ISearchEngine,
    connections: IConnections
};

type TContextUI = {
    currentUI: IContextUI
    setUiProperty: (
        property: "background" | "search-engine" | "connection",
        value: BackgroundTypes | ISearchEngine | IConnections
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
        } as ISearchEngine,
        connections: {
            spotify: false
        } as IConnections
    };

const ContextUI = createContext<TContextUI>({
    currentUI: defaultUI,
    setUiProperty: () => { }
});


export function ProviderUI({ children }: { children: JSX.Element | JSX.Element[] }) {
    const [currentUI, setCurrentUI] = useState<IContextUI>(defaultUI);
    const setUiProperty = (
        property: "background" | "search-engine" | "connection",
        value: BackgroundTypes | ISearchEngine | IConnections
    ) => {
        if (property === "background") {
            setCurrentUI({ ...currentUI, background: value as BackgroundTypes });
        } else if (property === "search-engine") {
            setCurrentUI({ ...currentUI, searchEngine: value as ISearchEngine });
        } else if (property === "connection") {
            setCurrentUI({ ...currentUI, connections: value as IConnections });
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