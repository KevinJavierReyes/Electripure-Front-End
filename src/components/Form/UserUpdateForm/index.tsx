import { useEffect, useState } from "react"; 
import { useParams } from "react-router";
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { UpdateUserDataForm } from "../../../interfaces/form";
import { InputControl } from "../../../interfaces/form-control";
import { validateCellphoneControl, validateCompanyControl, validateEmailControl, validateNameControl } from "../../../libs/form-validation";
import { ButtonPrimary } from "../../FormInput/Button";
import InputSelect from "../../FormInput/InputSelect";
import InputText from "../../FormInput/InputText";
import Space from "../../Space";
import Title from "../../FormInput/Title";
import { useDispatch, useSelector } from "react-redux";
import { sendGetCompanies } from "../../../actions/electripure";
import { ElectripureState } from "../../../interfaces/reducers";
import { CompanyEntity, GlobalCompanyEntity } from "../../../interfaces/entities";


function UserUpdateForm({onSubmit}: {onSubmit: (data: UpdateUserDataForm) => void}) {

    const dispatch = useDispatch();
    const {userId} = useParams()
    const users:any = JSON.parse(useSelector((state: ElectripureState) => state.users));
    const user:any = users.filter((element:any)=> element.id == userId)[0];
    useEffect(()=> {
    }, []);

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


    function submit() {
        if (emailControl.state === INPUT_CONTROL_STATE.OK &&
            cellphoneControl.state === INPUT_CONTROL_STATE.OK &&
            nameControl.state === INPUT_CONTROL_STATE.OK) {
                onSubmit({
                    fullname: nameControl.value,
                    email: emailControl.value,
                    cellphone: cellphoneControl.value,
                });
        }
    }

    return (<div className="w-full bg-color-white px-[30px] pb-[30px]">
        <Title title="Update User Information"/>
        <div className="w-full">
            <InputText
                state={nameControl.state}
                message={nameControl.message}
                name={"name"}
                placeholder={"Jhon Doe"}
                label={"Full Name"}
                defaultValue={user.Name}
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
                defaultValue={user.email}
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
                    defaultValue={user.cellphone}
                    onChange={(value: string) => {
                        const newCellphoneControl: InputControl = validateCellphoneControl(value);
                        setCellphoneControl(newCellphoneControl);
                }}/>

            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <div className="flex justify-center items-center">
                <ButtonPrimary onClick={submit} classes={"max-w-[166px]"}>
                    Update
                </ButtonPrimary>
            </div>
        </div>
    </div>);
}

export default UserUpdateForm;
