import { STATE_INPUT_CONTROL } from "../../../config/enum";

function InputPassword({ state, message, name, placeholder, label, onChange}: { state: STATE_INPUT_CONTROL, message: string, name: string, placeholder: string, label: string, onChange: (value: string) => void }) {
    function handleChange(event: any) {
        onChange(event.target.value);
    }
    return (
        <div className="w-full">
            <label htmlFor={name} className={"f-medium " + (state === STATE_INPUT_CONTROL.OK? "color-success" : state === STATE_INPUT_CONTROL.ERROR ? "color-error" : "color-black-dark")}>{label}</label>
            <input
                onChange={handleChange}
                placeholder={placeholder}
                className={"mt-[5px] w-full border h-[50px] px-[10px] " + (state === STATE_INPUT_CONTROL.OK ? "border-color-success color-success" : state === STATE_INPUT_CONTROL.ERROR ? "border-color-error color-error" : "border-color-black-light color-black")}
                id={name} type="password"/>
            <span className={`${message == "" ? "hidden" : "inline"} ${state === STATE_INPUT_CONTROL.OK ? "color-success" : state === STATE_INPUT_CONTROL.ERROR ? "color-error" : "color-black"}`}>
                {message}
            </span>
        </div>
    );
}

export default InputPassword;