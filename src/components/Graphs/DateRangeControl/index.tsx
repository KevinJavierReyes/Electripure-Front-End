import { Fragment, useState } from "react";
import { TYPE_SPACE } from "../../../config/enum";
import { ButtonSecondary } from "../../FormInput/Button";
import TabLink from "../../FormInput/TabLink";
import Space from "../../Space";

function DateRangeControl() {
    const [tapIndex, setTapIndex] = useState(1);

    return (<Fragment>

        <div className="w-full flex px-[30px]">
            <TabLink onClick={()=> { if (tapIndex != 1) { setTapIndex(1) } }} active={tapIndex == 1}>
                1 Mon
            </TabLink>
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <TabLink onClick={()=> { if (tapIndex != 2) { setTapIndex(2) } }} active={tapIndex == 2}>
                3 Mon
            </TabLink>
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <TabLink onClick={()=> { if (tapIndex != 3) { setTapIndex(3) } }} active={tapIndex == 3}>
                6 Mon
            </TabLink>
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <TabLink onClick={()=> { if (tapIndex != 4) { setTapIndex(4) } }} active={tapIndex == 4}>
                1 Yr
            </TabLink>
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <TabLink onClick={()=> { if (tapIndex != 5) { setTapIndex(5) } }} active={tapIndex == 5}>
                Custom
            </TabLink>
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <div className="w-[150px]">
                <ButtonSecondary onClick={()=>{}} classes={"min-h-[40px] text-sm"}>
                    Select range
                </ButtonSecondary>
            </div>
        </div>

    </Fragment>)
}

export default DateRangeControl;