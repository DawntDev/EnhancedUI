import { useCallback, useEffect, useRef } from "react";
import { Browsers, ISearchEngine, } from "../provider/search-engine";
import { BiSearch } from "react-icons/bi";

export default function SearchBar(
    {
        browser,
        background_color,
        text_color,
        acrylic
    }: ISearchEngine
) {
    const input = useRef<HTMLInputElement>(null);
    const search = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                let value = input.current?.value;
                if (typeof value === "string" && value !== "") {
                    input.current!.value = ""
                    window.location.href = Browsers[browser] + value.replace(" ", "+");
                };
            };
        },
        [browser]
    );

    useEffect(() => {
        document.addEventListener("keydown", search);

        return () => document.removeEventListener("keydown", search);
    }, [browser]);

    return (
        <>
            <div className="relative flex items-center w-[40rem] h-12 m-auto top-[calc(50%+3rem)]">
                <input
                    type="text"
                    id="search-bar"
                    ref={input}
                    autoComplete="off"
                    className={
                        "absolute w-full h-full rounded-lg pl-12 pr-4 focus:outline-none text-base " + (
                            acrylic !== 1
                                ? "backdrop-blur"
                                : ""
                        )
                    }
                    style={{
                        backgroundColor: acrylic !== 1 && acrylic !== 0
                            ? background_color + (((acrylic / 100) * 255) | 1 << 8).toString(16).slice(1)
                            : background_color,
                        color: text_color
                    }}
                />
                <BiSearch
                    className="w-12 h-6 relative top-[calc(50%-1.5rem])"
                    style={{ fill: text_color }}
                />
            </div>
        </>
    );
};