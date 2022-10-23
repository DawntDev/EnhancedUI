import { Title } from "../../components";

export default function Components(props:any) {
    return (
        <section>
            <Title str={props.title} />
            <div className="form">

            </div>
            <div className="items">
            </div>
        </section>
    );
};
