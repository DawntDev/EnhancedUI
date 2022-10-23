import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { IBackground } from "../../context/background";
import { Select } from "../../components";

type TSetBackground = (context: "background", value: IBackground) => void
export default function Image({ currentImage, setBackground }: { currentImage: string, setBackground: TSetBackground }) {
    const [uploadStatus, setUploadStatus] = useState<"uploading" | "uploaded" | "error" | "empty">(currentImage ? "uploaded" : "empty");
    const [preview, setPreview] = useState<IBackground>({
        type: "image",
        value: currentImage?.startsWith("data:image") ? currentImage : "",
        repeat: "no-repeat",
        fit: "cover",
    })

    const uploadImage = (e: FormEvent<HTMLInputElement>) => {
        const file: File = e.currentTarget.files![0];
        const maxWidth: number = 1920;
        const maxHeight: number = 1080;

        if (!file) setUploadStatus("empty");
        if (!(/image/i).test(file.type)) setUploadStatus("error");
        else {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            setUploadStatus("uploading");

            reader.onload = () => {
                setUploadStatus("uploaded");

                // Compression
                let img: HTMLImageElement = document.createElement("img")
                img.src = reader.result as string;

                img.onload = () => {
                    let canvas = document.createElement("canvas");
                    let { width, height } = img;

                    // Resize
                    if (width > height) {
                        if (width > maxWidth) {
                            //height *= maxWidth / width;
                            height = Math.round(height *= maxWidth / width);
                            width = maxWidth;
                        };
                    } else {
                        if (height > maxHeight) {
                            //width *= maxHeight / height;
                            width = Math.round(width *= maxHeight / height);
                            height = maxHeight;
                        };
                    };

                    canvas.width = width;
                    canvas.height = height;
                    let ctx = canvas.getContext("2d");
                    ctx!.drawImage(img, 0, 0, width, height);

                    setPreview({ ...preview, value: canvas.toDataURL(file.type) });
                };
            };
        };

    };

    return (
        <div className="image">
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.20 } }}
            >Image</motion.p>
            <motion.div className="input-image"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.24 } }}
            >
                <input type="file" name="image" title="image" onChange={uploadImage} accept=".jpg, .jpeg, .png" />
                <div className={uploadStatus}></div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.28 } }}
            >
                <Select
                    options={["no-repeat", "repeat", "repeat-x", "repeat-y"]}
                    def={preview.repeat || "no-repeat"}
                    setDef={(value: IBackground["repeat"]) => setPreview({ ...preview, repeat: value })}
                />
                <Select
                    options={["cover", "contain", "auto"]}
                    def={preview.fit || "cover"}
                    setDef={(value: IBackground["fit"]) => setPreview({ ...preview, fit: value })}
                />
            </motion.div>

            <motion.div className="preview"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.32 } }}
            >
                {
                    preview.value.startsWith("data:image")
                        ? <img src={preview.value} alt="preview" width="480" height="270" />
                        : <p>Preview</p>
                }
            </motion.div>
            <motion.button 
                type="button"
                onClick={() => setBackground("background", preview)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.36 } }}
            >Apply</motion.button>
        </div>
    );
};