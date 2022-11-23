import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SendImage } from '../../../actions/electripure';
import { INPUT_CONTROL_STATE, TASK_STATE, TYPE_SPACE } from "../../../config/enum";
import { TaskEntity } from '../../../interfaces/entities';
import { CompanyInformationUpdateDataForm } from '../../../interfaces/form';
import { InputControl } from '../../../interfaces/form-control';
import { ElectripureState } from '../../../interfaces/reducers';
import { validateCompanyControl } from '../../../libs/form-validation';
import { ButtonPrimary } from '../../FormInput/Button';
import InputPhoto from "../../FormInput/InputPhoto";
import InputSelect from '../../FormInput/InputSelect';
import InputText from "../../FormInput/InputText";
import Title from "../../FormInput/Title";
import Space from "../../Space";
import { useParams } from "react-router";


function CompanyUpdateForm({onSubmit}: { onSubmit: (data: CompanyInformationUpdateDataForm) => void }) {

    const {ciaId} = useParams()
    const dispatch = useDispatch();
    const company = JSON.parse(useSelector((state: ElectripureState) => state.companyDetails));

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
        "value": company?.name,
        "message": ""
    });

    const [addressControl, setAddressControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": company?.address,
        "message": ""
    });

    const [address2Control, setAddress2Control] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": company?.address2,
        "message": ""
    });

    const [cityControl, setCityControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": company?.city,
        "message": ""
    });

    const [stateControl, setStateControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": company?.state,
        "message": ""
    });

    const [zipControl, setZipControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": company?.zip,
        "message": ""
    });

    const [logoControl, setLogoControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    function uploadLogo(base64: string) {
        setLogoControl({
            "state": INPUT_CONTROL_STATE.OK,
            "value": base64.split(",")[1],
            "message": ""
        })
    }

    function submit() {
        if (companyControl.state == INPUT_CONTROL_STATE.OK &&
            addressControl.state == INPUT_CONTROL_STATE.OK &&
            address2Control.state == INPUT_CONTROL_STATE.OK &&
            cityControl.state == INPUT_CONTROL_STATE.OK &&
            //stateControl.state == INPUT_CONTROL_STATE.OK &&
            zipControl.state == INPUT_CONTROL_STATE.OK ||
            logoControl.state == INPUT_CONTROL_STATE.OK) {
                onSubmit({
                    company: companyControl.value,
                    address: addressControl.value,
                    address2: address2Control.value,
                    city: cityControl.value,
                    state: stateControl.value,
                    zip: zipControl.value,
                    company_id: ciaId,
                    id_image: company.id_image,
                    image: logoControl.value
                })
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

    return (<div className="w-full bg-color-white p-[10px]">
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Update Company information"/>
        </div>
        <div className="w-full flex">
            <div className="w-[200px] p-[5px]  h-[200px]">
                <InputPhoto name="companyLogo" placeholder="Add company logo" onChange={uploadLogo}/>
            </div>
            <div className="w-full pl-[20px]">
                <InputText
                    name="company"
                    label="Company Name"
                    placeholder="Company name"
                    state={companyControl.state}
                    message={companyControl.message}
                    defaultValue={company.name}
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
                    defaultValue={company.address}
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
                    defaultValue={company.address2}
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
                        defaultValue={company.city}
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
                        //options={[{"id": "01", "value": "state 01"}, {"id": "02", "value": "state 02"}]}
                        options={stateList.map((value, index) => (
                            {"id": index, "value": value}
                        ))}
                        placeholder="Select State"
                        state={stateControl.state}
                        defaultSelect={company.state}
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
                        defaultValue={company.zip}
                        onChange={(value: string) => {
                            setZipControl({
                                "state": value == "" ? INPUT_CONTROL_STATE.DEFAULT : INPUT_CONTROL_STATE.OK,
                                "message": "",
                                "value": value
                            });
                        }}
                    />
                </div>
            </div>
        </div>
        <Space classes="w-full h-[50px]" />
        <div className="w-[160px] mx-auto">
            <ButtonPrimary onClick={submit}>
                Update
            </ButtonPrimary>
        </div>

    </div>);
}


export default CompanyUpdateForm;
