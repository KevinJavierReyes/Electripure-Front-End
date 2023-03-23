import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SendImage } from '../../../actions/electripure';
import { INPUT_CONTROL_STATE, TASK_STATE, TYPE_SPACE } from "../../../config/enum";
import { TaskEntity } from '../../../interfaces/entities';
import { SiteUpdateDataForm } from '../../../interfaces/form';
import { ElectripureState } from '../../../interfaces/reducers';
import { ButtonPrimary, ButtonSecondary } from '../../FormInput/Button';
import InputPhoto from "../../FormInput/InputPhoto";
import InputSelect from '../../FormInput/InputSelect';
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";
import environment from "./../../../config/env";


const SiteUpdateForm = ({onSubmit, siteId}: { onSubmit: (data: SiteUpdateDataForm) => void, siteId: number}) => {
    const stateOptions = environment.STATES.map((value,index) => ({"id": index + 1, "value":value}));
    const scheduleOptions = environment.RATE_SCHEDULE;
    const dispatch = useDispatch();
    const company = JSON.parse(useSelector((state: ElectripureState) => state.companyDetails));
    const site = company.sites.filter((element:any)=> element.id === siteId)[0];
    console.log("Site", site)
    // Upload images
    const [logoId, setLogoId] = useState(site.id_image);
    const [schematicId, setSchematicId] = useState(site.id_esquematico);
    const uploadLogoTask: TaskEntity = JSON.parse(useSelector((state: ElectripureState) => state.tasks))["UPLOAD_SITE_LOGO"] ?? {};
    const uploadSchematicTask: TaskEntity = JSON.parse(useSelector((state: ElectripureState) => state.tasks))["UPLOAD_SITE_SCHEMATIC"] ?? {};

    useEffect(()=> {
        if (uploadLogoTask.state == TASK_STATE.COMPLETED) {
            setLogoId(uploadLogoTask.result);
        }
    }, [uploadLogoTask.state]);

    useEffect(()=> {
        if (uploadSchematicTask.state == TASK_STATE.COMPLETED) {
            setSchematicId(uploadSchematicTask.result);
        }
    }, [uploadSchematicTask.state]);

    const [nameControl, setNameControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": site?.name,
        "message": ""
    });

    const [addressControl, setAddressControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": site?.address,
        "message": ""
    });

    const [address2Control, setAddress2Control] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": site?.address,
        "message": ""
    });

    const [cityControl, setCityControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": site?.address2,
        "message": ""
    });

    const [stateControl, setStateControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": site?.state,
        "message": ""
    });

    const [zipControl, setZipControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": site?.zip,
        "message": ""
    });

    const [rateControl, setRateControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": site?.payment,
        "message": ""
    });

    const [schematicControl, setSchematicControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": site?.schedule_image,
        "message": ""
    });

    const [logoControl, setLogoControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": site?.site_image,
        "message": ""
    });

    function uploadLogo({base64, size}:{base64: string, size: number}) {
        if (size > 500000) {
            setLogoControl({
                "message": "Image max size is 500kb.",
                "state": INPUT_CONTROL_STATE.ERROR,
                "value": "",
            });
            return;
        }
        setLogoControl({
            "state": INPUT_CONTROL_STATE.DEFAULT,
            "value": base64,
            "message": ""
        });
        dispatch(SendImage({
            "base64": base64.split(",")[1],
            "taskKey": "UPLOAD_SITE_LOGO"
        }));
    }

    function uploadSchematic({base64, size}:{base64: string, size: number}) {
        if (size > 500000) {
            setSchematicControl({
                "message": "Image max size is 500kb.",
                "state": INPUT_CONTROL_STATE.ERROR,
                "value": "",
            });
            return;
        }
        setSchematicControl({
            "state": INPUT_CONTROL_STATE.OK,
            "value": base64,
            "message": ""

        })
        dispatch(SendImage({
            "base64": base64.split(",")[1],
            "taskKey": "UPLOAD_SITE_SCHEMATIC"
        }));
    }

    function submit() {
        onSubmit({
            site_id: siteId,
            schematic_id: schematicId,
            name: nameControl.value,
            address: addressControl.value,
            address2: address2Control.value,
            city: cityControl.value,
            state: stateControl.value,
            zip: zipControl.value,
            logo_id: logoId,
            payment: rateControl.value,
        });
    }

    useEffect(() => {
    }, []);

    return (<div className="w-full bg-color-white p-[10px]">
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Edit Site information"/>
        </div>
        <div className="w-full flex">
            <div className="w-[100px] p-[5px] h-[100px]">
                <InputPhoto name="siteLogo" placeholder="" src={logoControl.value} onChange={uploadLogo} state={logoControl.state} message={logoControl.message}/>
            </div>
            <div className="w-full pl-[20px]">
                <InputText
                    name="name"
                    label="Site Name"
                    placeholder="Site name"
                    state={nameControl.state}
                    message={nameControl.message}
                    defaultValue={site.name}
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
                        defaultValue={site.address}
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
                        defaultValue={site.address2}
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
                            defaultValue={site.city}
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
                            options={stateOptions}
                            defaultSelect={site?.state ? `${stateOptions.filter((option, index) => option.value == site?.state)[0].id}` : "-1"}
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
                            defaultValue={site.zip}
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
                        options={scheduleOptions}
                        placeholder="Select payment schedule"
                        state={rateControl.state}
                        defaultSelect={site?.payment ? `${scheduleOptions.filter((option, index) => option.value == site?.payment)[0].id}` : "-1"}
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
            <InputPhoto name="schematic" placeholder="Add site schematic" src={schematicControl.value} onChange={uploadSchematic} state={schematicControl.state} message={schematicControl.message}/>
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


export default SiteUpdateForm;
