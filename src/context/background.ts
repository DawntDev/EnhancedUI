export interface IBackground {
    type: "color" | "image" | "gradient";
    repeat?: "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
    fit?: "auto" | "cover" | "contain";
    value: string;
};
