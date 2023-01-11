import { useEffect } from "react";
import { INPUT_CONTROL_STATE, ORIENTATION_INPUT } from "../../../config/enum";

function InputCheckbox({ state, message, name, label, onChange, classes="", defaultChecked=false, disabled=false, orientation=ORIENTATION_INPUT.RIGHT}: { orientation? : ORIENTATION_INPUT, state: INPUT_CONTROL_STATE, message: string, name: string, label: string, onChange: (checked: boolean) => void, classes?: string, defaultChecked?: boolean, disabled?: boolean }) {
    function handleChange(event: any) {
        onChange(event.target.checked);
    }

    useEffect(()=> {
        if (defaultChecked) {
            onChange(defaultChecked);
        }
    }, []);

    return (
        <div className="">
        {/* <div className="w-full"> */}
            { orientation == ORIENTATION_INPUT.RIGHT ? <div className="w-full flex justify-start items-center">
                <input
                    defaultChecked={defaultChecked}
                    type="checkbox"
                    disabled={disabled}
                    onChange={handleChange}
                    className={`w-[20px] border h-[20px] ${state === INPUT_CONTROL_STATE.OK ? "border-color-success color-success" : state === INPUT_CONTROL_STATE.ERROR ? "border-color-error color-error" : "border-color-black-light color-black"}`}
                    id={name}/>
                <label htmlFor={name} className={`ml-[5px] f-medium color-black ${state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : ""} ${classes}`}>{label}</label> 
           </div> : 
           <div className="w-full flex justify-start items-center">
                <label htmlFor={name} className={`mr-[5px] f-medium color-black ${state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : ""} ${classes}`}>{label}</label> 
                <input
                    defaultChecked={defaultChecked}
                    type="checkbox"
                    disabled={disabled}
                    onChange={handleChange}
                    className={`w-[20px] border h-[20px] ${state === INPUT_CONTROL_STATE.OK ? "border-color-success color-success" : state === INPUT_CONTROL_STATE.ERROR ? "border-color-error color-error" : "border-color-black-light color-black"}`}
                    id={name}/>
            </div> }
           <span className={`${message == "" ? "hidden" : "inline"} ${state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black"}`}>
                {message}
            </span>
        </div>
    );
}

export default InputCheckbox;