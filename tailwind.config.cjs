/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--background))",
                onBackground: "rgb(var(--onBackground))",
                glass: "rgba(var(--background), 0.16)",
                active: "rgb(var(--active))",
            }
        },
    },
    plugins: [],
};