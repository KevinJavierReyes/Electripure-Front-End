import { useState, useEffect } from "react";
import { INPUT_CONTROL_STATE } from "../../../config/enum";

function InputText({ state, message, name, placeholder, label, onChange, defaultValue=null, value=null }: { value?: string | null, state: INPUT_CONTROL_STATE, message: string, name: string, placeholder: string, label: string, onChange: (value: string) => void, defaultValue?: string | null}) {
    const [_, setValue] = useState(value || defaultValue || "");
    function handleChange(event: any) {
        setValue(event.target.value);
        onChange(event.target.value);
    }
    useEffect(() => {
        if (_ != "") {
            onChange(_);
        }
    }, []);
    
    useEffect(() => {
        if (value != null) {
            setValue(value);
        }
    }, [value]);
    return (
        <div className="w-full">
            <label htmlFor={name} className={"f-medium " + (state === INPUT_CONTROL_STATE.OK? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black-dark")}>{label}</label>
            <input
                onInput={handleChange}
                placeholder={placeholder}
                value={_}
                className={"mt-[5px] w-full border h-[50px] px-[10px] " + (state === INPUT_CONTROL_STATE.OK ? "border-color-success color-success" : state === INPUT_CONTROL_STATE.ERROR ? "border-color-error color-error" : "border-color-black-light color-black")}
                id={name} type="text"/>
            <span className={`${message == "" ? "hidden" : "inline"} ${state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black"}`}>
                {message}
            </span>
        </div>
    );
}

export default InputText;