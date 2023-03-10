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
    return isOpen ? (
        <motion.div
            initial={{ y: -650, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-[85%] h-[85%] fixed m-auto inset-0 bg-glass rounded-2xl backdrop-blur min-w-[780px] z-[9999]"
        >
            {children}
        </motion.div>
    ) : (<></>)
};
