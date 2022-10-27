import { useState } from "react";
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum"
import { CreatePasswordDataForm } from "../../../interfaces/form";
import { InputControl } from "../../../interfaces/form-control";
import { validatePasswordControl } from "../../../libs/form-validation";
import { ButtonPrimary } from "../../FormInput/Button";
import InputPassword from "../../FormInput/InputPassword";
import Title from "../../FormInput/Title"
import Space from "../../Space"



function CreatePasswordForm({email, onSubmit}: {email: string, onSubmit: (data: CreatePasswordDataForm) => void}) {

    const [passwordControl, setPasswordControl] = useState({
        "value": "",
        "message": "",
        "state": INPUT_CONTROL_STATE.DEFAULT
    });

    const [confirmPasswordControl, setConfirmPasswordControl] = useState({
        "value": "",
        "message": "",
        "state": INPUT_CONTROL_STATE.DEFAULT
    });

    function validateConfirmPassword(value: string) {
        const newPasswordControl: InputControl = validatePasswordControl(value);
        if (newPasswordControl.state == INPUT_CONTROL_STATE.OK && newPasswordControl.value != passwordControl.value) {
          newPasswordControl.state = INPUT_CONTROL_STATE.ERROR;
          newPasswordControl.message = "Passwords do not match.";
        }
        setConfirmPasswordControl(newPasswordControl);
    }

    function submit() {
        if (passwordControl.state == INPUT_CONTROL_STATE.OK && confirmPasswordControl.state == INPUT_CONTROL_STATE.OK) {
            onSubmit({
                "password": passwordControl.value
            });
        }
    }
    
    return (<div className="w-full bg-color-white p-[10px]">
        <Title title="Create password"></Title>
        <Space type={TYPE_SPACE.FORM_DISTANCE}/>
        <p className="color-black-dark f-medium">Email</p>
        <p>{email}</p>
        <br/>
        <p>Use 8 or more characters with a mix of letters, numbers and characters.</p>
        <br/>
        <div className="w-full">            
            <InputPassword
                state={passwordControl.state}
                message={passwordControl.message}
                name={"password"}
                placeholder={"*********"}
                label={"Password"}
                onChange={(value: string) => {
                    const newPasswordControl: InputControl = validatePasswordControl(value);
                    setPasswordControl(newPasswordControl);
                    validateConfirmPassword(confirmPasswordControl.value);
                }}
            />
            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <InputPassword
                state={confirmPasswordControl.state}
                message={confirmPasswordControl.message}
                name={"confirmPassword"}
                placeholder={"*********"}
                label={"Confirm password"}
                onChange={(value: string) => {
                    validateConfirmPassword(value);
                }}
            />
            <Space classes="h-[80px]"/>
            <ButtonPrimary onClick={submit}>
             Log in
            </ButtonPrimary>
        </div>
    </div>)
}


export default CreatePasswordForm;