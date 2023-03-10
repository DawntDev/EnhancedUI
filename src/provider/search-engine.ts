import { hex } from "./types";

export type TBrowsers = "Google" | "Bing" | "Yahoo" | "DuckDuckGo" | "You";
export const Browsers: {[key in TBrowsers]: string} = {
    Google: "https://www.google.com/search?q=",
    Bing: "https://www.bing.com/search?q=",
    Yahoo: "https://search.yahoo.com/search?p=",
    DuckDuckGo: "https://duckduckgo.com/?q=",
    You: "https://you.com/search?q="
};


export interface ISearchEngine {
    browser: TBrowsers
    background_color: hex
    text_color: hex
    acrylic: number
};
