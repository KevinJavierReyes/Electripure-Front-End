import { useState } from 'react';
import { INPUT_CONTROL_STATE, TYPE_SPACE } from '../../../config/enum';
import { RequestResetPasswordDataForm } from "../../../interfaces/form";
import { InputControl } from '../../../interfaces/form-control';
import { validateEmailControl } from '../../../libs/form-validation';
import { ButtonPrimary } from '../../FormInput/Button';
import InputText from '../../FormInput/InputText';
import Title from '../../FormInput/Title';
import Space from '../../Space';


function RequestResetPasswordForm({ onSubmit }: { onSubmit: (data: RequestResetPasswordDataForm) => void }) {

    const [emailControl, setEmailControl] = useState({
        "value": "",
        "message": "",
        "state": -1
    });

    function submit() {
        if (emailControl.state === INPUT_CONTROL_STATE.OK) {
            onSubmit({
                "email": emailControl.value
            });
        }
    }

    return (<div className="w-full bg-color-white p-[10px]">
        <Title title="Reset password"/>
        <p className="color-black-dark">
            Enter your email below and we will email you a temporary reset link.
            <br/>
            <br/>
            The reset link will expire after 24 hours.
        </p>
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
        <ButtonPrimary onClick={submit}>
            Submit
        </ButtonPrimary>
    </div>);
}

export default RequestResetPasswordForm;