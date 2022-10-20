import { useState } from "react";
import { STATE_INPUT_CONTROL, TYPE_SPACE, VERIFICATION_CHANNEL } from "../../../config/enum";
import { ConfirmCodeDataForm, ResetPasswordDataForm, SelectVerifyMethodDataForm } from "../../../interfaces/form";
import { InputControl } from "../../../interfaces/form-control";
import { validateCodeControl, validatePasswordControl } from "../../../libs/form-validation";
import { ButtonLink, ButtonPrimary, ButtonSecondary } from "../../FormInput/Button";
import InputPassword from "../../FormInput/InputPassword";
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";


function ConfirmCodeForm({onSubmit, resendCode}: {onSubmit: (data: ConfirmCodeDataForm) => void, resendCode: () => void}) {

    const [codeControl, setCodeControl] = useState({
        "value": "",
        "message": "",
        "state": -1
    });

    function submit() {
        if (codeControl.state == STATE_INPUT_CONTROL.OK) {
            onSubmit({
                "code": codeControl.value
            });
        }
    }
    
    return (<div className="w-full bg-color-white p-[10px]">
        <Title title="Enter your autherization code"></Title>
        <p>How would you like to recieve your autherization code?</p>
        <br/>
        <InputText
            name="code"
            placeholder="000000"
            label="6 digital code"
            onChange={(value: string)=> {
                const newCodeControl: InputControl = validateCodeControl(value);
                setCodeControl(newCodeControl);
            }}
            state={codeControl.state}
            message={codeControl.message} />
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className={"justify-start items-center flex"}>
            <ButtonLink onClick={resendCode}>
                Resend code
            </ButtonLink>
        </div>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <ButtonPrimary onClick={submit}>
            Log in
        </ButtonPrimary>
    </div>)
}

export default ConfirmCodeForm;