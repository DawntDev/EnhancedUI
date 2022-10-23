import { useState } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { motion } from "framer-motion";
import "./menu.css";

interface IMenuProps {
    children: Array<JSX.Element> | JSX.Element;
    theme: boolean;
    themeDispatch: () => void;
};

export default function Menu({
    children,
    theme,
    themeDispatch,
}: IMenuProps): JSX.Element {
    const [option, setOption] = useState<string>("Components"); // element to rendering in the menu
    const sections: { [key: string]: JSX.Element } = Object.fromEntries(
        // Create a object with the children of the menu and the title of the section
        // Example:
        /*
                    {
                        "Home": <Home />,
                        "About": <About />,
                        "Components": <Components />,
                    }
        */
        (Array.isArray(children) ? children : [children]).map(
            (child: JSX.Element) => [child.props.title, child]
        )
    );

    return (
        <motion.div
            id="Menu"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <aside>
                {theme ? (
                    <BsSunFill onClick={themeDispatch} />
                ) : (
                    <BsMoonFill onClick={themeDispatch} />
                )}
                <h1>EnhancedUI</h1>
                <ul>
                    {Object.keys(sections).map((key: string, i: number) => (
                        <li key={i} className={key === option ? "active" : ""}>
                            <motion.button
                                onClick={() => setOption(key)}
                                type="button"
                                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                            >
                                {key}
                            </motion.button>
                        </li>
                    ))}
                </ul>
            </aside>
            {sections[option]}
        </motion.div>
    );
};
