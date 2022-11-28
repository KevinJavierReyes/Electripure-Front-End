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
import StepperProgress from "../../StepperProgress";


const SiteUpdateForm = ({onSubmit, siteId}: { onSubmit: (data: SiteUpdateDataForm) => void, siteId: number}) => {

    const dispatch = useDispatch();
    const company = JSON.parse(useSelector((state: ElectripureState) => state.companyDetails));
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

   const site = company.sites.filter((element:any)=> element.id === siteId)[0]
    console.log("form id", siteId)
    console.log("site", site)
    const uploadLogoTask: TaskEntity = JSON.parse(useSelector((state: ElectripureState) => state.tasks))["UPLOAD_SITE_LOGO"] ?? {};
    const uploadSchematicTask: TaskEntity = JSON.parse(useSelector((state: ElectripureState) => state.tasks))["UPLOAD_SITE_SCHEMATIC"] ?? {};

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
        "value": "",
        "message": ""
    });

    const [logoControl, setLogoControl] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "",
        "message": ""
    });

    function uploadLogo(base64: string) {
        setLogoControl({
            "state": INPUT_CONTROL_STATE.DEFAULT,
            "value": base64.split(",")[1],
            "message": ""
        })
    }

    function uploadSchematic(base64: string) {
        setSchematicControl({
            "state": INPUT_CONTROL_STATE.OK,
            "value": base64.split(",")[1],
            "message": ""

        })
    }

    function submit() {
        onSubmit({
            site_id: siteId,
            id_image: site.id_image ,
            name: nameControl.value,
            address: addressControl.value,
            address2: address2Control.value,
            city: cityControl.value,
            state: stateControl.value,
            zip: zipControl.value,
            image: logoControl.value,
            payment: rateControl.value,
            schematic: schematicControl.value
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
                <InputPhoto name="siteLogo" placeholder="" onChange={uploadLogo}/>
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
                            options={stateList.map((value,index) => ({"id": index, "value":value}))}
                            defaultSelect={site?.state}
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
                        defaultSelect={site.payment}
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
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL} />
            <ButtonPrimary onClick={submit}>
                Update
            </ButtonPrimary>
        </div>

    </div>);
}


export default SiteUpdateForm;
