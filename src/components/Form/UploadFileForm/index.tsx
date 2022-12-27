import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ElectripureState } from "../../../interfaces/reducers";
import { useEffect, useState } from "react"
import{ INPUT_CONTROL_STATE } from "../../../config/enum"
import InputSelect from "../../FormInput/InputSelect";
import InputText from "../../FormInput/InputText";
import Space from "../../Space";
import Title from "../../FormInput/Title";
import { InputControl } from "../../../interfaces/form-control";
import { TYPE_SPACE } from "../../../config/enum"
import { ButtonPrimary } from "../../FormInput/Button"
import InputFile from "../../FormInput/InputFile"
import { validateNameControl } from "../../../libs/form-validation"
import { UploadFileDataForm } from "../../../interfaces/form"
import InputRadioGroupSelect from "../../FormInput/InputRadioGroupSelect"
import InputDateRange from "../../FormInput/InputDateRange";


function UserUpdateForm({onSubmit}: {onSubmit: (data: UploadFileDataForm) => void}) {

    const dispatch = useDispatch();
    const {userId} = useParams()
    const users:any = JSON.parse(useSelector((state: ElectripureState) => state.users));
    const user:any = users.filter((element:any)=> element.id == userId)[0];
    useEffect(()=> {
    }, []);

    const [ fileControl, setFileControl ] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    })

    const [ selectCompanyControl, setSelectCompanyControl ] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    })

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


    function uploadFile({base64, size}: {base64:string, size:number}) {
        if(size > 20971520){
            setFileControl({
                "message": "Maximum value is 20MB",
                "state": INPUT_CONTROL_STATE.ERROR,
                "value": ""
            })
        } else{
            setFileControl({
                "message": "",
                "state": INPUT_CONTROL_STATE.OK,
                "value": base64.split(",")[1]
            })
        }
    }

    function submit() {
        if (fileControl.state === INPUT_CONTROL_STATE.OK) {
                onSubmit({
                    "hello": 12
                });
        }
        onSubmit({
            "hello": 12
        });
    }

    return (<div className="w-full bg-color-white px-[30px] pb-[30px]">
        <Title title="Upload File"/>
        <div className="w-full flex justify-around">
            <div className="w-[45%]">
                <InputFile state={1} message="hello" name="input" placeholder="add file" onChange={uploadFile}/>
            </div>
            <div className="w-[45%]">
                <InputSelect
                state={selectCompanyControl.state}
                message={selectCompanyControl.message}
                name="Select Company"
                label="Select Company"
                options={[{"id": "1", "value": "company"}]}
                placeholder="Select a Company"
                onChange={() => {}}
                />

                <InputSelect
                state={selectSiteControl.state}
                message={selectSiteControl.message}
                name="Select Site"
                label="Select Site"
                options={[{"id": "1", "value": "site"}]}
                placeholder="Select a Site"
                onChange={() => {}}
                />
                <InputRadioGroupSelect
                state={selectSiteControl.state}
                message={selectSiteControl.message}
                name="Select Site"
                label="Type"
                options={[{"id": "1", "value": "Analysis"}, {"id": "2", "value": "Bill"}]}
                onChange={(select: {"value":any, "id": any}) => {
                    setSelectTypeControl({
                        "state": INPUT_CONTROL_STATE.OK,
                        "value": select.value,
                        "message": ""
                    })
                }}
                />
                <div className="w-[250px]">
                    <InputDateRange 
                    classes=""
                        defaultStart={new Date()} 
                        defaultEnd={new Date()} 
                        onChange={(start:Date, end:Date)=>{}} />
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center">
            <ButtonPrimary onClick={submit} classes={"max-w-[166px]"}>
                Update
            </ButtonPrimary>
        </div>
    </div>);
}

export default UserUpdateForm;
