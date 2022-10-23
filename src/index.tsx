import React from "react";
import ReactDOM from "react-dom/client";
import EnhancedUI from "./enhanced-ui";
import { ProviderUI } from "./context";
import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <ProviderUI>
            <EnhancedUI />
        </ProviderUI>
    </React.StrictMode>
);
