import { useState } from 'react';
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { UpdateMDPDataForm } from '../../../interfaces/form';
import { InputControl, MDPGroup } from '../../../interfaces/form-control';
import { validateCellphone, validateCellphoneControl, validateEmailControl, validateName, validateNameControl } from '../../../libs/form-validation';
import { ButtonLink, ButtonPrimary, ButtonSecondary } from '../../FormInput/Button';
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";
import { ElectripureState } from '../../../interfaces/reducers';
import StepperProgress from "../../StepperProgress";
import { useDispatch, useSelector } from 'react-redux';


function MDPUpdateForm({onSubmit, siteId,  mdpId}: { onSubmit: (data: UpdateMDPDataForm) => void, siteId: number, mdpId:number }) {
    const dispatch = useDispatch();
    const sites = JSON.parse(useSelector((state: ElectripureState) => state.companyDetails)).sites;
    const MDPs = sites.filter((element:any) => element.id == siteId)[0].mdps;
    const MDP = MDPs?.filter((element: any) => element.id == mdpId)[0]
    // console.log("MDP", MDP)
    const [nameControl, setNameControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": MDP?.name,
        "message": ""
    });

    const [meterControl, setMeterControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": MDP?.meterID,
        "message": ""
    });

    const [applianceControl, setApplianceControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": MDP?.applianceID,
        "message": ""
    });

    const [MDPControl, setMDPControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": MDP?.MDP,
        "message": ""
    });

    const [switchgearControl, setSwitchgearControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": MDP?.switchgear,
        "message": ""
    });

    const [transformerControl, setTransformerControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": MDP?.transformer,
        "message": ""
    });

    function submit() {
        onSubmit({
            mdp_id: mdpId,
            MDPname: nameControl.value,
            meterID: meterControl.value,
            applianceID: applianceControl.value,
            MDP: MDPControl.value,
            switchgear: switchgearControl.value,
            transformer: transformerControl.value
        })
    }


    return (<div className="w-full bg-color-white p-[10px]">
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Update MDP information"/>
        </div>
        <div>
           <h3 className="color-primary-dark f-bold subtitle">{"MDP #" + mdpId }</h3>
           <Space type={TYPE_SPACE.INPUT_DISTANCE} />
           <InputText
               name={"name" + mdpId}
               placeholder="MDP name"
               label="MDP Name"
               defaultValue={MDP?.MDPname}
               onChange={(value: string)=> {
                   setNameControl({
                       "state": value == ""? INPUT_CONTROL_STATE.DEFAULT: INPUT_CONTROL_STATE.OK,
                       "message": "",
                       "value": value
                    });
               }}
               state={nameControl.state}
               message={nameControl.message}
           />
           <Space type={TYPE_SPACE.INPUT_DISTANCE} />
           <InputText
               name={"meter" + mdpId}
               placeholder="123456"
               label="Meter ID"
               defaultValue={MDP?.meterID}
               onChange={(value: string)=> {
                   setMeterControl({
                       "state": value == ""? INPUT_CONTROL_STATE.DEFAULT: INPUT_CONTROL_STATE.OK,
                       "message": "",
                       "value": value
                    });
               }}
               state={meterControl.state}
               message={meterControl.message}
           />
           <Space type={TYPE_SPACE.INPUT_DISTANCE} />
           <InputText
               name={"appliance" + mdpId}
               placeholder="123456"
               label="Appliance ID"
               defaultValue={MDP?.applianceID}
               onChange={(value: string)=> {
                   setApplianceControl({
                       "state": value == ""? INPUT_CONTROL_STATE.DEFAULT: INPUT_CONTROL_STATE.OK,
                       "message": "",
                       "value": value
                    });
               }}
               state={applianceControl.state}
               message={applianceControl.message}
           />
           <Space type={TYPE_SPACE.INPUT_DISTANCE} />
           <InputText
               name={"ampCap" + mdpId}
               placeholder="400"
               label="MDP Amp cap"
               defaultValue={MDP?.MDP}
               onChange={(value: string)=> {
                   setMDPControl({
                       "state": value == ""? INPUT_CONTROL_STATE.DEFAULT: INPUT_CONTROL_STATE.OK,
                       "message": "",
                       "value": value
                    });
               }}
               state={MDPControl.state}
               message={MDPControl.message}
           />
           <Space type={TYPE_SPACE.INPUT_DISTANCE} />
           <InputText
               name={"switchgearCap" + mdpId}
               placeholder="2000"
               label="Switchgear cap"
               defaultValue={MDP?.switchgear}
               onChange={(value: string)=> {
                   setSwitchgearControl({
                       "state": value == ""? INPUT_CONTROL_STATE.DEFAULT: INPUT_CONTROL_STATE.OK,
                       "message": "",
                       "value": value
                    });
               }}
               state={switchgearControl.state}
               message={switchgearControl.message}
           />
           <Space type={TYPE_SPACE.INPUT_DISTANCE} />
           <InputText
               name={"transformer" + mdpId}
               placeholder="2000"
               label="Transformer"
               defaultValue={MDP?.transformer}
               onChange={(value: string)=> {
                   setTransformerControl({
                       "state": value == ""? INPUT_CONTROL_STATE.DEFAULT: INPUT_CONTROL_STATE.OK,
                       "message": "",
                       "value": value
                    });
               }}
               state={transformerControl.state}
               message={transformerControl.message}
           />
        </div>
        <Space classes="w-full h-[50px]" />                
        <div className="w-full max-w-[400px] mx-auto flex">
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL} />
            <ButtonPrimary onClick={submit}>
                Update
            </ButtonPrimary>
        </div>
    </div>);
}


export default MDPUpdateForm;
