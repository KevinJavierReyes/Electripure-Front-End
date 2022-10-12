import { STATE_INPUT_CONTROL, TYPE_SPACE } from "../../../config/enum";
import InputCheckbox from "../../InputCheckbox";
import InputPhoto from "../../InputPhoto";
import InputText from "../../InputText";
import Space from "../../Space";
import Title from "../../Title";


function CreateCompanyStep1Form() {
    return (<div className="w-full bg-color-white px-[30px] pb-[30px]">
        <Title title="Lets get some basic company information"></Title>
        <div className="w-full flex justify-start items-start">
            <div className="w-[220px] h-[220px]">
                <InputPhoto name="companyLogo" placeholder="Add company logo" onChange={(base64: string) => {console.log(base64)}} />
            </div>
            <Space type={TYPE_SPACE.FORM_DISTANCE_VERTICAL}/>
            <div className="w-full">
                <InputText
                    state={STATE_INPUT_CONTROL.DEFAULT}
                    message={""}
                    name={"company"}
                    placeholder={"Company Name"}
                    label={"Company Name"}
                    onChange={(value: string) => {console.log(value)}}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                <InputText
                    state={STATE_INPUT_CONTROL.DEFAULT}
                    message={""}
                    name={"address"}
                    placeholder={"12345 Street Address"}
                    label={"Address"}
                    onChange={(value: string) => {console.log(value)}}/>
                <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                <InputText
                    state={STATE_INPUT_CONTROL.DEFAULT}
                    message={""}
                    name={"address2"}
                    placeholder={"Suite 890"}
                    label={"Address 2 optional"}
                    onChange={(value: string) => {console.log(value)}}
                />
                <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                <div className="w-full flex justify-center">
                    <InputText
                        state={STATE_INPUT_CONTROL.DEFAULT}
                        message={""}
                        name={"city"}
                        placeholder={"City"}
                        label={"City"}
                        onChange={(value: string) => {console.log(value)}}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
                    <InputText
                        state={STATE_INPUT_CONTROL.DEFAULT}
                        message={""}
                        name={"state"}
                        placeholder={"State"}
                        label={"State"}
                        onChange={(value: string) => {console.log(value)}}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
                    <InputText
                        state={STATE_INPUT_CONTROL.DEFAULT}
                        message={""}
                        name={"zipcode"}
                        placeholder={"Zip"}
                        label={"Zipcode"}
                        onChange={(value: string) => {console.log(value)}}
                    />
                </div>
                <Space type={TYPE_SPACE.INPUT_DISTANCE}/>
                <InputCheckbox
                    state={STATE_INPUT_CONTROL.DEFAULT}
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