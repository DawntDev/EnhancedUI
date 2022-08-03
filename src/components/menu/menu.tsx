import { useState, cloneElement } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { IMenuProps, IAlertProps } from "../../interfaces";
import Alert from "./alert";
import "./menu.css";

export default function Menu({ children, def, theme, themeDispatch }: IMenuProps): JSX.Element {
    const [option, setOption] = useState<string>(def); // element to rendering in the menu
    const [alerts, setAlerts] = useState<IAlertProps[]>([]); // alerts to rendering in the menu
    const sections: { [key: string]: JSX.Element } = Object.fromEntries(
        ( // Create a object with the children of the menu and the title of the section
            // Example:
            /*
                {
                    "Home": <Home />,
                    "About": <About />,
                    "Components": <Components />,
                }
            */
            Array.isArray(children)
                ?
                children
                :
                [children]
        ).map((child: JSX.Element) => [child.props.title, child])
    );

    return (
        <>
            {Alert({ alerts, setAlerts })}
            <div id="menu">
                <aside>
                    {theme ? <BsSunFill onClick={themeDispatch} /> : <BsMoonFill onClick={themeDispatch} />}
                    <h1>EnhancedUI</h1>
                    <ul>
                        {
                            Object.keys(sections).map((key: string, i: number) => (
                                <li key={i} className={key === option ? "active" : ""}>
                                    <button onClick={() => setOption(key)} type="button">
                                        {key}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </aside>
                <section>
                    {cloneElement(sections[option], { setAlerts })}
                </section>
            </div>
        </>
    );
};