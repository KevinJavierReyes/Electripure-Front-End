import { INPUT_CONTROL_STATE } from "../../../config/enum";

function InputRadioGroupSelect({ state, message, name, options, label, onChange } : {
    state : INPUT_CONTROL_STATE,
    message : string,
    name : string,
    options : { id: any, value: any }[],
    label : string,
    onChange : (select : { "value": any, "id": any }) => void
}) {

    function handleChange(event : any) {
        let key: any = event.target.value;
        let optionsFiltered = options.filter(option => option.id == key);
        if (optionsFiltered.length > 0) {
            onChange(optionsFiltered[0]);
        }
    }
    return (
        <div className="w-full styled-select">
            <label htmlFor={name}
                className={
                    "f-medium " + (state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black-dark")}>
                {label}</label>
            <div className="h-[50px] w-full flex relative mt-[5px]">
                { options.map((option:{id:any, value:any}, index:number)=> {
                    return (
                        <div key={index} className="m-[20px]">
                            <input 
                                onChange={handleChange}
                                name="radio" 
                                type="radio" 
                                id={option.id}
                                value={option.id} />
                            <label className="ml-[5px]" htmlFor={option.id}>{option.value}</label>
                        </div>
                    )
                })}
            </div>
            <span className={`${message == "" ? "hidden" : "inline"}  ${(state === INPUT_CONTROL_STATE.OK  ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black")}`}>
                { message}
            </span>
        </div>
    );
}

export default InputRadioGroupSelect;
