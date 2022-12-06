import { useEffect, useState } from "react"; 
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { CreateUserDataForm } from "../../../interfaces/form";
import { InputControl } from "../../../interfaces/form-control";
import { validateCellphoneControl, validateCompanyControl, validateEmailControl, validateNameControl, validateRequiredControl } from "../../../libs/form-validation";
import { ButtonPrimary } from "../../FormInput/Button";
import InputSelect from "../../FormInput/InputSelect";
import InputText from "../../FormInput/InputText";
import Space from "../../Space";
import Title from "../../FormInput/Title";
import { useDispatch, useSelector } from "react-redux";
import { sendGetCompanies } from "../../../actions/electripure";
import { ElectripureState } from "../../../interfaces/reducers";
import { CompanyEntity, GlobalCompanyEntity } from "../../../interfaces/entities";
import formatter from "../../../libs/formatter";


function CreateUserForm({onSubmit}: {onSubmit: (data: CreateUserDataForm) => void}) {

    const dispatch = useDispatch();
    const companies: GlobalCompanyEntity[]= JSON.parse(useSelector((state: ElectripureState) => state.globalCompanies));

    useEffect(()=> {
        dispatch(sendGetCompanies({}));
    }, []);

    const [cellphone, setCellphone] = useState("");

    const [emailControl, setEmailControl] = useState({
        "value": "",
        "message": "",
        "state": INPUT_CONTROL_STATE.DEFAULT
    });
    
    const [cellphoneControl, setCellphoneControl] = useState({
        "value": "",
        "message": "",
        "state": INPUT_CONTROL_STATE.DEFAULT
    });

    const [nameControl, setNameControl] = useState({
        "value": "",
        "message": "",
        "state": INPUT_CONTROL_STATE.DEFAULT
    });

    const [companyControl, setCompanyControl] = useState({
        "value": "",
        "message": "",
        "state": INPUT_CONTROL_STATE.DEFAULT
    });

    const [roleControl, setRoleControl] = useState({
        "value": "",
        "message": "",
        "state": INPUT_CONTROL_STATE.DEFAULT
    });

    function submit() {
        if (emailControl.state === INPUT_CONTROL_STATE.OK &&
            cellphoneControl.state === INPUT_CONTROL_STATE.OK &&
            nameControl.state === INPUT_CONTROL_STATE.OK &&
            companyControl.state === INPUT_CONTROL_STATE.OK &&
            roleControl.state === INPUT_CONTROL_STATE.OK) {
                onSubmit({
                    email: emailControl.value,
                    cellphone: cellphoneControl.value,
                    fullname: nameControl.value,
                    company: companyControl.value,
                    role: roleControl.value
                });
        } else {
            // Validate required fields
            setEmailControl(validateRequiredControl(emailControl));
            setCellphoneControl(validateRequiredControl(cellphoneControl));
            setNameControl(validateRequiredControl(nameControl));
            setCompanyControl(validateRequiredControl(companyControl));
            setRoleControl(validateRequiredControl(roleControl));
        }
    }


    return (<div className="w-full bg-color-white px-[30px] pb-[30px]">
        <Title title="Let's get some basic information"/>
        <div className="w-full">
            <InputText
                state={nameControl.state}
                message={nameControl.message}
                name={"name"}
                placeholder={"Jhon Doe"}
                label={"Full Name"}
                onChange={(value: string) => {
                    const newNameControl: InputControl = validateNameControl(value);
                    setNameControl(newNameControl);
                }}/>
            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <InputText
                state={emailControl.state}
                message={emailControl.message}
                name={"email"}
                placeholder={"example@company.com"}
                label={"Email"}
                onChange={(value: string) => {
                    const newEmailControl: InputControl = validateEmailControl(value);
                    setEmailControl(newEmailControl);
                }}/>
            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <InputText
                    state={cellphoneControl.state}
                    message={cellphoneControl.message}
                    name={"phone"}
                    placeholder={"( 801 ) 250 - 2872"}
                    value={cellphone}
                    label={"Cellphone"}
                    onChange={(value: string) => {
                        const cellphone = value.replace("-", "").replace("(", "").replace(")", "").replace(" ", "");
                        const newCellphoneControl: InputControl = validateCellphoneControl(cellphone);
                        
                        setCellphoneControl(newCellphoneControl);
                        
                        if (newCellphoneControl.state == INPUT_CONTROL_STATE.OK) {
                            setCellphone(formatter.toCellphoneFormat(cellphone));
                        } else {
                            setCellphone(value);
                        }
                }}/>
            
            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <InputSelect
                name="company"
                state={companyControl.state}
                message={companyControl.message}
                options={companies.map((company: GlobalCompanyEntity) => {
                    return {"value": company.name, "id": company.id}
                })}
                placeholder="Select a company"
                label="Company"
                onChange={(selected: {"value": any, "id": any}) => {
                    setCompanyControl({
                        ...companyControl,
                        value: selected.id,
                        message: "",
                        state: INPUT_CONTROL_STATE.OK
                    });
                }}
            />
            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <InputSelect
                name="role"
                state={roleControl.state}
                message={roleControl.message}
                options={[
                    {"value": "Electripure Admin", "id": 1},
                    {"value": "Electripure Engineer", "id": 2},
                    {"value": "Company Admin", "id": 3},
                    {"value": "Site Manager", "id": 4}
                ]}
                placeholder="Select a role"
                label="Role"
                onChange={(selected: {"value": any, "id": any}) => {
                    setRoleControl({
                        ...roleControl,
                        value: selected.id,
                        message: "",
                        state: INPUT_CONTROL_STATE.OK
                    });
                }}
            />
            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <div className="flex justify-center items-center">
                <ButtonPrimary onClick={submit} classes={"max-w-[166px]"}>
                    Add
                </ButtonPrimary>
            </div>
        </div>
    </div>);
}

export default CreateUserForm;
