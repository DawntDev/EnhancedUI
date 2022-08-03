import { useEffect } from "react";
import { useForm } from "../../hooks";

export default function Statics({ title, renderAlert, ...props }: any) {
    const [data, handleData, sendData] = useForm();

    useEffect(() => { localStorage.getItem("statics") || localStorage.setItem("statics", "{}") }, []);
    useEffect(() => {
        let { id, file } = data;
        let statics =  JSON.parse(localStorage.getItem("statics")!);
        
        if (!statics[id]) {
            if (id && file) {
                let reader = new FileReader();
                reader.onload = () => {
                    localStorage.setItem(
                        "statics", 
                        JSON.stringify({ ...statics, [id]: reader.result })
                    );
                };
                reader.readAsDataURL(file[0]);
            };
        } else {
            console.log("Error: Statics with id '" + id + "' already exists.");
            renderAlert("File already exists", "warning");
        };
    }, [data, renderAlert]);

    return (
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
    );
};