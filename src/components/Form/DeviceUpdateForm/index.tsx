import { UpdateDeviceDataForm } from "../../../interfaces/form"
import { useState } from 'react';
import Space from "../../Space";
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import Title from "../../FormInput/Title";
import InputText from "../../FormInput/InputText";
import InputSelect from "../../FormInput/InputSelect";
import { ButtonPrimary } from '../../FormInput/Button';
import { DeviceData } from "../../../interfaces/entities"
import { validateSerialControl, validateRequiredControl} from "../../../libs/form-validation"
import { InputControl } from '../../../interfaces/form-control';


const DeviceUpdateForm = ({device, onSubmit}:{device: DeviceData, onSubmit: (data: UpdateDeviceDataForm) => void}) =>{
    
    const [ deviceSetControl, setDeviceControl ] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": "", 
        "message": ""
    })

    const [ serialControl, setSerialControl ] = useState({
        "state": INPUT_CONTROL_STATE.DEFAULT,
        "value": device.serial_number.toString(), 
        "message": ""
    })
    function submit(){
        if(serialControl.state == INPUT_CONTROL_STATE.OK &&
            deviceSetControl.state == INPUT_CONTROL_STATE.OK){
            onSubmit({
                device_id: device.id_device,
                meterID: deviceSetControl.value === "meter"? serialControl.value.toString() : "",
                applianceID: deviceSetControl.value === "appliance"? serialControl.value.toString() : ""
            });
       } else {
            setSerialControl(validateRequiredControl(serialControl));
       }
    };

    return (
        <div className="w-full bg-color-white p-[10px]">
        <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        <div className="mx-auto w-full max-w-[650px]" style={{ "textAlign": "center" }}>
            <Title title="Update Device information"/>
        </div>
        <div>
           <h3 className="color-primary-dark f-bold subtitle">{"Device"}</h3>
           <Space type={TYPE_SPACE.INPUT_DISTANCE} />
           <InputSelect 
               name={"Select device type"}
               placeholder="Select"
               defaultSelect={device.type_device === "Meter"? "meter": "appliance"}
               state={deviceSetControl.state}
               options={[{'id': 'meter', 'value': "Meter ID"}, {'id': 'appliance', 'value': "Appliance ID"}]}
               label="Select device type"
               onChange={(selected: {"value": any, "id":any})=>{
                   setDeviceControl({
                       value: selected.id,
                       message: "",
                       state: INPUT_CONTROL_STATE.OK
                   })
               }}
               message={deviceSetControl.message}
           />
           <Space type={TYPE_SPACE.INPUT_DISTANCE} />
           <InputText
               name={"name"}
               placeholder="Device Serial"
               label="Device Serial"
               defaultValue={serialControl.value.toString()}
               onChange={(value: string)=> {
                   const newSerialControl: InputControl = validateSerialControl(value)
                   setSerialControl(newSerialControl);
               }}
               state={serialControl.state}
               message={serialControl.message}
           />

           <Space type={TYPE_SPACE.INPUT_DISTANCE} />
        </div>
        <Space classes="w-full h-[50px]" />
        <div className="w-full max-w-[400px] mx-auto flex">
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL} />
            <ButtonPrimary onClick={submit}>
                Update
            </ButtonPrimary>
        </div>
    </div>
    )
}

export default DeviceUpdateForm;
