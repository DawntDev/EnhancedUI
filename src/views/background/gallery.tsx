import Compressor from 'compressorjs';
import { motion } from "framer-motion";
import { useContextUI } from "../../provider";
import { ImageB64 } from "../../provider/types";
import { ChangeEvent, useState } from "react";

export default function BGGallery() {
    const { currentUI: { background }, setUiProperty } = useContextUI();
    const [isClickable, setIsClickable] = useState<boolean>(false)
    const [onHover, setOnHover] = useState<boolean>(false);
    const [preview, setPreview] = useState<ImageB64<string>>(
        background.type === "gallery"
            ? background["value"]
            : "" as ImageB64<string>
    );
    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const file: File = event.currentTarget.files![0];
        const width: number = window.screen.width;
        const height: number = window.screen.height;

        new Compressor(file, {
            width: width,
            height: height,
            convertSize: 4000000,
            quality: 0.9,
            success(result) {
                let reader = new FileReader();
                reader.readAsDataURL(result);
                reader.onload = () => {
                    setPreview(reader.result as ImageB64<string>)
                    setIsClickable(true)
                };
            },

            error(error) {
                console.log(error)
            },
        })
    };


    const icon = {
        hidden: {
            pathLength: 0,
            fill: "rgba(255, 255, 255, 0)"
        },
        visible: {
            pathLength: 1,
            fill: "rgba(255, 255, 255, 1)"
        }
    }

    return (
        <motion.div className="w-3/4 p-5"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <div className="flex items-center justify-center outline-dashed outline-2 w-3/4 h-4/6 m-auto mt-8 text-center">
                {
                    background.type === "gallery" || preview
                        ? <button
                            className={
                                "w-full h-full relative flex justify-center items-center focus:border-none " + (
                                    isClickable || "cursor-default"
                                )
                            }
                            onMouseEnter={() => setOnHover(true)}
                            onMouseLeave={() => setOnHover(false)}
                            onClick={() => {
                                setUiProperty("background", {
                                    "type": "gallery",
                                    "value": preview
                                })
                                setIsClickable(false)
                                setOnHover(false)
                            }}>
                            <svg className="absolute z-20" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg">
                                <motion.path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"
                                    variants={icon}
                                    initial="hidden"
                                    animate={onHover && isClickable ? "visible" : "hidden"}
                                />
                            </svg>
                            {onHover && isClickable && <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full h-full absolute bg-glass backdrop-blur z-10"></motion.div>}
                            <div
                                className="w-full h-full block"
                                style={
                                    {
                                        backgroundImage: `url(\"${preview}\")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center"
                                    }

                                }
                            ></div>
                        </button>
                        : <span className="text-black font-light text-base">
                            Preview
                        </span>
                }
            </div>

            <div className="mt-10">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                <input className="w-full file:text-sm file:mr-6 file:h-10 file:text-gray-50
                file:bg-active file:border-none rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-black dark:placeholder-gray-400" id="file_input" type="file" onChange={onChange} accept=".jpg, .jpeg, .png" />
            </div>
        </motion.div>
    );
};