import { useState } from 'react';
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { SiteManagerDataForm } from '../../../interfaces/form';
import { InputControl } from '../../../interfaces/form-control';
import { validateCellphone, validateCellphoneControl, validateEmailControl, validateNameControl } from '../../../libs/form-validation';
import { ButtonPrimary, ButtonSecondary } from '../../FormInput/Button';
import Title from "../../FormInput/Title";
import Space from "../../Space";
import StepperProgress from "../../StepperProgress";
import mdpImg from "./../../../assets/img/mdp.png";


function FinishCreateMDPForm({onClose}: { onClose: () => void }) {

    return (<div className="w-full bg-color-white p-[10px]">
        <div className="mx-auto w-full max-w-[400px]">
            <StepperProgress completedSteps={5} totalSteps={5}/>
        </div>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Lastly the MDP(s) details"/>
        </div>
        <div className="w-full">
            <img src={mdpImg} />
        </div>
        <Space classes="w-full h-[50px]" />                
        <div className="w-full max-w-[160px] mx-auto flex">
            <ButtonSecondary onClick={onClose}>
                Cancel
            </ButtonSecondary>
        </div>

    </div>);
}


export default FinishCreateMDPForm;