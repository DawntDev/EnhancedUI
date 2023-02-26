import { useState, useEffect, useCallback } from "react";
import Settings from "./components/settings";
import NavBar from "./components/nav-bar";
import views from "./views";
import { useContextUI } from "./provider";
import SearchBar from "./components/search-bar";
import { useBackground } from "./provider/background";

export default function EnhancedUI() {
    const [currentView, setCurrentView] = useState<string>("General");
    const [showSetUp, setShowSetUp] = useState<boolean>();
    const { currentUI: { background, searchEngine } } = useContextUI();
    const toggleMenu = useCallback(
        (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === ".") setShowSetUp(!showSetUp);
        },
        [showSetUp]
    );

    useEffect(() => {
        document.addEventListener("keydown", toggleMenu);
        return () => document.removeEventListener("keydown", toggleMenu);
    }, [toggleMenu]);

    return (
        <div id="EnhancedUI" data-theme="dark"
            style={background.type !== "video" ? useBackground(background) : {}}
        >
            <Settings isOpen={showSetUp}>
                <NavBar
                    currentView={currentView}
                    views={Object.keys(views)}
                    setView={setCurrentView}
                />
                {views[currentView]}
            </Settings>
            <SearchBar {...searchEngine}/>
        </div>
    );
};

