import { STATE_INPUT_CONTROL } from "../../config/enum";

function InputCheckbox({ state, message, name, label, onChange }: { state: STATE_INPUT_CONTROL, message: string, name: string, label: string, onChange: (checked: boolean) => void }) {
    function handleChange(event: any) {
        onChange(event.target.checked);
    }
    return (
        <div className="w-full">
           <div className="w-full flex justify-start align-start">
                <input
                        type="checkbox"
                        onChange={handleChange}
                        className={`w-[20px] border h-[20px] mr-[10px] ${state === STATE_INPUT_CONTROL.OK ? "border-color-success color-success" : state === STATE_INPUT_CONTROL.ERROR ? "border-color-error color-error" : "border-color-black-light color-black"}`}
                        id={name}/>
                <label htmlFor={name} className={`f-medium ${state === STATE_INPUT_CONTROL.OK ? "color-success" : state === STATE_INPUT_CONTROL.ERROR ? "color-error" : "color-black"}`}>{label}</label>    
           </div>
           <span className={`${message == "" ? "hidden" : "inline"} ${state === STATE_INPUT_CONTROL.OK ? "color-success" : state === STATE_INPUT_CONTROL.ERROR ? "color-error" : "color-black"}`}>
                {message}
            </span>
        </div>
    );
}

export default InputCheckbox;