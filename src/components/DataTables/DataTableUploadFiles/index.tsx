import { useState, Fragment } from "react"
import Space from  "../../Space"
import InputFile from "../../FormInput/InputFile"
import { ModalMiddle } from "../../Modal"
import{ INPUT_CONTROL_STATE } from "../../../config/enum"
import UploadFileForm from "../../Form/UploadFileForm"
import { UploadFileDataForm } from "../../../interfaces/form"
import { useDispatch } from "react-redux";
import { sendUploadFileData } from "../../../actions/electripure";

const DataTableUploadFiles = () => {
    const [ toggleModal, setToggleModal ] = useState(false)
    const dispatch = useDispatch()

    const submitFileInfo = (data: UploadFileDataForm) =>{
        setToggleModal(false);
        dispatch(sendUploadFileData(data))
    }

    return (
        <Fragment>
            <h1 className="mt-[50px] flex items-center">
                Uploaded Files
                <hr className="w-[50%] ml-[10px]"/>
                <button className="w-[200px] border h-[50px] ml-[10px]" onClick={()=> setToggleModal(true)}>Upload Files</button>
            </h1>
            <ModalMiddle show={toggleModal} onClose={()=>{setToggleModal(false)}}>
                { <UploadFileForm onSubmit={submitFileInfo}/> }
            </ModalMiddle>
        </Fragment>
    )
}

export default DataTableUploadFiles;
