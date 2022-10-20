import { useState } from "react";
import { STATE_INPUT_CONTROL, TYPE_SPACE } from "../../../config/enum";
import { ResetPasswordDataForm } from "../../../interfaces/form";
import { InputControl } from "../../../interfaces/form-control";
import { validatePasswordControl } from "../../../libs/form-validation";
import { ButtonPrimary } from "../../FormInput/Button";
import InputPassword from "../../FormInput/InputPassword";
import Title from "../../FormInput/Title";
import Space from "../../Space";


function ResetPasswordForm({onSubmit}: {onSubmit: (data: ResetPasswordDataForm) => void}) {
    const [passwordControl, setPasswordControl] = useState({
        "value": "",
        "message": "",
        "state": STATE_INPUT_CONTROL.DEFAULT
    });

    const [confirmPasswordControl, setConfirmPasswordControl] = useState({
        "value": "",
        "message": "",
        "state": STATE_INPUT_CONTROL.DEFAULT
    });

    function validateConfirmPassword(value: string) {
        const newPasswordControl: InputControl = validatePasswordControl(value);
        if (newPasswordControl.state == STATE_INPUT_CONTROL.OK && newPasswordControl.value != passwordControl.value) {
          newPasswordControl.state = STATE_INPUT_CONTROL.ERROR;
          newPasswordControl.message = "Passwords do not match.";
        }
        setConfirmPasswordControl(newPasswordControl);
    }

    function submit() {
        if (passwordControl.state == STATE_INPUT_CONTROL.OK && confirmPasswordControl.state == STATE_INPUT_CONTROL.OK) {
            onSubmit({
                "password": passwordControl.value
            });
        }
    }
    
    return (<div className="w-full bg-color-white p-[10px]">
        <Title title="Reset password"></Title>
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

export default ResetPasswordForm;