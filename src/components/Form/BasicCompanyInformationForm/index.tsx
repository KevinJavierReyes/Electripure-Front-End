import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SendImage } from '../../../actions/electripure';
import { INPUT_CONTROL_STATE, TASK_STATE, TYPE_SPACE } from "../../../config/enum";
import { TaskEntity } from '../../../interfaces/entities';
import { BasicCompanyInformationDataForm } from '../../../interfaces/form';
import { InputControl } from '../../../interfaces/form-control';
import { ElectripureState } from '../../../interfaces/reducers';
import { validateAddressControl, validateCityControl, validateCompanyControl, validateRequiredControl, validateZipControl } from '../../../libs/form-validation';
import { ButtonPrimary } from '../../FormInput/Button';
import InputPhoto from "../../FormInput/InputPhoto";
import InputSelect from '../../FormInput/InputSelect';
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";
import StepperProgress from "../../StepperProgress";


function BasicCompanyInformationForm({onSubmit}: { onSubmit: (data: BasicCompanyInformationDataForm) => void }) {

    const dispatch = useDispatch();

    const uploadLogoTask: TaskEntity = JSON.parse(useSelector((state: ElectripureState) => state.tasks))["UPLOAD_LOGO"] ?? {};
    const stateList: any[] = [
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

    const [companyControl, setCompanyControl] = useState({
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

    const [logoControl, setLogoControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    const [logoValid, setLogoValid] = useState(false);

    function uploadLogo({base64, size}:{base64: string, size: number}) {
        if (size > 500000) {
            setLogoValid(false);
            setLogoControl({
                "message": "Image max size is 500kb.",
                "state": INPUT_CONTROL_STATE.ERROR,
                "value": "",
            });
            return;
        }
        setLogoValid(true);
        dispatch(SendImage({
            "base64": base64.split(",")[1],
            "taskKey": "UPLOAD_LOGO"
        }));
    }

    function submit() {
        if (companyControl.state == INPUT_CONTROL_STATE.OK &&
            addressControl.state == INPUT_CONTROL_STATE.OK &&
            cityControl.state == INPUT_CONTROL_STATE.OK &&
            stateControl.state == INPUT_CONTROL_STATE.OK &&
            zipControl.state == INPUT_CONTROL_STATE.OK &&
            logoControl.state == INPUT_CONTROL_STATE.OK) {
                onSubmit({
                    "company": companyControl.value,
                    "address": addressControl.value,
                    "address2": address2Control.value,
                    "city": cityControl.value,
                    "state": stateControl.value,
                    "zip": zipControl.value,
                    "logo": logoControl.value
                })
        } else {
            // Validate required fields
            setCompanyControl(validateRequiredControl(companyControl));
            setAddressControl(validateRequiredControl(addressControl));
            setCityControl(validateRequiredControl(cityControl));
            setStateControl(validateRequiredControl(stateControl));
            setZipControl(validateRequiredControl(zipControl));
            setLogoControl(validateRequiredControl(logoControl));
        }
    }

    useEffect(() => {
        if (uploadLogoTask.state == TASK_STATE.COMPLETED && logoValid) {
            setLogoControl({
                ...logoControl,
                "message": "",
                "state": INPUT_CONTROL_STATE.OK,
                "value": uploadLogoTask.result,
            });
        }
    }, [uploadLogoTask.state]);

    return (<div className="w-full bg-color-white p-[10px]">
        <div className="mx-auto w-full max-w-[400px]">
            <StepperProgress completedSteps={1} totalSteps={5}/>
        </div>
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Let's get some basic company information"/>
        </div>
        <div className="w-full flex">
            <div className="w-[200px] p-[5px]  h-[200px]">
                <InputPhoto name="companyLogo" placeholder="Add company logo" onChange={uploadLogo} state={logoControl.state} message={logoControl.message}/>
            </div>
            <div className="w-full pl-[20px]">
                <InputText
                    name="company"
                    label="Company Name"
                    placeholder="Company name"
                    state={companyControl.state}
                    message={companyControl.message}
                    onChange={(value: string) => {
                        const newCompanyControl: InputControl = validateCompanyControl(value);
                        setCompanyControl(newCompanyControl);
                    }}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                <InputText
                    name="address"
                    label="Address"
                    placeholder="12345 Street Address"
                    state={addressControl.state}
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
                    state={address2Control.state}
                    message={address2Control.message}
                    onChange={(value: string) => {
                        const newAddressControl: InputControl = validateAddressControl(value);
                        setAddress2Control(newAddressControl);
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
                        state={zipControl.state}
                        message={zipControl.message}
                        onChange={(value: string) => {
                            const newZipControl: InputControl = validateZipControl(value);
                            setZipControl(newZipControl);
                        }}
                    />
                </div>
            </div>
        </div>
        <Space classes="w-full h-[50px]" />                
        <div className="w-[160px] mx-auto">
            <ButtonPrimary onClick={submit}>
                Next
            </ButtonPrimary>
        </div>

    </div>);
}


export default BasicCompanyInformationForm;
