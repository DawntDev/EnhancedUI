export interface IComponent {
    type: "label" | "button"
    id: string;
    position: {
        x: number;
        y: number;
    }
    size: {
        width: number;
        height: number;
    }
    content: string;
};
