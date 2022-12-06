import { useState } from 'react';
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { SiteManagerDataForm } from '../../../interfaces/form';
import { InputControl } from '../../../interfaces/form-control';
import { validateCellphone, validateCellphoneControl, validateEmailControl, validateNameControl, validateRequiredControl } from '../../../libs/form-validation';
import formatter from '../../../libs/formatter';
import { ButtonPrimary, ButtonSecondary } from '../../FormInput/Button';
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";
import StepperProgress from "../../StepperProgress";



function SiteManagerForm({onSubmit, onPrevious}: { onSubmit: (data: SiteManagerDataForm) => void, onPrevious: () => void }) {

    const [cellPhone, setCellphone] = useState("");

    const [fullnameControl, setFullnameControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [emailControl, setEmailControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [cellphoneControl, setCellphoneControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    function submit() {
        if (fullnameControl.state == INPUT_CONTROL_STATE.OK &&
            emailControl.state == INPUT_CONTROL_STATE.OK &&
            cellphoneControl.state == INPUT_CONTROL_STATE.OK) {
                onSubmit({
                    "fullname": fullnameControl.value,
                    "email": emailControl.value,
                    "cellphone": cellphoneControl.value
                });
        } else {
            // Validate required fields
            setFullnameControl(validateRequiredControl(fullnameControl));
            setEmailControl(validateRequiredControl(emailControl));
            setCellphoneControl(validateRequiredControl(cellphoneControl));
        }
    }


    return (<div className="w-full bg-color-white p-[10px]">
        <div className="mx-auto w-full max-w-[400px]">
            <StepperProgress completedSteps={3} totalSteps={5}/>
        </div>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Who’s the site manager?"/>
        </div>
        <div className="w-full">
            <InputText
                name="fullname"
                label="Full Name"
                placeholder="John Doe"
                state={fullnameControl.state}
                message={fullnameControl.message}
                onChange={(value: string) => {
                   const newFullnameControl : InputControl = validateNameControl(value);
                   setFullnameControl(newFullnameControl);
                }}
            />
            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <InputText
                name="email"
                label="Email"
                placeholder="email@company.com"
                state={emailControl.state}
                message={emailControl.message}
                onChange={(value: string) => {
                    const newEmailControl: InputControl = validateEmailControl(value);
                    setEmailControl(newEmailControl);
                }}
            />
            <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
            <InputText
                name="cellphone"
                label="Cellphone"
                value={cellPhone}
                placeholder="(***) *** - ****"
                state={cellphoneControl.state}
                message={cellphoneControl.message}
                onChange={(value: string) => {
                    const cellphone = value.replace("-", "").replace("(", "").replace(")", "").replace(" ", "");

                    const newCellphoneControl: InputControl = validateCellphoneControl(cellphone);
                    setCellphoneControl(newCellphoneControl);

                    if (newCellphoneControl.state == INPUT_CONTROL_STATE.OK) {
                        setCellphone(formatter.toCellphoneFormat(cellphone));
                    } else {
                        setCellphone(value);
                    }
                    
                    setCellphoneControl(newCellphoneControl);
                }}
            />
        </div>
        <Space classes="w-full h-[50px]" />                
        <div className="w-full max-w-[400px] mx-auto flex">
            {/* <ButtonSecondary onClick={onPrevious}>
                Previous
            </ButtonSecondary>
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL} /> */}
            <ButtonPrimary onClick={submit}>
                Next
            </ButtonPrimary>
        </div>

    </div>);
}


export default SiteManagerForm;