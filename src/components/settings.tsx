import { motion, Variants } from "framer-motion";

export default function Settings(
    {
        isOpen,
        children
    }: {
        isOpen: boolean | undefined,
        children: JSX.Element | JSX.Element[]
    }
) {
    const variants: Variants = {
        open: {
            y: 0,
            opacity: 1
        },
        closed: {
            y: -650,
            opacity: 0
        }
    };

    return (
        <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            transition={
                typeof isOpen === "undefined"
                    ? { delay: 0, duration: 0 }
                    : {}
            }
            className={
                "w-[85%] h-[85%] fixed m-auto inset-0 bg-glass rounded-2xl backdrop-blur " +
                (isOpen ? "z-[9999]" : "-z-[9999]")
            }>
            {children}
        </motion.div>
    );
};