import { motion } from "framer-motion";
import { Browsers } from "../provider/search-engine";
import { useContextUI } from "../provider";
import { hex } from "../provider/types";
import Select from "../components/select";

export default function SearchEngine() {
    const { currentUI: { searchEngine }, setUiProperty } = useContextUI();

    return (
        < motion.div className="w-3/4 p-5"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <h3>Search Engine</h3>

            <Select
                def={searchEngine.browser}
                options={Object.keys(Browsers)}
                setDef={(el: any) => setUiProperty("search-engine", { ...searchEngine, browser: el })}
            />

            <input
                type="color"
                name="background-color"
                id="bg-color"
                value={searchEngine.background_color}
                onChange={
                    el => setUiProperty(
                        "search-engine",
                        { ...searchEngine, background_color: el.target.value as hex }
                    )
                }
            />
            <input
                type="color"
                name="text-color"
                id="text-color"
                value={searchEngine.text_color}
                onChange={
                    el => setUiProperty(
                        "search-engine",
                        { ...searchEngine, text_color: el.target.value as hex}
                    )
                }
            />
            <input
                type="range"
                name="acrylic"
                id="acrylic"
                max={100}
                value={searchEngine.acrylic}
                onChange={
                    el => setUiProperty(
                        "search-engine",
                        { ...searchEngine, acrylic: parseInt(el.target.value) }
                    )
                }
            />
        </motion.div >
    );
};