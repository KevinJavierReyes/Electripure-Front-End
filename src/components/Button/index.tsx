import { MouseEventHandler } from "react";


function Button(props: { title: String, classes: String, click: MouseEventHandler }) {
    return (
        <button className={"w-full rounded-sm bg-color-secondary " + props.classes} onClick={props.click}>
            {props.title}
        </button>
    );
}

export default Button;