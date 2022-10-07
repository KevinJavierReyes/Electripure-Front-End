
function Checkbox(props: { success: boolean, messageSuccess: string, error: boolean, messageError: string, name: string, label: string, checked: (checked: boolean) => void }) {
    function handleChange(event: any) {
        props.checked(event.target.checked);
    }
    return (
        <div className="w-full py-[4px] my-[5px]">
           <div className="w-full flex justify-start align-start">
                <input
                        type="checkbox"
                        onChange={handleChange}
                        className={"w-[20px] border h-[20px] mr-[10px] " + (props.success ? "border-color-success color-success" : props.error ? "border-color-error color-error" : "border-color-black-light color-black")}
                        id={props.name}/>
                <label htmlFor={props.name} className={"f-medium " + (props.success ? "color-success" : props.error ? "color-error" : "color-black")}>{props.label}</label>    
           </div>
           <span className={"" + (props.success ? "color-success" : props.error ? "color-error" : "color-black")}>
                {props.success ? props.messageSuccess : props.error ? props.messageError : ""}
            </span>
        </div>
    );
}

export default Checkbox;