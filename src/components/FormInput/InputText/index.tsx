import { INPUT_CONTROL_STATE } from "../../../config/enum";

function InputText({ state, message, name, placeholder, label, onChange}: { state: INPUT_CONTROL_STATE, message: string, name: string, placeholder: string, label: string, onChange: (value: string) => void }) {
    function handleChange(event: any) {
        onChange(event.target.value);
    }
    return (
        <div className="w-full">
            <label htmlFor={name} className={"f-medium " + (state === INPUT_CONTROL_STATE.OK? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black-dark")}>{label}</label>
            <input
                onChange={handleChange}
                placeholder={placeholder}
                className={"mt-[5px] w-full border h-[50px] px-[10px] " + (state === INPUT_CONTROL_STATE.OK ? "border-color-success color-success" : state === INPUT_CONTROL_STATE.ERROR ? "border-color-error color-error" : "border-color-black-light color-black")}
                id={name} type="text"/>
            <span className={`${message == "" ? "hidden" : "inline"} ${state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black"}`}>
                {message}
            </span>
        </div>
    );
}

export default InputText;