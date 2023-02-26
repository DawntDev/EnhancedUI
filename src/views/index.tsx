import Background from "./background/background";
import SearchEngine from "./search-engine";

const views: { [key: string]: JSX.Element } = {
    "General": <></>,
    "Background": <Background />,
    "SearchEngine": <SearchEngine />,
    "InfinityTab": <></>,
    "Connect": <></>
};

export default views;