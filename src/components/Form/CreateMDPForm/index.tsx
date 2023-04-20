import { Fragment, useEffect, useState } from 'react';
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { CreateMDPDataForm, SiteManagerDataForm } from '../../../interfaces/form';
import { InputControl, MDPGroup } from '../../../interfaces/form-control';
import { validateAmpsControl, validateApplianceControl, validateCellphone, validateCellphoneControl, validateEmailControl, validateMDPNameControl, validateMeterControl, validateName, validateNameControl, validateRequiredControl, validateSwitchgearControl, validateTransformerControl } from '../../../libs/form-validation';
import { ButtonLink, ButtonPrimary, ButtonSecondary } from '../../FormInput/Button';
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";
import StepperProgress from "../../StepperProgress";
import Select, { StylesConfig } from 'react-select';
import mdpLogo from '../../../assets/img/mdp_icon.png';
import FinishCreateMDPForm from '../FinishCreateMDPForm';

function CreateMDPForm({schematicImg, onSubmit, onPrevious}: { schematicImg: string | null, onSubmit: (data: CreateMDPDataForm[]) => void, onPrevious: () => void }) {

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
        },
        "location": {
            "y": -1,
            "x": -1
        }
    }]));

    const [indexMdp, setIndexMdp] = useState(0);

    const [selectLocation, setSelectLocation] = useState(false);

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
                    "transformer": mdp.transformer.value,
                    "location": mdp.location
                };
            }))
        } else {
            [...mdpgs].forEach((mdpg: MDPGroup, index: number)=> {
                const mdpValidated: any = validateMdp({
                    ...mdpg,
                    "ampCap": validateRequiredControl(mdpg.ampCap),
                    "name": validateRequiredControl(mdpg.name),
                    "switchgearCap": validateRequiredControl(mdpg.switchgearCap),
                    "transformer": validateRequiredControl(mdpg.transformer)
                });
                setMdp(mdpValidated, index);
            });
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
            },
            "location": {
                "y": -1,
                "x": -1
            }
        }]));
    }

    useEffect(() => {
        setIndexMdp(JSON.parse(mdps).length - 1);
    }, [JSON.parse(mdps).length])

    function setMdp(mdp: MDPGroup, index: number) {
        const mdpgs: MDPGroup[] =  JSON.parse(mdps);
        mdpgs[index] = mdp;
        setMdps(JSON.stringify(mdpgs));
    }

    function validateMdp(mdp: MDPGroup) {
        // if (mdp.ampCap.value == "") {
        //     mdp.ampCap.state = INPUT_CONTROL_STATE.DEFAULT;
        //     mdp.ampCap.message = "";
        // } else {
        //     mdp.ampCap.state = INPUT_CONTROL_STATE.OK;
        //     mdp.ampCap.message = "";
        // }

        
        // if (mdp.name.value == "") {
        //     mdp.name.state = INPUT_CONTROL_STATE.DEFAULT;
        //     mdp.name.message = "";
        // } else {
        //     const nameResult = validateName(mdp.name.value);
        //     if (nameResult.valid) {
        //         mdp.name.state = INPUT_CONTROL_STATE.OK;
        //         mdp.name.message = "";
        //     } else {
        //         mdp.name.message = nameResult.error!;
        //         mdp.name.state = INPUT_CONTROL_STATE.ERROR;
        //     }
        // }

        // if (mdp.applianceId.value == "") {
        //     mdp.applianceId.state = INPUT_CONTROL_STATE.DEFAULT;
        //     mdp.applianceId.message = "";
        // } else {
        //     mdp.applianceId.state = INPUT_CONTROL_STATE.OK;
        //     mdp.applianceId.message = "";
        // }
        

        // if (mdp.meterId.value == "") {
        //     mdp.meterId.state = INPUT_CONTROL_STATE.DEFAULT;
        //     mdp.meterId.message = "";
        // } else {
        //     mdp.meterId.state = INPUT_CONTROL_STATE.OK;
        //     mdp.meterId.message = "";
        // }
        
        // if (mdp.switchgearCap.value == "") {
        //     mdp.switchgearCap.state = INPUT_CONTROL_STATE.DEFAULT;
        //     mdp.switchgearCap.message = "";
        // } else {
        //     mdp.switchgearCap.state = INPUT_CONTROL_STATE.OK;
        //     mdp.switchgearCap.message = "";
        // }
        
        // if (mdp.transformer.value == "") {
        //     mdp.transformer.state = INPUT_CONTROL_STATE.DEFAULT;
        //     mdp.transformer.message = "";
        // } else {
        //     mdp.transformer.state = INPUT_CONTROL_STATE.OK;
        //     mdp.transformer.message = "";
        // }
        return mdp;
    }

    const colourStyles: StylesConfig<any> = {
        control: (styles) => ({ ...styles, borderColor: "var(--color-black-light)", borderRadius: "none", boxShadow: "none", ":hover": {
            borderColor: "var(--color-black-light)"
        } }), // Set style for the control
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            ":hover": {
                ...styles[":hover"],
                backgroundColor: isSelected ? "white" : "var(--color-black-light)"
            },
            filter: isSelected ? "grayscale(100%)" : "grayscale(0%)",
            backgroundColor: isSelected ? "white" : "var(--color-white)",
          };
        }, // Set style for the options
        input: (styles) => ({ ...styles }),// Set style for the input selected
        placeholder: (styles) => ({ ...styles }), // Set style for the placeholder
        singleValue: (styles, { data }) => ({ ...styles }),
    };

    const mdpOptions = (JSON.parse(mdps) as MDPGroup[]).map((mdp: MDPGroup, index: number)=> {
        return {
            value: index,
            label: <div className="flex justify-start items-center">
                <img className="h-[45px] w-[45px]" src={mdpLogo}/>
                <span className="text-black ml-[5px] font-medium">MDP {index + 1}</span>
            </div>
        }
    });
    return (<Fragment>
        { !selectLocation ? <div className="w-full bg-color-white p-[10px]">
            <div className="mx-auto w-full max-w-[400px]">
                <StepperProgress completedSteps={5} totalSteps={5}/>
            </div>
            <Space type={TYPE_SPACE.INPUT_DISTANCE} />
            <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
                <Title title="Lastly the MDP(s) details"/>
            </div>

            <Select 
                value={mdpOptions[indexMdp]}
                styles={colourStyles}
                options={mdpOptions} onChange={(value: any)=> {
                    setIndexMdp(value.value);
                }}/>
            {(JSON.parse(mdps) as MDPGroup[]).map((mdp: MDPGroup, index: number)=> {
                return <div key={index} style={{marginTop: index == 0 ? "0px" : "20px" }}>
                    {/* <h3 className="color-primary-dark f-bold subtitle">{"MDP #" + (index + 1)}</h3> */}
                    <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                    <InputText
                        name={"name" + index}
                        placeholder="MDP name"
                        value={mdp.name.value}
                        label="MDP Name"
                        onChange={(value: string)=> {
                            const mdpValidated: any = validateMdp({
                                ...mdp,
                                "name": validateMDPNameControl(value)
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
                        value={mdp.meterId.value}
                        onChange={(value: string)=> {
                            const mdpValidated: any = validateMdp({
                                ...mdp,
                                "meterId": validateMeterControl(value)
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
                        value={mdp.applianceId.value}
                        onChange={(value: string)=> {
                            const mdpValidated: any = validateMdp({
                                ...mdp,
                                "applianceId": validateApplianceControl(value)
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
                        value={mdp.ampCap.value}
                        onChange={(value: string)=> {
                            const mdpValidated: any = validateMdp({
                                ...mdp,
                                "ampCap": validateAmpsControl(value)
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
                        value={mdp.switchgearCap.value}
                        onChange={(value: string)=> {
                            const mdpValidated: any = validateMdp({
                                ...mdp,
                                "switchgearCap": validateSwitchgearControl(value)
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
                        value={mdp.transformer.value}
                        onChange={(value: string)=> {
                            const mdpValidated: any = validateMdp({
                                ...mdp,
                                "transformer": validateTransformerControl(value)
                            });
                            setMdp(mdpValidated, index);
                        }}
                        state={mdp.transformer.state}
                        message={mdp.transformer.message}
                    />
                    {schematicImg != null ? 
                        <Fragment>
                            <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                            <div className="w-full max-w-[250px] mx-auto flex">
                                <ButtonSecondary onClick={() => {setSelectLocation(true)}}>
                                    { (JSON.parse(mdps) as MDPGroup[])[indexMdp].location.x == -1 ? "Add location to schematic" : "Update location to schematic"}
                                </ButtonSecondary>
                            </div>
                        </Fragment>
                    : ""}
                </div>;
            })[indexMdp]}
            {JSON.parse(mdps).length < 25 ?
                <div>
                    <Space type={TYPE_SPACE.INPUT_DISTANCE} />
                    <div className="w-full max-w-[200px] mx-auto flex justify-center">
                        <ButtonLink onClick={addMdp} classes="no-underline">
                            <span className="color-primary">+ Add another MDP</span>
                        </ButtonLink>
                    </div>
                </div>
            : ""}
            <Space classes="w-full h-[50px]" />                
            <div className="w-full max-w-[400px] mx-auto flex">
                <ButtonPrimary onClick={submit}>
                    Finish
                </ButtonPrimary>
            </div>

        </div> :
        <FinishCreateMDPForm point={{
            "x": (JSON.parse(mdps) as MDPGroup[])[indexMdp].location.x,
            "y": (JSON.parse(mdps) as MDPGroup[])[indexMdp].location.y,
            "width":40,
            "height":40
        }} image={schematicImg!} pointImage={mdpLogo} onSave={(point: { x: number, y: number, width: number, height: number})=>{
            const mdpValidated: any = validateMdp({
                ...JSON.parse(mdps)[indexMdp],
                "location": {
                    "x": point.x,
                    "y": point.y
                }
            });
            setMdp(mdpValidated, indexMdp);
            setSelectLocation(false);
        }}/> }
    </Fragment>);
}


export default CreateMDPForm;
