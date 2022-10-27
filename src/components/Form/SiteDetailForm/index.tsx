import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SendImage } from '../../../actions/electripure';
import { INPUT_CONTROL_STATE, TASK_STATE, TYPE_SPACE } from "../../../config/enum";
import { TaskEntity } from '../../../interfaces/entities';
import { SiteDetailDataForm } from '../../../interfaces/form';
import { ElectripureState } from '../../../interfaces/reducers';
import { ButtonPrimary, ButtonSecondary } from '../../FormInput/Button';
import InputPhoto from "../../FormInput/InputPhoto";
import InputSelect from '../../FormInput/InputRadioGroup';
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";
import StepperProgress from "../../StepperProgress";



function SiteDetailForm({onSubmit, onPrevious}: { onSubmit: (data: SiteDetailDataForm) => void, onPrevious: () => void }) {

    const dispatch = useDispatch();

    const uploadLogoTask: TaskEntity = JSON.parse(useSelector((state: ElectripureState) => state.tasks))["UPLOAD_SITE_LOGO"] ?? {};
    const uploadSchematicTask: TaskEntity = JSON.parse(useSelector((state: ElectripureState) => state.tasks))["UPLOAD_SITE_SCHEMATIC"] ?? {};

    const [nameControl, setNameControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [addressControl, setAddressControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [address2Control, setAddress2Control] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [cityControl, setCityControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [stateControl, setStateControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [zipControl, setZipControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [rateControl, setRateControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [schematicControl, setSchematicControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [logoControl, setLogoControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    function uploadLogo(base64: string) {
        dispatch(SendImage({
            "base64": base64.split(",")[1],
            "taskKey": "UPLOAD_SITE_LOGO"
        }));
    }

    function uploadSchematic(base64: string) {
        dispatch(SendImage({
            "base64": base64.split(",")[1],
            "taskKey": "UPLOAD_SITE_SCHEMATIC"
        }));
    }

    function submit() {

        if (nameControl.state == INPUT_CONTROL_STATE.OK &&
            addressControl.state == INPUT_CONTROL_STATE.OK &&
            // address2Control.state == INPUT_CONTROL_STATE.OK &&
            cityControl.state == INPUT_CONTROL_STATE.OK &&
            stateControl.state == INPUT_CONTROL_STATE.OK &&
            zipControl.state == INPUT_CONTROL_STATE.OK &&
            rateControl.state == INPUT_CONTROL_STATE.OK &&
            schematicControl.state == INPUT_CONTROL_STATE.OK &&
            logoControl.state == INPUT_CONTROL_STATE.OK) {
                onSubmit({
                    "name": nameControl.value,
                    "address": addressControl.value,
                    "address2": address2Control.value,
                    "city": cityControl.value,
                    "state": stateControl.value,
                    "zip": zipControl.value,
                    "rate": rateControl.value,
                    "logo": logoControl.value,
                    "schematic": logoControl.value
                });
        }
    }

    useEffect(() => {
        if (uploadLogoTask.state == TASK_STATE.COMPLETED) {
            setLogoControl({
                ...logoControl,
                "state": INPUT_CONTROL_STATE.OK,
                "value": uploadLogoTask.result,
            })
        }
    }, [uploadLogoTask.state]);

    useEffect(() => {
        if (uploadSchematicTask.state == TASK_STATE.COMPLETED) {
            setSchematicControl({
                ...logoControl,
                "state": INPUT_CONTROL_STATE.OK,
                "value": uploadSchematicTask.result,
            })
        }
    }, [uploadSchematicTask.state]);

    return (<div className="w-full bg-color-white p-[10px]">
        <div className="mx-auto w-full max-w-[400px]">
            <StepperProgress completedSteps={4} totalSteps={5}/>
        </div>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Lets get some site details"/>
        </div>
        <div className="w-full flex">
            <div className="w-[100px] p-[5px] h-[100px]">
                <InputPhoto name="siteLogo" placeholder="" onChange={uploadLogo}/>
            </div>
            <div className="w-full pl-[20px]">
                <InputText
                    name="name"
                    label="Site Name"
                    placeholder="Site name"
                    state={nameControl.state}
                    message={nameControl.message}
                    onChange={(value: string) => {
                        setNameControl({
                            "state": value == "" ? INPUT_CONTROL_STATE.DEFAULT : INPUT_CONTROL_STATE.OK,
                            "message": "",
                            "value": value
                        });
                    }}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                <div>
                    <InputText
                        name="address"
                        label="Address"
                        placeholder="12345 Street Address"
                        state={addressControl.state}
                        message={addressControl.message}
                        onChange={(value: string) => {
                            setAddressControl({
                                "state": value == "" ? INPUT_CONTROL_STATE.DEFAULT : INPUT_CONTROL_STATE.OK,
                                "message": "",
                                "value": value
                            });
                        }}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                    <InputText
                        name="address2"
                        label="Address 2 optional"
                        placeholder="Suite 890"
                        state={address2Control.state}
                        message={address2Control.message}
                        onChange={(value: string) => {
                            setAddress2Control({
                                "state": value == "" ? INPUT_CONTROL_STATE.DEFAULT : INPUT_CONTROL_STATE.OK,
                                "message": "",
                                "value": value
                            });
                        }}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                    <div className="flex">
                        <InputText
                            name="city"
                            label="City"
                            placeholder="City"
                            state={cityControl.state}
                            message={cityControl.message}
                            onChange={(value: string) => {
                                setCityControl({
                                    "state": value == "" ? INPUT_CONTROL_STATE.DEFAULT : INPUT_CONTROL_STATE.OK,
                                    "message": "",
                                    "value": value
                                });
                            }}
                        />
                        <Space classes="w-[60px]"/>
                        <InputSelect
                            name="state"
                            label="State"
                            options={[{
                                "id": 1,
                                "value": "State 01"
                            }]}
                            placeholder="Select State"
                            state={stateControl.state}
                            message={stateControl.message}
                            onChange={(select : { "value": any, "id": any }) => {
                                setStateControl({
                                    "state": INPUT_CONTROL_STATE.OK,
                                    "message": "",
                                    "value": select.value
                                });
                            }}
                        />
                        <Space classes="w-[60px]"/>
                        <InputText
                            name="zip"
                            label="Zipcode"
                            placeholder="Zip"
                            state={zipControl.state}
                            message={zipControl.message}
                            onChange={(value: string) => {
                                setZipControl({
                                    "state": value == "" ? INPUT_CONTROL_STATE.DEFAULT : INPUT_CONTROL_STATE.OK,
                                    "message": "",
                                    "value": value
                                });
                            }}
                        />
                    </div>
                    <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                </div>
                <InputSelect
                        name="rate"
                        label="Rate schedule"
                        options={[{
                            "id": 1,
                            "value": "6"
                        }, {
                            "id": 1,
                            "value": "6A"
                        }, {
                            "id": 1,
                            "value": "6B"
                        }, {
                            "id": 1,
                            "value": "8"
                        }, {
                            "id": 1,
                            "value": "9"
                        }]}
                        placeholder="Select payment schedule"
                        state={rateControl.state}
                        message={rateControl.message}
                        onChange={(select : { "value": any, "id": any }) => {
                            setRateControl({
                                "state": INPUT_CONTROL_STATE.OK,
                                "message": "",
                                "value": select.value
                            });
                        }}
                    />
            </div>
        </div>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="w-full h-[150px]">
            <InputPhoto name="schematic" placeholder="Add site schematic" onChange={uploadSchematic}/>
        </div>
        <Space classes="w-full h-[50px]" />                
        <div className="w-full max-w-[400px] mx-auto flex">
            <ButtonSecondary onClick={onPrevious}>
                Previous
            </ButtonSecondary>
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL} />
            <ButtonPrimary onClick={submit}>
                Next
            </ButtonPrimary>
        </div>

    </div>);
}


export default SiteDetailForm;