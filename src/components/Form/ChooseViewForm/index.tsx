// 

import { TYPE_SPACE } from "../../../config/enum";
import { ButtonPrimary } from "../../FormInput/Button";
import Title from "../../FormInput/Title";
import Space from "../../Space";

function ChooseViewForm({ onSubmit }: { onSubmit: ()=> void}) {

    function submit() {
        onSubmit();
    }

    return (<div className="w-full bg-color-white p-[10px]">
        <Title title="Choose your preferred view"></Title>
        <div className="bg-color-secondary w-full h-[400px]"></div>
        <Space type={TYPE_SPACE.FORM_DISTANCE} />
        <ButtonPrimary onClick={submit}>
            Next
        </ButtonPrimary>
    </div>);
}

export default ChooseViewForm;