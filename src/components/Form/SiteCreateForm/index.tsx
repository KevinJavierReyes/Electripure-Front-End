import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SendImage } from '../../../actions/electripure';
import { INPUT_CONTROL_STATE, TASK_STATE, TYPE_SPACE } from "../../../config/enum";
import { TaskEntity } from '../../../interfaces/entities';
import { SiteCreateDataForm } from '../../../interfaces/form';
import { InputControl } from '../../../interfaces/form-control';
import { ElectripureState } from '../../../interfaces/reducers';
import { validateAddressControl, validateCityControl, validateCompany, validateRequiredControl, validateSiteNameControl, validateZipControl, validateEmail, validateCellphone } from '../../../libs/form-validation';
import { ButtonPrimary, ButtonSecondary } from '../../FormInput/Button';
import InputPhoto from "../../FormInput/InputPhoto";
import InputSelect from '../../FormInput/InputSelect';
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";
import StepperProgress from "../../StepperProgress";



function SiteCreateForm({onSubmit, defaultData={}}: { onSubmit: (data: SiteCreateDataForm) => void, defaultData?: Partial<SiteCreateDataForm>}) {

    const dispatch = useDispatch();

    const stateList: string[] = [
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
        ];

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

    const [managerFullName, setManagerFullName] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [managerEmail, setManagerEmail] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [managerCellphone, setManagerCellphone] = useState({
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
            "value": base64.split(",")[1],
            "message": "",
            "state": INPUT_CONTROL_STATE.OK
        });
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
            "value": base64.split(",")[1],
            "message": "",
            "state": INPUT_CONTROL_STATE.OK
        });
    }

    function submit() {
        if (nameControl.state == INPUT_CONTROL_STATE.OK &&
            addressControl.state == INPUT_CONTROL_STATE.OK &&
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
                    "payment": rateControl.value,
                    "manager_fullname": managerFullName.value,
                    "manager_email": managerEmail.value,
                    "manager_cellphone": managerCellphone.value,
                    "logo": logoControl.value,
                    "schematic": logoControl.value
                });
        } else {
            setNameControl(validateRequiredControl(nameControl));
            setAddressControl(validateRequiredControl(addressControl));
            setCityControl(validateRequiredControl(cityControl));
            setStateControl(validateRequiredControl(stateControl));
            setZipControl(validateRequiredControl(zipControl));
            setRateControl(validateRequiredControl(rateControl));
            setSchematicControl(validateRequiredControl(schematicControl));
            setLogoControl(validateRequiredControl(logoControl));

            setManagerFullName(validateRequiredControl(managerFullName));
            setManagerEmail(validateRequiredControl(managerEmail));
            setManagerCellphone(validateRequiredControl(managerCellphone));
        }
    }

    return (<div className="w-full bg-color-white p-[10px]">
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Create Site"/>
        </div>
        <div className="w-full flex">
            <div className="w-[100px] p-[5px] h-[100px]">
                <InputPhoto name="siteLogo" placeholder="" onChange={uploadLogo} state={logoControl.state} message={logoControl.message}/>
            </div>
            <div className="w-full pl-[20px]">
                <InputText
                    name="name"
                    label="Site Name"
                    placeholder="Site name"
                    state={nameControl.state}
                    message={nameControl.message}
                    onChange={(value: string) => {
                        const newNameControl: InputControl = validateSiteNameControl(value);
                        setNameControl(newNameControl);
                    }}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                <div>
                    <InputText
                        name="address"
                        label="Address"
                        placeholder="12345 Street Address"
                        state={addressControl.state}
                        defaultValue={defaultData.address ?? ""}
                        message={addressControl.message}
                        onChange={(value: string) => {
                            const newAddressControl: InputControl = validateAddressControl(value);
                            setAddressControl(newAddressControl);
                        }}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                    <InputText
                        name="address2"
                        label="Address 2 optional"
                        placeholder="Suite 890"
                        defaultValue={defaultData.address2 ?? ""}
                        state={address2Control.state}
                        message={address2Control.message}
                        onChange={(value: string) => {
                            const newAddressControl: InputControl = validateAddressControl(value);
                            setAddress2Control(newAddressControl);
                        }}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                    <InputText
                        name="Manager Fullname"
                        label="Manager Fullname"
                        placeholder="Manager Name"
                        defaultValue=""
                        state={managerFullName.state}
                        message={managerFullName.message}
                        onChange={(value: string) => {
                            const managerNameValidated: InputControl = validateSiteNameControl(value);
                            setManagerFullName(managerNameValidated);
                        }}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                    <InputText
                        name="Manager email"
                        label="Manager Email"
                        placeholder="Manager Email"
                        defaultValue=""
                        state={managerEmail.state}
                        message={managerEmail.message}
                        onChange={(value: string) => {
                            const emailValidated = validateEmail(value);
                            setManagerEmail({
                                "state": emailValidated.valid ? INPUT_CONTROL_STATE.OK: INPUT_CONTROL_STATE.ERROR,
                                "value": value,
                                "message": emailValidated.valid ? "": "Email not valid" 
                            });
                        }}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                    <InputText
                        name="Manager cellphone"
                        label="Manager cellphone"
                        placeholder=" 123 456 789"
                        defaultValue=""
                        state={managerCellphone.state}
                        message={managerCellphone.message}
                        onChange={(value: string) => {
                            const cellphoneValidated = validateCellphone(value);
                            setManagerCellphone({
                                "state" : cellphoneValidated.valid ? INPUT_CONTROL_STATE.OK: INPUT_CONTROL_STATE.ERROR,
                                "value" : value,
                                "message" : cellphoneValidated.valid ? "": "Cellphone not valid"
                            })
                        }}
                    />
                    <div className="flex">
                        <InputText
                            name="city"
                            label="City"
                            placeholder="City"
                            defaultValue={defaultData.city ?? ""}
                            state={cityControl.state}
                            message={cityControl.message}
                            onChange={(value: string) => {
                                const newCityControl: InputControl = validateCityControl(value);
                                setCityControl(newCityControl);
                            }}
                        />
                        <Space classes="w-[60px]"/>
                        <InputSelect
                            name="state"
                            label="State"
                            options={stateList.map((value, index) => (
                                {"id": index, "value": value}
                            ))}
                            defaultSelect={defaultData.state ?? "-1"}
                            placeholder="Select State"
                            state={stateControl.state}
                            message={stateControl.message}
                            onChange={(select : { "value": any, "id": any }) => {
                                setStateControl({
                                    "state": INPUT_CONTROL_STATE.OK,
                                    "message": "",
                                    "value": select.id
                                });
                            }}
                        />
                        <Space classes="w-[60px]"/>
                        <InputText
                            name="zip"
                            label="Zipcode"
                            placeholder="Zip"
                            defaultValue={defaultData.zip ?? ""}
                            state={zipControl.state}
                            message={zipControl.message}
                            onChange={(value: string) => {
                                const newZipControl: InputControl = validateZipControl(value);
                                setZipControl(newZipControl);
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
            <InputPhoto name="schematic" placeholder="Add site schematic" onChange={uploadSchematic} state={schematicControl.state} message={schematicControl.message}/>
        </div>
        <Space classes="w-full h-[50px]" />
        <div className="w-full max-w-[400px] mx-auto flex">
            <ButtonPrimary onClick={submit}>
                Create
            </ButtonPrimary>
        </div>

    </div>);
}

export default SiteCreateForm;
