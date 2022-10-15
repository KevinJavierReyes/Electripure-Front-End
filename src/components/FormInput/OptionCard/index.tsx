
import { MouseEventHandler } from "react";
import { buttonPrimaryStyle, buttonSecondaryStyle } from "./../../../utils/styles";

function OptionCard(props: {title: string, description: string, children: any, click: MouseEventHandler}) {
    return (
        <div onClick={props.click} className={buttonSecondaryStyle + " w-full flex justify-center items-center h-[75px] rounded px-[30px] cursor-pointer"}>
            <div className="h-full flex justify-center items-center">
                {props.children}
            </div>
            <div className="w-full pl-[30px]">
                <p className="color-black-dark f-medium">{props.title}</p>
                <p>{props.description}</p>
            </div>
        </div>
    );
}

export default OptionCard;