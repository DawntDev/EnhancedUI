import { motion } from "framer-motion";
import "./title.css";

export default function Title({ str }: { str: string }): JSX.Element {
    return (
        <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
        >{str}</motion.h2>
    );
};