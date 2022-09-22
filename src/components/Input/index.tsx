
function Input(props: { success: boolean, messageSuccess: string, error: boolean, messageError: string, name: string, type: string, placeholder: string, label: string, change: (value: string) => void }) {
    let interval: any;
    function handleChange(event: any) {
        props.change(event.target.value);
    }
    return (
        <div className="w-full py-[4px] my-[5px]">
            <label htmlFor={props.name} className={"f-medium " + (props.success ? "color-success" : props.error ? "color-error" : "color-black-dark")}>{props.label}</label>
            <input
                onChange={handleChange}
                placeholder={props.placeholder}
                className={"mt-[5px] w-full border h-[50px] px-[10px] " + (props.success ? "border-color-success color-success" : props.error ? "border-color-error color-error" : "border-color-black-light color-black-light")}
                id={props.name} type={props.type}/>
            <span className={"" + (props.success ? "color-success" : props.error ? "color-error" : "color-black-light")}>
                {props.success ? props.messageSuccess : props.error ? props.messageError : ""}
            </span>
        </div>
    );
}

export default Input;