import { useEffect, useState } from "react";

export default function useTheme(
    ref: React.RefObject<any>
): [boolean, () => void] {
    const [theme, setTheme] = useState<boolean>(); // false = dark, true = light
    const dispatch = (): void => {
        setTheme(!theme); // change theme  to opposite
        localStorage.setItem("theme", theme ? "dark" : "light"); // save theme to localStorage
    };

    useEffect(() => {
        let { current } = ref;

        if (theme === undefined) {
            // searching for the user preference theme
            let storage: string | null = localStorage.getItem("theme"); // search for theme in localStorage
            let media: boolean = window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches; // search for theme in media query
            storage === "light" || media ? setTheme(true) : setTheme(false); // the theme is applied according to the user's preferences.
        }

        current.setAttribute("data-theme", theme ? "light" : "dark"); // apply theme to the dom
    }, [ref, theme]);

    return [theme || false, dispatch]; // return theme and dispatch function
};
