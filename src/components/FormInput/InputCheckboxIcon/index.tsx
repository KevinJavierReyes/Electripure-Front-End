import { useEffect } from "react";
import { INPUT_CONTROL_STATE, ORIENTATION_INPUT } from "../../../config/enum";

function InputCheckboxIcon({ name, children, onChange, classes="", defaultChecked=false, disabled=false}: {name: string, children: any, onChange: (checked: boolean) => void, classes?: string, defaultChecked?: boolean, disabled?: boolean }) {
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
            <div className="w-full flex justify-start items-center">
                <input
                    // defaultChecked={defaultChecked}
                    checked={defaultChecked}
                    type="checkbox"
                    disabled={disabled}
                    onChange={handleChange}
                    className={`w-[20px] border h-[20px] border-color-black-light color-black hidden`}
                    id={name}/>
                <label htmlFor={name} className={`${!disabled?"cursor-pointer": ""} f-medium color-black p-[2px] border border-color-black-light border-1 ${classes} `}>
                    {children}
                </label> 
           </div>
        </div>
    );
}

export default InputCheckboxIcon;