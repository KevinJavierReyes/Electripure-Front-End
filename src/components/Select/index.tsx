import internal from "stream";

function Select(props: { success: boolean, messageSuccess: string, error: boolean, messageError: string, name: string, options: {id: any, value: any }[], placeholder: string, label: string, change: (select: {"value": any, "id": any}) => void }) {
    let interval: any;
    function handleChange(event: any) {
        props.change(event.target.value);
    }
    return (
        <div className="w-full py-[4px] my-[5px] styled-select">
            <label htmlFor={props.name} className={"f-medium " + (props.success ? "color-success" : props.error ? "color-error" : "color-black-dark")}>{props.label}</label>
            <div className="h-[50px] w-full relative mt-[5px]">
                <div className="w-full h-[50px] flex justify-end items-center pr-[10px]">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                </svg>

                </div>
                <select
                    onChange={(e) => {
                        let key: any = e.target.value;
                        let options = props.options.filter( option => option.id == key );
                        if (options.length > 0) {
                            props.change(options[0]);
                        }
                    }}
                    placeholder={props.placeholder}
                    className={"bg-transparent absolute top-0 left-0 m-[0px] w-full border h-[50px] px-[10px] " + (props.success ? "border-color-success color-success" : props.error ? "border-color-error color-error" : "border-color-black-light color-black")}
                    id={props.name}>

                        {props.options.map((option: {id: number, value: string }, index: number) => {
                            return <option key={index} value={option.id}>{option.value}</option>
                        })}
                </select>
            </div>
            <span className={"" + (props.success ? "color-success" : props.error ? "color-error" : "color-black")}>
                {props.success ? props.messageSuccess : props.error ? props.messageError : ""}
            </span>
        </div>
    );
}

export default Select;