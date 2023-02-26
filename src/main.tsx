import React from "react";
import ReactDOM from "react-dom/client";
import EnhancedUI from "./enhanced-ui";
import { ProviderUI } from "./provider";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ProviderUI>
            <EnhancedUI />
        </ProviderUI>
    </React.StrictMode>,
);
