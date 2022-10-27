import { INPUT_CONTROL_STATE } from "../../../config/enum";

function InputCheckbox({ state, message, name, label, onChange }: { state: INPUT_CONTROL_STATE, message: string, name: string, label: string, onChange: (checked: boolean) => void }) {
    function handleChange(event: any) {
        onChange(event.target.checked);
    }
    return (
        <div className="w-full">
           <div className="w-full flex justify-start align-start">
                <input
                        type="checkbox"
                        onChange={handleChange}
                        className={`w-[20px] border h-[20px] mr-[10px] ${state === INPUT_CONTROL_STATE.OK ? "border-color-success color-success" : state === INPUT_CONTROL_STATE.ERROR ? "border-color-error color-error" : "border-color-black-light color-black"}`}
                        id={name}/>
                <label htmlFor={name} className={`f-medium ${state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black"}`}>{label}</label>    
           </div>
           <span className={`${message == "" ? "hidden" : "inline"} ${state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black"}`}>
                {message}
            </span>
        </div>
    );
}

export default InputCheckbox;