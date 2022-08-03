import React, { useState } from "react";
import { IAlertProps } from "../../interfaces";

export default function Alert({ alerts, setAlerts }: 
    { alerts: Array<IAlertProps>, setAlerts: React.Dispatch<React.SetStateAction<IAlertProps[]>> }): JSX.Element | null {
    const [alert, setAlert] = useState<IAlertProps | null>(null);

    return (
        alert ?
            <div className={`alert alert-${alert.type}`}>
                {alert.message}
                <div className="loader"></div>
            </div>
            :
            null
    );
};