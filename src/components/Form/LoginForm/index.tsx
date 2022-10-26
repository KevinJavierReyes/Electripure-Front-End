import { useState } from "react";
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { LoginDataForm } from "../../../interfaces/form";
import { InputControl } from "../../../interfaces/form-control";
import { validateEmailControl, validatePasswordControl } from "../../../libs/form-validation";
import { ButtonLink, ButtonPrimary, ButtonSecondary } from "../../FormInput/Button";
import InputCheckbox from "../../FormInput/InputCheckbox";
import InputPassword from "../../FormInput/InputPassword";
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";


function LoginForm({ onSubmit, forgotPassword}: { onSubmit: (data: LoginDataForm) => void, forgotPassword: () => void}) {

    const [remember, setRemember ] = useState(false);
    
    const [passwordControl, setPasswordControl] = useState({
        "value": "",
        "message": "",
        "state": -1
    });

    const [emailControl, setEmailControl] = useState({
        "value": "",
        "message": "",
        "state": -1
    });

    function submit() {
        if (passwordControl.state === INPUT_CONTROL_STATE.OK && emailControl.state === INPUT_CONTROL_STATE.OK) {
            onSubmit({
                "email": emailControl.value,
                "password": passwordControl.value,
                "remember": remember
            });
        }
    }

    return (<div className="w-full bg-color-white p-[10px]">
        <Title title="Log in to electripure"/>
        <Space type={TYPE_SPACE.FORM_DISTANCE} />
        <InputText
            name="email"
            label="Email"
            placeholder="email@company.com"
            state={emailControl.state}
            message={emailControl.message}
            onChange={(value: string)=> {
                const newEmailControl: InputControl = validateEmailControl(value);
                setEmailControl(newEmailControl);
            }}
        />
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <InputPassword
            name="password"
            label="Password"
            placeholder="*********"
            state={passwordControl.state}
            message={passwordControl.message}
            onChange={(value: string)=> {
                const newPasswordControl: InputControl = validatePasswordControl(value);
                setPasswordControl(newPasswordControl);
            }}
        />
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <InputCheckbox
            state={INPUT_CONTROL_STATE.DEFAULT}
            message={""}
            name="rememberpassword"
            label="Remember password"
            onChange={(checked: boolean)=> {
                setRemember(checked);
            }}
        />
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className={"justify-center items-center flex"}>
            <ButtonLink onClick={forgotPassword}>
                Forgot your password?
            </ButtonLink>
        </div>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <ButtonPrimary onClick={submit}>
            Log in
        </ButtonPrimary>
        {/* <Button title="Log in" classes={buttonPrimaryStyle + " mt-[20px] mb-[50px]"} click={} /> */}

        {/* <div className={"justify-center items-center mt-[0px] flex"}>
            <span className="color-black-dark text-sm">Don’t have an account?</span>
        </div>

        <div className={"justify-center items-center mt-[20px] flex"}>
            <Button title="Contact us" classes={buttonSecondaryStyle + " max-w-[150px]"} click={()=> {}} />
        </div> */}
    </div>);

}

export default LoginForm;