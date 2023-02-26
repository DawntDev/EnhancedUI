import { CSSProperties } from "react";
import { ImageB64 } from "./types";

export function useBackground(data: IBackgroundPhoto | IBackgroundColor | IBackgroundGradiente | IBackgroundGallery): CSSProperties
export function useBackground(data: IBackgroundVideo): JSX.Element
export function useBackground(data: BackgroundTypes): CSSProperties | JSX.Element {
    switch (data.type) {
        case "photo": return {};
        case "video": return (<h1>Video</h1>);
        case "color": return {};
        case "gradient": return {
            backgroundImage: `liner-gradient(${data.direction}, ${data.colors.join(", ")})`,
            backgroundSize: "600% 600%",
            animation: `displacement-gradient ${data.seconds}s infinite linear`
        };
        case "gallery": return {
            backgroundImage: `url(\"${data.value}\")`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        };
    };
};


export interface IBackgroundPhoto {
    value: any
    type: "photo"
};
export interface IBackgroundVideo {
    value: any
    type: "video"
};
export interface IBackgroundColor {
    value: any
    type: "color"
};

export interface IBackgroundGradiente {
    colors: Array<any>
    seconds: number
    direction: number
    type: "gradient"
}

export interface IBackgroundGallery {
    value: ImageB64<string>,
    type: "gallery"
};


export type BackgroundTypes =
    IBackgroundPhoto
    | IBackgroundVideo
    | IBackgroundColor
    | IBackgroundGradiente
    | IBackgroundGallery

