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


export function ButtonSecondary( { children, onClick, classes= ""}: { children: any, onClick: MouseEventHandler, classes?: string}) {
    return (
        <button className={"w-full rounded-sm border border-color-secondary h-[48px] color-white bg-color-white rounded " + classes} onClick={onClick}>
            {children}
        </button>
    );
}


export function ButtonNotification( { children, onClick, classes= "", notifications = 0}: { children: any, onClick: MouseEventHandler, notifications?: number, classes?: string}) {
    return (
        <button className={"relative min-w-[40px] rounded-full border-color-black-light border bg-color-white min-h-[40px] flex justify-center items-center " + classes} onClick={onClick}>
            <div className={"f-medium text-xs rounded-full color-white w-[20px] h-[20px] absolute top-[-10px] right-[-10px] bg-color-primary flex justify-center items-center " + (notifications > 0 ? "" : "hidden")}>
                {notifications}
            </div>
            {children}
        </button>
    );
}
