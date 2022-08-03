import React from "react";
import ReactDOM from "react-dom/client";
import EnhancedUI from "./enhanced-ui";
import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <EnhancedUI />
    </React.StrictMode>
);
