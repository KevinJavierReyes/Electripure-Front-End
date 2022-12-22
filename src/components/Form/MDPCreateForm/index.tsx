import { useState } from 'react';
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { MDPDataForm, SiteManagerDataForm } from '../../../interfaces/form';
import { InputControl, MDPCreateGroup } from '../../../interfaces/form-control';
import { validateAmpsControl, validateApplianceControl, validateCellphone, validateCellphoneControl, validateEmailControl, validateMDPNameControl, validateMeterControl, validateName, validateNameControl, validateRequiredControl, validateSwitchgearControl, validateTransformerControl } from '../../../libs/form-validation';
import { ButtonLink, ButtonPrimary, ButtonSecondary } from '../../FormInput/Button';
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";
import StepperProgress from "../../StepperProgress";


function MDPCreateForm({onSubmit}: { onSubmit: (data: MDPDataForm) => void}) {

    const [ MDPname, setMDPname ]  = useState({
          "value": "",
          "message": "",
          "state": INPUT_CONTROL_STATE.DEFAULT
        })

    const [ meterID, setMeterID ] = useState({
          "value": "",
          "message": "",
          "state": INPUT_CONTROL_STATE.DEFAULT
        })

    const [ applianceID, setApplianceID ] = useState({
          "value": "",
          "message": "",
          "state": INPUT_CONTROL_STATE.DEFAULT
        })

    const [ MDP, setMDP ] = useState({
            "value": "",
            "message": "",
            "state": INPUT_CONTROL_STATE.DEFAULT
        })

    const [ switchgear, setSwitchgear ] = useState({
            "value": "",
            "message": "",
            "state": INPUT_CONTROL_STATE.DEFAULT
        })
    const [ transformer, setTransformer ] = useState({
            "value": "",
            "message": "",
            "state": INPUT_CONTROL_STATE.DEFAULT
        })

    function submit() {
        const mdpsErrorFiltered =  MDP.state === INPUT_CONTROL_STATE.OK && 
                                   applianceID.state === INPUT_CONTROL_STATE.OK  &&
                                   meterID.state === INPUT_CONTROL_STATE.OK && 
                                   MDPname.state === INPUT_CONTROL_STATE.OK && 
                                   switchgear.state === INPUT_CONTROL_STATE.OK  &&
                                   transformer.state === INPUT_CONTROL_STATE.OK;

        if(mdpsErrorFiltered){
            onSubmit({
                    MDPname: MDPname.value,
                    meterID: meterID.value,
                    applianceID: applianceID.value,
                    MDP: MDP.value,
                    switchgear: switchgear.value,
                    transformer: transformer.value
                    })
        }
    }

    return (
        <div className="w-full bg-color-white p-[10px]">
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Create New MDP"/>
        </div>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <InputText
            name={"name"}
            placeholder="MDP name"
            label="MDP Name"
            onChange={(value: string)=> {
                const mdpnameValidated: any = validateMDPNameControl(value);
                setMDPname(mdpnameValidated);
            }}
            state={MDPname.state}
            message={MDPname.message}
        />
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <InputText
            name={"meter"}
            placeholder="123456"
            label="Meter ID"
            onChange={(value: string)=> {
                const meteridValidated: any = validateMeterControl(value);
                setMeterID(meteridValidated)
            }}
            state={meterID.state}
            message={meterID.message}
        />
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <InputText
            name={"appliance"}
            placeholder="123456"
            label="Appliance ID"
            onChange={(value: string)=> {
                const applianceIDValidated: any = validateApplianceControl(value)
                setApplianceID(applianceIDValidated);
            }}
            state={applianceID.state}
            message={applianceID.message}
        />
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <InputText
            name={"ampCap"}
            placeholder="400"
            label="MDP Amp cap"
            onChange={(value: string)=> {
                const mdpValidated: any = validateAmpsControl(value)
                setMDP(mdpValidated);
            }}
            state={MDP.state}
            message={MDP.message}
        />
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <InputText
            name={"switchgearCap"}
            placeholder="2000"
            label="Switchgear cap"
            onChange={(value: string)=> {
                const switchgearValidated: any = validateSwitchgearControl(value)
                setSwitchgear(switchgearValidated);
            }}
            state={switchgear.state}
            message={switchgear.message}
        />
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <InputText
            name={"transformer"}
            placeholder="2000"
            label="Transformer"
            onChange={(value: string)=> {
                const transformerValidated: any = validateTransformerControl(value)
                setTransformer(transformerValidated);
            }}
            state={transformer.state}
            message={transformer.message}
        />
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="w-full max-w-[400px] mx-auto flex">
            <ButtonPrimary onClick={submit}>
                Create
            </ButtonPrimary>
        </div>
    </div>);
}

export default MDPCreateForm;
