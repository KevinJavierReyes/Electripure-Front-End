import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import InputCheckbox from "../../FormInput/InputCheckbox";
import InputPhoto from "../../FormInput/InputPhoto";
import InputText from "../../FormInput/InputText";
import Space from "../../Space";
import Title from "../../FormInput/Title";


function CreateCompanyStep1Form() {
    return (<div className="w-full bg-color-white px-[30px] pb-[30px]">
        <Title title="Let's get some basic company information"></Title>
        <div className="w-full flex justify-start items-start">
            <div className="w-[220px] h-[220px]">
                <InputPhoto message="" state={0} name="companyLogo" placeholder="Add company logo" onChange={({base64, size}:{base64: string, size: number}) => {console.log(base64)}} />
            </div>
            <Space type={TYPE_SPACE.FORM_DISTANCE_VERTICAL}/>
            <div className="w-full">
                <InputText
                    state={INPUT_CONTROL_STATE.DEFAULT}
                    message={""}
                    name={"company"}
                    placeholder={"Company Name"}
                    label={"Company Name"}
                    onChange={(value: string) => {console.log(value)}}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                <InputText
                    state={INPUT_CONTROL_STATE.DEFAULT}
                    message={""}
                    name={"address"}
                    placeholder={"12345 Street Address"}
                    label={"Address"}
                    onChange={(value: string) => {console.log(value)}}/>
                <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                <InputText
                    state={INPUT_CONTROL_STATE.DEFAULT}
                    message={""}
                    name={"address2"}
                    placeholder={"Suite 890"}
                    label={"Address 2 optional"}
                    onChange={(value: string) => {console.log(value)}}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                <div className="w-full flex justify-center">
                    <InputText
                        state={INPUT_CONTROL_STATE.DEFAULT}
                        message={""}
                        name={"city"}
                        placeholder={"City"}
                        label={"City"}
                        onChange={(value: string) => {console.log(value)}}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
                    <InputText
                        state={INPUT_CONTROL_STATE.DEFAULT}
                        message={""}
                        name={"state"}
                        placeholder={"State"}
                        label={"State"}
                        onChange={(value: string) => {console.log(value)}}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
                    <InputText
                        state={INPUT_CONTROL_STATE.DEFAULT}
                        message={""}
                        name={"zipcode"}
                        placeholder={"Zip"}
                        label={"Zipcode"}
                        onChange={(value: string) => {console.log(value)}}
                    />
                </div>
                <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                <InputCheckbox
                    state={INPUT_CONTROL_STATE.DEFAULT}
                    message={""}
                    name={"meter"}
                    label={"This address will have a meter and appliance"}
                    onChange={(checked: boolean) => {

                    }}/>
            </div>
        </div>
    </div>)
}


export default CreateCompanyStep1Form;
