import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ElectripureState } from "../../../interfaces/reducers";
import { useEffect, useState } from "react";
import InputSelect from "../../FormInput/InputSelect";
import InputText from "../../FormInput/InputText";
import Space from "../../Space";
import Title from "../../FormInput/Title";
import { InputControl } from "../../../interfaces/form-control";
import { TYPE_SPACE, INPUT_CONTROL_STATE, TASK_STATE } from "../../../config/enum";
import { ButtonPrimary } from "../../FormInput/Button";
import InputFile from "../../FormInput/InputFile";
import { validateNameControl, validateRequiredControl } from "../../../libs/form-validation";
import { UploadFileDataForm } from "../../../interfaces/form";
import InputRadioGroupSelect from "../../FormInput/InputRadioGroupSelect";
import InputDateRange from "../../FormInput/InputDateRange";
import { sendUploadFileData, sendUploadFile } from '../../../actions/electripure'
import { TaskEntity } from "../../../interfaces/entities"


function UploadFileForm({onSubmit}: {onSubmit: (data: UploadFileDataForm) => void}) {
    const dispatch = useDispatch();
    const { ciaId } = useParams()
    const company = JSON.parse(useSelector((state: ElectripureState) => state.companyDetails));

    const uploadLogoTask: TaskEntity = JSON.parse(useSelector((state: ElectripureState) => state.tasks))["UPLOAD_FILE"] ?? {};

    const [ fileControl, setFileControl ] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    })
    const [ validFile, setValidFile ] = useState(false)
    const [ siteIdSelected, setSiteIdSelected ] = useState(0)

    const [ selectSiteControl, setSelectSiteControl ] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    })

    const [ selectTypeControl, setSelectTypeControl ] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    })

    const [ selectDateControl, setSelectDateControl ] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    })

    const [ dateControl, setDateControl ] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    })
    const [ selectStartDateControl, setSelectStartDateControl ] = useState('')
    const [ selectEndDateControl, setSelectEndDateControl ] = useState('')

    function onChangeDataRange(start: Date, end: Date){
        setSelectStartDateControl(`${start.getMonth()}/${start.getDate()}/${start.getFullYear()}`);
        setSelectEndDateControl(`${end.getMonth()}/${end.getDate()}/${end.getFullYear()}`);
        setDateControl({
            "state": INPUT_CONTROL_STATE.OK,
            "value": "",
            "message": ""
        })
    }

    function uploadFile({base64, size, file}: {base64:string, size:number, file?: any}) {
        if(size > 20971520){
            setFileControl({
                "message": "Maximum value is 20MB",
                "state": INPUT_CONTROL_STATE.ERROR,
                "value": ""
            })
            return;
        }
        setValidFile(true);
        setFileControl({
                "message": "",
                "state": INPUT_CONTROL_STATE.OK,
                "value": base64.split(",")[1]
            });
        dispatch(sendUploadFile({
                "base64": base64.split(",")[1],
                "taskKey": "UPLOAD_FILE",
                "extension": file.event.type,
                "name": file.name
            }));
    }

    function submit() {
        if (fileControl.state === INPUT_CONTROL_STATE.OK && 
            selectTypeControl.state === INPUT_CONTROL_STATE.OK && 
            dateControl.state === INPUT_CONTROL_STATE.OK
            ) {
                onSubmit({
                    company_id: parseInt(ciaId?? '0'),
                    site_id: siteIdSelected,
                    file_type: selectTypeControl.value,
                    date_from: selectStartDateControl,
                    date_to: selectEndDateControl,
                    id_file: uploadLogoTask.result
                });
        } else {
            setFileControl(validateRequiredControl(fileControl));
            setSelectTypeControl(validateRequiredControl(selectTypeControl));
            setDateControl(validateRequiredControl(dateControl));
            setSelectSiteControl(validateRequiredControl(selectSiteControl));
        }
    }

    useEffect(()=> {
        if (uploadLogoTask.state == TASK_STATE.COMPLETED && validFile) {
            setFileControl({
                ...fileControl,
                "message": "",
                "state": INPUT_CONTROL_STATE.OK,
                "value": uploadLogoTask.result,
            });
        }
    }, [uploadLogoTask.state]);

    return (<div className="w-full text-center bg-color-white px-[30px] pb-[30px]">
        <Title title="Upload a File"/>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="w-full flex justify-around">
            <div className="w-[45%]">
                <InputFile state={fileControl.state} 
                           message={fileControl.message} 
                           name="file" 
                           placeholder="Add a file" 
                           onChange={uploadFile}
                />

            </div>
            <div className="w-[45%] text-left">
                <div>
                    <p className="f-medium color-black-dark">Company name:</p> {company.name}
                </div>
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                <InputSelect
                state={selectSiteControl.state}
                message={selectSiteControl.message}
                name="Select Site"
                label="Select Site"
                options={company?.sites?.map((site: any, index:number) => {
                        return {"id": site.id, "value": site.name}
                })}
                placeholder="Select a Site"
                onChange={(select: {"value": any, "id":any}) => {
                    setSelectSiteControl({
                        "state": INPUT_CONTROL_STATE.OK,
                        "value": select.value,
                        "message":"" 
                    })
                    setSiteIdSelected(select.id)
                }}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                <InputRadioGroupSelect
                state={selectTypeControl.state}
                message={selectTypeControl.message}
                name="Select Site"
                label="Type"
                options={[{"id": 0, "value": "Analysis"}, {"id": 1, "value": "Bill"}]}
                onChange={(select: {"value":any, "id": any}) => {
                    setSelectTypeControl({
                        "state": INPUT_CONTROL_STATE.OK,
                        "value": select.id,
                        "message": ""
                    })

                }}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />

                <div className="w-[250px] absolute mb-[100px]">
                    <label className={`f-medium color-black-dark ${dateControl.state === 1 ? "color-success": ""}`} htmlFor="">Date Range</label>
                    <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                    <InputDateRange
                        defaultStart={new Date()} 
                        defaultEnd={new Date()} 
                        classes={"absolute"}
                        onChange={onChangeDataRange} />
                </div>
            </div>
        </div>
        <div className="h-[100px]"></div>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="flex justify-center items-center">
            <ButtonPrimary onClick={submit} classes={"max-w-[166px]"}>
                Update
            </ButtonPrimary>
        </div>
    </div>);
}

export default UploadFileForm;
