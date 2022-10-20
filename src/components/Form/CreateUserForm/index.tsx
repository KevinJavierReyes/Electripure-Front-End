import { useState } from "react"; 
import { STATE_INPUT_CONTROL, TYPE_SPACE } from "../../../config/enum";
import { CreateUserDataForm } from "../../../interfaces/form";
import { InputControl } from "../../../interfaces/form-control";
import { validateCellphoneControl, validateCompanyControl, validateEmailControl, validateNameControl } from "../../../libs/form-validation";
import { ButtonPrimary } from "../../FormInput/Button";
import InputSelect from "../../FormInput/InputSelect";
import InputText from "../../FormInput/InputText";
import Space from "../../Space";
import Title from "../../FormInput/Title";


function CreateUserForm({onSubmit}: {onSubmit: (data: CreateUserDataForm) => void}) {

    const [emailControl, setEmailControl] = useState({
        "value": "",
        "message": "",
        "state": STATE_INPUT_CONTROL.DEFAULT
    });
    
    const [cellphoneControl, setCellphoneControl] = useState({
        "value": "",
        "message": "",
        "state": STATE_INPUT_CONTROL.DEFAULT
    });

    const [nameControl, setNameControl] = useState({
        "value": "",
        "message": "",
        "state": STATE_INPUT_CONTROL.DEFAULT
    });

    const [companyControl, setCompanyControl] = useState({
        "value": "",
        "message": "",
        "state": STATE_INPUT_CONTROL.DEFAULT
    });

    const [roleControl, setRoleControl] = useState({
        "value": "",
        "message": "",
        "state": STATE_INPUT_CONTROL.DEFAULT
    });

    function submit() {
        if (emailControl.state === STATE_INPUT_CONTROL.OK &&
            cellphoneControl.state === STATE_INPUT_CONTROL.OK &&
            nameControl.state === STATE_INPUT_CONTROL.OK &&
            companyControl.state === STATE_INPUT_CONTROL.OK &&
            roleControl.state === STATE_INPUT_CONTROL.OK) {
                onSubmit({
                    email: emailControl.value,
                    cellphone: cellphoneControl.value,
                    fullname: nameControl.value,
                    company: companyControl.value,
                    role: roleControl.value
                });
        }
    }


    return (<div className="w-full bg-color-white px-[30px] pb-[30px]">
        <Title title="Lets get some basic information"/>
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
                    label={"Cellphone"}
                    onChange={(value: string) => {
                        const newCellphoneControl: InputControl = validateCellphoneControl(value);
                        setCellphoneControl(newCellphoneControl);
                }}/>
            
            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <InputText
                name="company"
                state={companyControl.state}
                message={companyControl.message}
                placeholder="Example Company"
                label="Company"
                onChange={(value: string) => {
                    const newCompanyController = validateCompanyControl(value);
                    setCompanyControl(newCompanyController);
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
                placeholder="Select a company"
                label="Role"
                onChange={(selected: {"value": any, "id": any}) => {
                    setRoleControl({
                        ...companyControl,
                        value: selected.value,
                        state: STATE_INPUT_CONTROL.OK
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