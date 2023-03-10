import Background from "./background/background";
import Connect from "./connect";
import SearchEngine from "./search-engine";

const views: { [key: string]: JSX.Element } = {
    "General": <></>,
    "Background": <Background />,
    "SearchEngine": <SearchEngine />,
    "Header": <></>,
    "InfinityTab": <></>,
    "Connect": <Connect />
};

export default views;