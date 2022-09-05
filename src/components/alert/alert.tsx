// import { createPortal } from "react-dom";
import { useEffect } from "react";
import { IAlertProps } from "../../interfaces";
import "./alert.css";

export default function Alert({ message, type, timeout = 5, destroy }: IAlertProps): JSX.Element {
    useEffect(() => {
        const bar: HTMLElement | null = document.querySelector(".alert > div.bar");

        if (bar) {
            bar.style.transitionDuration = `${timeout - .5}s`;
            setTimeout(() => bar.style.width = "100%", 500);
        };

        setTimeout(() => { 
            document.querySelector(".alert")?.classList.add("hide");
            setTimeout(() => destroy(), 500);
         }, timeout * 1000);
    }, [timeout, destroy]);

    return (
        <div className="alert" typeof={type}>
            <div className="content">
                <div className="type"></div>
                <p>{message}</p>
            </div>
            <div className="bar"></div>
        </div>
    )
};