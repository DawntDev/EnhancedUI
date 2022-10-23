export interface IWidget {
    type: "spotify" | "youtube" | "twitch" |
    "twitter" | "github" | "clock" |
    "weather" | "news" | "calendar" |
    "todo" | "notes" | "calculator";
    position: {
        x: number;
        y: number;
    }

    size: {
        width: number;
        height: number;
    }
};