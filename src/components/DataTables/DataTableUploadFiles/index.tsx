import { useState, Fragment, useEffect } from "react"
import Space from  "../../Space"
import InputFile from "../../FormInput/InputFile"
import { ModalMiddle } from "../../Modal"
import{ INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum"
import UploadFileForm from "../../Form/UploadFileForm"
import { UploadFileDataForm } from "../../../interfaces/form"
import { useDispatch, useSelector } from "react-redux";
import { sendGetUploadedFiles, sendUploadFileData, setUploadedFile } from "../../../actions/electripure";
import { ElectripureState } from "../../../interfaces/reducers"
import { HeaderConfig, RowConfig, TableConfig } from "../../DataTable/interfaces/datatable"
import DataTable from "../../DataTable"
import { UploadedFileEntity } from "../../../interfaces/entities"
import { Navigate, useNavigate } from "react-router-dom"

const DataTableUploadFiles = ({companyId}: {companyId: number}) => {
    const [ toggleModal, setToggleModal ] = useState(false)
    const dispatch = useDispatch()

    const submitFileInfo = (data: UploadFileDataForm) =>{
        setToggleModal(false);
        dispatch(sendUploadFileData(data))
    }

    let files: UploadedFileEntity[] = JSON.parse(useSelector((state: ElectripureState) => state.uploadedFiles));
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(sendGetUploadedFiles({
            companyId: companyId
        }));
    }, []);

    function deleteFile(file: UploadedFileEntity) {

    }
    const data: RowConfig[] = files.map((file: UploadedFileEntity): RowConfig => {
        return {
            "Filename": {
                "label": <span onClick={()=> {navigate(`/dashboard/download/${file.id}`)}} className="cursor-pointer f-medium color-primary">{file.fileName}</span>,
                "value": file.fileName
            },
            "Type": {
                "label": <span className="f-medium">{file.type}</span>,
                "value": file.type
            },
            "DateRange": {
                "label": <span className="f-medium">{file.dateRange}</span>,
                "value": file.dateRange
            },
            "AddedBy": {
                "label": <span className="f-medium">{file.addedBy}</span>,
                "value": file.addedBy
            },
            "DateAdd": {
                "label": <span className="f-medium">{file.dateAdd}</span>,
                "value": file.dateAdd
            },
            "Delete": {
                "label": <span className="cursor-pointer" onClick={()=> { deleteFile(file) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></span>,
                "value": 1
            }
        }
    });

    const headers: HeaderConfig[] = [
        {
            key: "Filename",
            label: "File Name",
            sort: () => {
                let filesSorted = [...files].sort((a: UploadedFileEntity, b:UploadedFileEntity) => {
                    return a.fileName.toUpperCase().localeCompare(b.fileName.toUpperCase());
                });
                if (JSON.stringify(files) == JSON.stringify(filesSorted)) {
                    filesSorted.reverse();
                }
                dispatch(setUploadedFile({
                    uploadedFiles: filesSorted
                }))
            }
        },
        {
            key: "Type",
            label: "Type",
            sort: () => {
                let filesSorted = [...files].sort((a: UploadedFileEntity, b:UploadedFileEntity) => {
                    return a.type.toUpperCase().localeCompare(b.type.toUpperCase());
                });
                if (JSON.stringify(files) == JSON.stringify(filesSorted)) {
                    filesSorted.reverse();
                }
                dispatch(setUploadedFile({
                    uploadedFiles: filesSorted
                }))
            }
        },
        {
            key: "DateRange",
            label: "Date Range",
        },
        {
            key: "AddedBy",
            label: "Added by",
            sort: () => {
                let filesSorted = [...files].sort((a: UploadedFileEntity, b:UploadedFileEntity) => {
                    return a.addedBy.toUpperCase().localeCompare(b.addedBy.toUpperCase());
                });
                if (JSON.stringify(files) == JSON.stringify(filesSorted)) {
                    filesSorted.reverse();
                }
                dispatch(setUploadedFile({
                    uploadedFiles: filesSorted
                }))
            }
        },
        {
            key: "DateAdd",
            label: "Date Add"
        },
        {
           key: "Delete",
           label: "Delete"
        }
    ];

    const config: TableConfig = {"headers": headers, "data": data};
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
            <DataTable config={config} />;
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
        </Fragment>
    )
}

export default DataTableUploadFiles;
