export interface IHotkey {
    key: Array<string>;
    action: "toggle" | "open" | "close";
};