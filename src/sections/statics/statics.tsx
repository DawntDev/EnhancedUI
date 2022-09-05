import { useEffect, useState } from "react";
import { useForm } from "../../hooks";
import { Alert } from "../../components";
import { IAlertProps } from "../../interfaces";

export default function Statics({ title, ...props }: any) {
    const [data, handleData, sendData] = useForm();
    const [alertProps, setAlertProps] = useState<IAlertProps>();


    useEffect(() => { localStorage.getItem("statics") || localStorage.setItem("statics", "{}") }, []);
    useEffect(() => {
        let { id, file } = data;
        let statics = JSON.parse(localStorage.getItem("statics")!);

        if (!statics[id]) {
            // TODO : Improve the storage of the files
            // https://es.stackoverflow.com/questions/404019/c%C3%B3mo-puedo-sacar-archivos-de-una-carpeta-con-js-del-frontent
            if (id && file) {
                let reader = new FileReader();
                reader.onload = () => {
                    localStorage.setItem(
                        "statics",
                        JSON.stringify({ ...statics, [id]: reader.result })
                    );
                };
                reader.readAsDataURL(file[0]);

                // Reset form
                let form: HTMLFormElement | null = document.querySelector("#statics > div > form");
                form && form.reset();

                // Success alert
                setAlertProps({
                    message: "The file has been uploaded successfully",
                    type: "success",
                    destroy: () => setAlertProps(undefined)
                });
            };
        } else {
            // Error alert
            setAlertProps({
                message: "The file has already been uploaded",
                type: "info",
                destroy: () => setAlertProps(undefined)
            });
        };
    }, [data]);

    return (
        <>
            {/* Alert Rendering*/}
            {alertProps && <Alert {...alertProps} />}
            <div id="statics" className="section">

                <h1>{title}</h1>
                <div className="append-statics">
                    <form onSubmit={sendData} >
                        <input type="text" name="id" placeholder="id" onChange={handleData} autoComplete="nope" />
                        <input type="file" name="file" id="" accept="image/*" onChange={handleData} />
                        <button type="submit">Upload</button>
                    </form>
                </div>
                <div className="statics">

                </div>
            </div>
        </>
    );
};