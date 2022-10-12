import { MouseEventHandler } from "react";


export function Button(props: { title: any, classes: String, click: MouseEventHandler }) {
    return (
        <button className={"w-full rounded-sm bg-color-secondary " + props.classes} onClick={props.click}>
            {props.title}
        </button>
    );
}

export function ButtonPrimary( { children, onClick, classes= ""}: { children: any, onClick: MouseEventHandler, classes?: string}) {
    return (
        <button className={"w-full rounded-sm bg-color-primary h-[48px] color-white " + classes} onClick={onClick}>
            {children}
        </button>
    );
}
