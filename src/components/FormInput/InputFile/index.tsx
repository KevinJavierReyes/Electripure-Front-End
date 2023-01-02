import { useState, useEffect } from "react";
import { INPUT_CONTROL_STATE } from "../../../config/enum";



const InputFile = ({ name, placeholder, onChange, state, message } : { state: INPUT_CONTROL_STATE, message: string, name: string, placeholder:string, onChange : ({base64, size, file}:{base64: string, size: number, file?:any}) => void}) => {

    const [image, setImage] = useState("");
    const [size, setSize] = useState(0);
    const [file, setFile ] = useState({"event":"", "name":""});

    function onFileChange(event: any) {
        if (event.target.files && event.target.files[0]) {   
            setSize(event.target.files[0].size);
            setFile({event: event.target.files[0], name: event.target.files[0].name})
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
                "size": size,
                "file": file
            });
        }
    }, [image])

    return (
        <div className="w-full h-[250px]">
            <div className="w-full h-full min-h-[80px] relative overflow-hidden border">
                <div className={"flex justify-center items-center w-full h-full  " + (state === INPUT_CONTROL_STATE.OK ? "border-color-success color-success" : state === INPUT_CONTROL_STATE.ERROR ? "border-color-error color-error" : "border-color-black-light color-black")}>

                    <div className="absolute flex items-center w-full flex-wrap justify-around text-center top-[30px] p-[20px]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.92188 8.57812C5.48438 9.1875 6.46875 9.1875 7.03125 8.57812L10.5 5.15625V16.5C10.5 17.3438 11.1562 18 12 18C12.7969 18 13.5 17.3438 13.5 16.5V5.15625L16.9219 8.57812C17.4844 9.1875 18.4688 9.1875 19.0312 8.57812C19.6406 8.01562 19.6406 7.03125 19.0312 6.46875L13.0312 0.46875C12.75 0.1875 12.375 0 12 0C11.5781 0 11.2031 0.1875 10.9219 0.46875L4.92188 6.46875C4.3125 7.03125 4.3125 8.01562 4.92188 8.57812ZM22.5 16.5H15C15 18.1875 13.6406 19.5 12 19.5C10.3125 19.5 9 18.1875 9 16.5H1.5C0.65625 16.5 0 17.2031 0 18V22.5C0 23.3438 0.65625 24 1.5 24H22.5C23.2969 24 24 23.3438 24 22.5V18C24 17.2031 23.2969 16.5 22.5 16.5ZM20.25 21.375C19.5938 21.375 19.125 20.9062 19.125 20.25C19.125 19.6406 19.5938 19.125 20.25 19.125C20.8594 19.125 21.375 19.6406 21.375 20.25C21.375 20.9062 20.8594 21.375 20.25 21.375Z" fill="#737373"/>
                        </svg>
                        <p>JPG, PNG, PDF, and XLS file size no more than 20MB</p>
                    </div>
                    <label className="h-[50px] w-[200px] flex absolute bottom-[30px] items-center border cursor-pointer justify-around" htmlFor={name}>Upload File</label>
                    <input id={name}
                           className="hidden" 
                           name={name} 
                           type="file" 
                           onChange={onFileChange} 
                           accept=".png, .jpeg, .pdf, .xls, .jpg"/>
                </div>

            </div>
            <span className={`${message == "" ? "hidden" : "inline"} ${state === INPUT_CONTROL_STATE.OK ? "color-success" : state === INPUT_CONTROL_STATE.ERROR ? "color-error" : "color-black"}`}>
                {message}
            </span>
        </div>
    );
}

export default InputFile;
