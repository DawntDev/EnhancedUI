import { useState } from "react";
import { useContextUI } from "../../hooks";
import { motion } from "framer-motion";
import { Title, Select } from "../../components";

import Color from "./color";
import Image from "./image";
import Gradient from "./gradient";
import "./background.css";

export default function Background(props: any) {
    const [type, setType] = useState<string>("color");
    const { currentUI: { background }, setUI } = useContextUI();

    return (
        <section className="background">
            <Title str="Background" />
            <div className="container">
                <div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >Type</motion.p>
                    <Select def={type} setDef={setType} options={[
                        "color",
                        "image",
                        "gradient"
                    ]} />
                </div>
                {type === "color" && (<Color currentColor={background.value} setBackground={setUI} />)}
                {type === "image" && (<Image currentImage={background.value} setBackground={setUI} />)}
                {type === "gradient" && (<Gradient setBackground={setUI} />)}
            </div>
        </section>
    );
};