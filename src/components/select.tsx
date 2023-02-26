import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { motion, Variants } from "framer-motion";

interface ISelectProps {
    def: string;
    setDef: Dispatch<SetStateAction<string>> | ((value: any) => void);
    options: Array<string>;
}
const selectVariants: Variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function Select({ options, def, setDef }: ISelectProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <motion.div
            className="select"
            initial={false}
            animate={open ? "open" : "closed"}
        >
            <motion.button
                type="button"
                whileTap={{ scale: 0.97, boxShadow: "0 0 0 1px var(--bg-glass)" }}
                onClick={() => setOpen(!open)}
            >
                <motion.p animate={{ opacity: open ? 0 : 1 }}>{def}</motion.p>
                <motion.div
                    className="row"
                    variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}
                >
                    <svg width="15" height="15" viewBox="0 0 20 20">
                        <path d="M0 7 L 20 7 L 10 16" />
                    </svg>
                </motion.div>
            </motion.button>
            <motion.ul
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05,
                        },
                    },
                    closed: {
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3,
                        },
                    },
                }}
                style={{ pointerEvents: open ? "auto" : "none" }}
            >
                {options.map((option: string, i: number) => (
                    <motion.li
                        key={i}
                        variants={selectVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                            setOpen(false);
                            setDef(option);
                        }}
                    >
                        <p>{option}</p>
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
};