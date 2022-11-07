import { useEffect } from "react";
import { INPUT_CONTROL_STATE } from "../../../config/enum";

function InputSelect({ state, message, name, options, placeholder, label, onChange, defaultSelect="-1"} : {
    state : INPUT_CONTROL_STATE,
    message : string,
    name : string,
    options : { id: any, value: any }[],
    placeholder : string,
    label : string,
    onChange : (select : { "value": any, "id": any }) => void,
    defaultSelect?: string
}) {

    function handleChange(event : any) {
        let key: any = event.target.value;
        let optionsFiltered = options.filter(option => option.id == key);
        if (optionsFiltered.length > 0) {
            onChange(optionsFiltered[0]);
        }
    }

    useEffect(()=> {
        if (defaultSelect != "-1") {
            const optionSelected = options.filter((item: { id: any, value: any }) => { return item.id == defaultSelect; });
            if (optionSelected.length > 0) {
                onChange(optionSelected[0]);
            }
        }
    }, []);

    return (
        <div className="w-full styled-select">
            <label htmlFor={name}
                className={
                    "f-medium " + (state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black-dark")}>
                {label}</label>
            <div className="h-[50px] w-full relative mt-[5px]">
                <div className="w-full h-[50px] flex justify-end items-center pr-[10px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd"/>
                    </svg>
                </div>
                <select onChange={handleChange}
                    placeholder={placeholder}
                    defaultValue={defaultSelect}
                    className={"bg-transparent absolute top-0 left-0 m-0 w-full border h-[50px] px-[10px] " + (state === INPUT_CONTROL_STATE.OK ? "border-color-success color-success" : state === INPUT_CONTROL_STATE.ERROR ? "border-color-error color-error" : "border-color-black-light color-black")}
                    id={name}>
                    <option key={-1} value={-1} disabled>{placeholder}</option>
                    {
                        options.map((option : {
                            id: number,
                            value: string
                        }, index : number) => {
                            return <option key={index} value={ option.id}>{option.value}</option>;
                        })
                    }
                </select>
            </div>
            <span className={`${message == "" ? "hidden" : "inline"}  ${(state === INPUT_CONTROL_STATE.OK  ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black")}`}>
                { message}
            </span>
        </div>
    );
}

export default InputSelect;
