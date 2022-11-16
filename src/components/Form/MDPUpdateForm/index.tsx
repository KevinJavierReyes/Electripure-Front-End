import { useState } from 'react';
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { CreateMDPDataForm, SiteManagerDataForm } from '../../../interfaces/form';
import { InputControl, MDPGroup } from '../../../interfaces/form-control';
import { validateCellphone, validateCellphoneControl, validateEmailControl, validateName, validateNameControl } from '../../../libs/form-validation';
import { ButtonLink, ButtonPrimary, ButtonSecondary } from '../../FormInput/Button';
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";
import StepperProgress from "../../StepperProgress";



function MDPUpdateForm({onSubmit, onPrevious}: { onSubmit: (data: CreateMDPDataForm[]) => void, onPrevious: () => void }) {

    const [mdps, setMdps] = useState(JSON.stringify([{
        "name": {
          "value": "",
          "message": "",
          "status": INPUT_CONTROL_STATE.DEFAULT
        },
        "meterId": {
          "value": "",
          "message": "",
          "status": INPUT_CONTROL_STATE.DEFAULT
        },
        "applianceId": {
          "value": "",
          "message": "",
          "status": INPUT_CONTROL_STATE.DEFAULT
        },
        "ampCap": {
            "value": "",
            "message": "",
            "status": INPUT_CONTROL_STATE.DEFAULT
        },
        "switchgearCap": {
            "value": "",
            "message": "",
            "status": INPUT_CONTROL_STATE.DEFAULT
        },
        "transformer": {
            "value": "",
            "message": "",
            "status": INPUT_CONTROL_STATE.DEFAULT
        }
    }]));

    function submit() {
        const mdpgs: MDPGroup[] = JSON.parse(mdps);
        const mdpsErrorFiltered: MDPGroup[] = mdpgs.filter((mdpg: MDPGroup) => {
            return mdpg.ampCap.state != INPUT_CONTROL_STATE.OK ||
                    // mdpg.applianceId.state != INPUT_CONTROL_STATE.OK ||
                    // mdpg.meterId.state != INPUT_CONTROL_STATE.OK ||
                    mdpg.name.state != INPUT_CONTROL_STATE.OK ||
                    mdpg.switchgearCap.state != INPUT_CONTROL_STATE.OK ||
                    mdpg.transformer.state != INPUT_CONTROL_STATE.OK;
        });

        if (mdpsErrorFiltered.length == 0) {
            onSubmit(mdpgs.map((mdp: MDPGroup) => {
                return {
                    "name": mdp.name.value,
                    "meterId": mdp.meterId.value,
                    "applianceId": mdp.applianceId.value,
                    "ampCap": mdp.ampCap.value,
                    "switchgearCap": mdp.switchgearCap.value,
                    "transformer": mdp.transformer.value
                };
            }))
        }
    }

    function addMdp() {
        const mdpgs: MDPGroup[] =  JSON.parse(mdps);
        setMdps(JSON.stringify([...mdpgs, {
            "name": {
              "value": "",
              "message": "",
              "status": INPUT_CONTROL_STATE.DEFAULT
            },
            "meterId": {
              "value": "",
              "message": "",
              "status": INPUT_CONTROL_STATE.DEFAULT
            },
            "applianceId": {
              "value": "",
              "message": "",
              "status": INPUT_CONTROL_STATE.DEFAULT
            },
            "ampCap": {
                "value": "",
                "message": "",
                "status": INPUT_CONTROL_STATE.DEFAULT
            },
            "switchgearCap": {
                "value": "",
                "message": "",
                "status": INPUT_CONTROL_STATE.DEFAULT
            },
            "transformer": {
                "value": "",
                "message": "",
                "status": INPUT_CONTROL_STATE.DEFAULT
            }
        }]));
    }

    function setMdp(mdp: MDPGroup, index: number) {
        const mdpgs: MDPGroup[] =  JSON.parse(mdps);
        mdpgs[index] = mdp;
        setMdps(JSON.stringify(mdpgs));
    }

    function validateMdp(mdp: MDPGroup) {
        if (mdp.ampCap.value == "") {
            mdp.ampCap.state = INPUT_CONTROL_STATE.DEFAULT;
            mdp.ampCap.message = "";
        } else {
            mdp.ampCap.state = INPUT_CONTROL_STATE.OK;
            mdp.ampCap.message = "";
        }

        
        if (mdp.name.value == "") {
            mdp.name.state = INPUT_CONTROL_STATE.DEFAULT;
            mdp.name.message = "";
        } else {
            const nameResult = validateName(mdp.name.value);
            if (nameResult.valid) {
                mdp.name.state = INPUT_CONTROL_STATE.OK;
                mdp.name.message = "";
            } else {
                mdp.name.message = nameResult.error!;
                mdp.name.state = INPUT_CONTROL_STATE.ERROR;
            }
        }

        if (mdp.applianceId.value == "") {
            mdp.applianceId.state = INPUT_CONTROL_STATE.DEFAULT;
            mdp.applianceId.message = "";
        } else {
            mdp.applianceId.state = INPUT_CONTROL_STATE.OK;
            mdp.applianceId.message = "";
        }
        

        if (mdp.meterId.value == "") {
            mdp.meterId.state = INPUT_CONTROL_STATE.DEFAULT;
            mdp.meterId.message = "";
        } else {
            mdp.meterId.state = INPUT_CONTROL_STATE.OK;
            mdp.meterId.message = "";
        }
        
        if (mdp.switchgearCap.value == "") {
            mdp.switchgearCap.state = INPUT_CONTROL_STATE.DEFAULT;
            mdp.switchgearCap.message = "";
        } else {
            mdp.switchgearCap.state = INPUT_CONTROL_STATE.OK;
            mdp.switchgearCap.message = "";
        }
        
        if (mdp.transformer.value == "") {
            mdp.transformer.state = INPUT_CONTROL_STATE.DEFAULT;
            mdp.transformer.message = "";
        } else {
            mdp.transformer.state = INPUT_CONTROL_STATE.OK;
            mdp.transformer.message = "";
        }
        return mdp;
    }


    return (<div className="w-full bg-color-white p-[10px]">
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Update MDP information"/>
        </div>
        {(JSON.parse(mdps) as MDPGroup[]).map((mdp: MDPGroup, index: number)=> {
            return <div key={index} style={{marginTop: index == 0 ? "0px" : "20px" }}>
                <h3 className="color-primary-dark f-bold subtitle">{"MDP #" + (index + 1)}</h3>
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                <InputText
                    name={"name" + index}
                    placeholder="MDP name"
                    label="MDP Name"
                    onChange={(value: string)=> {
                        const mdpValidated: any = validateMdp({
                            ...mdp,
                            "name": {
                                ...mdp.name,
                                "value": value 
                            }
                        });
                        setMdp(mdpValidated, index);
                    }}
                    state={mdp.name.state}
                    message={mdp.name.message}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                <InputText
                    name={"meter" + index}
                    placeholder="123456"
                    label="Meter ID"
                    onChange={(value: string)=> {
                        const mdpValidated: any = validateMdp({
                            ...mdp,
                            "meterId": {
                                ...mdp.meterId,
                                "value": value 
                            }
                        });
                        setMdp(mdpValidated, index);
                    }}
                    state={mdp.meterId.state}
                    message={mdp.meterId.message}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                <InputText
                    name={"appliance" + index}
                    placeholder="123456"
                    label="Appliance ID"
                    onChange={(value: string)=> {
                        const mdpValidated: any = validateMdp({
                            ...mdp,
                            "applianceId": {
                                ...mdp.applianceId,
                                "value": value 
                            }
                        });
                        setMdp(mdpValidated, index);
                    }}
                    state={mdp.applianceId.state}
                    message={mdp.applianceId.message}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                <InputText
                    name={"ampCap" + index}
                    placeholder="400"
                    label="MDP Amp cap"
                    onChange={(value: string)=> {
                        const mdpValidated: any = validateMdp({
                            ...mdp,
                            "ampCap": {
                                ...mdp.ampCap,
                                "value": value 
                            }
                        });
                        setMdp(mdpValidated, index);
                    }}
                    state={mdp.ampCap.state}
                    message={mdp.ampCap.message}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                <InputText
                    name={"switchgearCap" + index}
                    placeholder="2000"
                    label="Switchgear cap"
                    onChange={(value: string)=> {
                        const mdpValidated: any = validateMdp({
                            ...mdp,
                            "switchgearCap": {
                                ...mdp.switchgearCap,
                                "value": value 
                            }
                        });
                        setMdp(mdpValidated, index);
                    }}
                    state={mdp.switchgearCap.state}
                    message={mdp.switchgearCap.message}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                <InputText
                    name={"transformer" + index}
                    placeholder="2000"
                    label="Transformer"
                    onChange={(value: string)=> {
                        const mdpValidated: any = validateMdp({
                            ...mdp,
                            "transformer": {
                                ...mdp.transformer,
                                "value": value 
                            }
                        });
                        setMdp(mdpValidated, index);
                    }}
                    state={mdp.transformer.state}
                    message={mdp.transformer.message}
                />
            </div>;
        })}
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
