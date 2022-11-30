
import { useState, useEffect } from "react";
import { INPUT_CONTROL_STATE } from "../../../config/enum";



function InputPhoto({ name, placeholder, onChange, state, message } : { state: INPUT_CONTROL_STATE, message: string, name: string, placeholder:string, onChange : ({base64, size}:{base64: string, size: number}) => void}) {

    const [image, setImage] = useState("");
    const [size, setSize] = useState(0);

    function onImageChange(event: any) {
        if (event.target.files && event.target.files[0]) {   
            setSize(event.target.files[0].size);
            let reader = new FileReader();
            reader.onload = (e: any) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }


    useEffect(() => {
        if (image != "") {
            onChange({
                "base64": image,
                "size": size
            });
        }
    }, [image])

    return (
        <div className="w-full h-full">
            <div className="w-full h-full min-h-[80px] relative overflow-hidden">
                <div className={"bg-color-secondary  flex justify-center items-center rounded-lg w-full h-full absolute top-0 left-0 " + (state === INPUT_CONTROL_STATE.OK ? "border-color-success color-success" : state === INPUT_CONTROL_STATE.ERROR ? "border-color-error color-error" : "border-color-black-light color-black")}>
                    { image ? <img src={image} className="max-h-full max-w-full" /> : <p className="color-white f-bold text-base">{placeholder}</p> }
                    <div className="bg-color-black-opacity absolute bottom-0 right-0 w-[65px] h-[65px] flex items-center justify-center rounded-tl-lg rounded-br-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg>
                            <p className="color-white f-medium text-xs">Add</p>
                        </div>
                        <label htmlFor={name} className="absolute w-full h-full top-0 left-0 rounded-tl-lg rounded-br-lg cursor-pointer"></label>
                    </div>
                </div>
                <input id={name} className="invisible" name={name} type="file" onChange={onImageChange} accept="image/png, image/jpeg"/>
            </div>
            <span className={`${message == "" ? "hidden" : "inline"} ${state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black"}`}>
                {message}
            </span>
        </div>
    );
}

export default InputPhoto;