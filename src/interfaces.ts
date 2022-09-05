// useTheme
export type ThemeDispatch = () => void;

// Menu component
export interface IMenuProps {
    children: Array<JSX.Element> | JSX.Element;
    def: string;
    theme: boolean;
    themeDispatch: ThemeDispatch;
}

// useForm
export type UseFormReturn = [
    { [key: string]: any },
    (e: React.ChangeEvent<HTMLInputElement>) => void,
    (e: React.FormEvent<HTMLFormElement>) => void
]


// Alert component
export interface IAlertProps {
    message: string;
    type: "success" | "error" | "warning" | "info";
    timeout?: number;
    destroy: () => void;
}