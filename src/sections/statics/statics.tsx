import { useEffect, useState } from "react";
import { useForm } from "../../hooks";
import { Title } from "../../components";

export default function Statics({ title, ...props }: any) {
    return (
        <section>
            <Title str={title} />
        </section>
    );
};