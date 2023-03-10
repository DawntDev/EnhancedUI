import { Dispatch, SetStateAction } from "react";
import { BsCircleFill } from "react-icons/bs";

export default function NavBar(
    {
        currentView,
        views,
        setView
    }: {
        currentView: string,
        views: string[],
        setView: Dispatch<SetStateAction<string>>
    }
) {
    return (
        <nav className="w-full h-[8%] bg-background rounded-t-2xl block shadow shadow-black">
            <ul className="w-full h-full flex flex-row justify-between">
                <li className="flex justify-center items-center">
                    <BsCircleFill className="circle ml-4" />
                    <BsCircleFill className="circle" />
                    <BsCircleFill className="circle" />
                </li>
                <li className="mx-5 whitespace-nowrap overflow-x-auto">
                    {
                        views.map((el, i) => {
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setView(el)}
                                    className="h-full mx-3"
                                >
                                    <p
                                        className={
                                            "ease-out transition-all text-base " + (
                                                el === currentView
                                                    ? "text-active font-semibold"
                                                    : "text-slate-300"
                                            )
                                        }
                                    >
                                        {el}
                                    </p>
                                </button>
                            )
                        })
                    }
                </li>
            </ul>
        </nav>
    );
};