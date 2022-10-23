import { useState } from "react";

type UseFormReturn = [
    { [key: string]: any },
    (e: React.ChangeEvent<HTMLInputElement>) => void,
    (e: React.FormEvent<HTMLFormElement>) => void
];

export default function useForm(): UseFormReturn {
    const [data, setData] = useState<{ [key: string]: any }>({});
    const [response, setResponse] = useState<{ [key: string]: any }>({});

    const handleData = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setData({
            ...data,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });
    };

    const sendData = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setResponse(data);
    };

    return [response, handleData, sendData];
};
