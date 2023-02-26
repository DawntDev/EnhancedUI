import { BiImage, BiVideo } from "react-icons/bi";
import { IoColorFilterOutline } from "react-icons/io5";
import { RiGalleryLine } from "react-icons/ri";
import { useState } from "react";
import BGPhoto from "./photo"
import ButtonMenu from "../../components/button-menu";
import BGGallery from "./gallery";

export default function Background() {
    const [currentOption, setCurrentOption] = useState<string>("Photo")
    const options = [
        { text: "Photo", icon: <BiImage className="fill-slate-50 w-5 h-5" /> },
        { text: "Video", icon: <BiVideo className="fill-slate-50 w-5 h-5" /> },
        { text: "Color", icon: <IoColorFilterOutline className="fill-slate-50 w-5 h-5" /> },
        { text: "Gallery", icon: <RiGalleryLine className="fill-slate-50 w-5 h-5" /> }
    ]


    return (
        <div className="w-full h-[92%] flex flex-row">
            <aside
                className="w-1/4 bg-onBackground rounded-bl-2xl">
                <ul className="first:first:border-t first:first:border-t-gray-600">
                    {
                        options.map((el, i) => {
                            return (<li key={i}>
                                <ButtonMenu {
                                    ...{
                                        ...el,
                                        setOption: setCurrentOption,
                                        currentOption: currentOption,
                                        n: i
                                    }
                                }
                                />
                            </li>
                            )
                        })
                    }
                </ul>
            </aside>
            {
                {
                    "Photo": <BGPhoto />,
                    "Video": <></>,
                    "Color": <></>,
                    "Gallery": <BGGallery />

                }[currentOption]
            }

        </div>
    );
};