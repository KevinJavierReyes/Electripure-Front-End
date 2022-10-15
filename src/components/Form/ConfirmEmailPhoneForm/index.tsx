import { useState } from "react";
import { STATE_INPUT_CONTROL, TYPE_SPACE } from "../../../config/enum";
import { ConfirmEmailPhoneDataForm } from "../../../interfaces/form";
import { InputControl } from "../../../interfaces/form-control";
import { validateCellphoneControl, validateEmailControl } from "../../../libs/form-validation";
import { ButtonPrimary } from "../../FormInput/Button";
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";



function ConfirmEmailPhoneForm({ onSubmit }: { onSubmit: (data: ConfirmEmailPhoneDataForm) => void }) {

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

    function submit() {
        if (emailControl.state == STATE_INPUT_CONTROL.OK && cellphoneControl.state == STATE_INPUT_CONTROL.OK) {
            onSubmit({
                "phone": cellphoneControl.value,
                "email": emailControl.value
            })
        }
    }
    
    return (<div className="w-full bg-color-white p-[10px]">
        <Title title="Confirm email & cellphone for two-step verification"></Title>
        <p>In order to log in to electripure you will need to sign in with two-step verificaiton</p>
        <br/>
        <InputText
            name="email"
            placeholder="justin.smith@outcodesoftware.com"
            label="Email"
            state={emailControl.state}
            message={emailControl.message}
            onChange={(value: string) => {
                const newEmailControl: InputControl = validateEmailControl(value);
                setEmailControl(newEmailControl);
            }}
        />
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <InputText
            name="phone"
            placeholder="( 801 ) 250 - 2872"
            label="Cellphone"
            state={cellphoneControl.state}
            message={cellphoneControl.message}
            onChange={(value: string) => {
                const newCellphoneControl: InputControl = validateCellphoneControl(value);
                setCellphoneControl(newCellphoneControl);
            }}
        />
        <Space type={TYPE_SPACE.FORM_DISTANCE} />
        <ButtonPrimary onClick={submit}>
            Confirm
        </ButtonPrimary>
    </div>);
}

export default ConfirmEmailPhoneForm;