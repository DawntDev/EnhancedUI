export type rgb = `${number},${number},${number}`;
export type hex = `#${string}`;
export type ImageB64<imageType extends string> = `data:image/${imageType};base64${string}`;