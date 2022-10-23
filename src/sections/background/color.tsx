import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { IBackground } from "../../context/background";

type TSetBackground = (context: "background", value: IBackground) => void
export default function Color({ currentColor, setBackground }: { currentColor: string, setBackground: TSetBackground }) {
    const [preview, setPreview] = useState<IBackground>({
        type: "color",
        value: currentColor.startsWith("#") ? currentColor : "#ffffff",
    });

    return (
        <div className="color">
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.20 } }}
            >Color</motion.p>
            <motion.div className="input-color"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.24 } }}
            >
                <input type="text"
                    name="hex-color"
                    title="hex-color"
                    value={preview.value}
                    onChange={(e: FormEvent<HTMLInputElement>) => setPreview({ ...preview, value: e.currentTarget.value })} />
                <input type="color"
                    name="color-picker"
                    title="color-picker"
                    value={preview.value}
                    onChange={(e: FormEvent<HTMLInputElement>) => setPreview({ ...preview, value: e.currentTarget.value })} />
            </motion.div>
            <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.28 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                onClick={() => setBackground("background", preview)}
            >Apply</motion.button>
        </div>
    );
};