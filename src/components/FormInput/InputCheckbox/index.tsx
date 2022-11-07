import { useEffect } from "react";
import { INPUT_CONTROL_STATE } from "../../../config/enum";

function InputCheckbox({ state, message, name, label, onChange, classes="", defaultChecked=false}: { state: INPUT_CONTROL_STATE, message: string, name: string, label: string, onChange: (checked: boolean) => void, classes?: string, defaultChecked?: boolean }) {
    function handleChange(event: any) {
        onChange(event.target.checked);
    }

    useEffect(()=> {
        if (defaultChecked) {
            onChange(defaultChecked);
        }
    }, []);

    return (
        <div className="w-full">
           <div className="w-full flex justify-start align-start">
                <input
                    defaultChecked={defaultChecked}
                    type="checkbox"
                    onChange={handleChange}
                    className={`w-[20px] border h-[20px] mr-[10px] ${state === INPUT_CONTROL_STATE.OK ? "border-color-success color-success" : state === INPUT_CONTROL_STATE.ERROR ? "border-color-error color-error" : "border-color-black-light color-black"}`}
                    id={name}/>
                <label htmlFor={name} className={`f-medium color-black ${state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : ""} ${classes}`}>{label}</label>    
           </div>
           <span className={`${message == "" ? "hidden" : "inline"} ${state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black"}`}>
                {message}
            </span>
        </div>
    );
}

export default InputCheckbox;