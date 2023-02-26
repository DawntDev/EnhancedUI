import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

export default function ButtonMenu(
    { text, icon, setOption, currentOption, n = 1 }:
        {
            text: string,
            icon: JSX.Element,
            setOption: Dispatch<SetStateAction<string>>,
            currentOption: string
            n: number
        }
) {
    return (
        <motion.button
            className={
                "w-full px-7 py-4 bg-background leading-none flex items-center justify-center text-slate-50 " +
                (
                    text === currentOption
                        ? "bg-active shadow-lg drop-shadow-md"
                        : "hover:bg-active"
                )
            }
            type="button"
            title={`${text}`}
            initial={{ y: -10 - (n * 100), opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.01, speed: 1 }}
            onClick={() => setOption(text)}
        >

            {icon}
            <p className="ml-2 text-base">{text}</p>

        </motion.button>
    );
};