import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../../../actions/electripure";
import { TYPE_DATE_RANGE, TYPE_SPACE } from "../../../config/enum";
import { timestampToDateLocal } from "../../../libs/dateformat";
import { ButtonSecondary } from "../../FormInput/Button";
import InputDateRange from "../../FormInput/InputDateRange";
import TabLink from "../../FormInput/TabLink";
import Space from "../../Space";

function DateRangeControl({ defaultTypeRange = 1, onChange, defaultStart, defaultEnd}: { defaultStart?: Date, defaultEnd?: Date, defaultTypeRange?:TYPE_DATE_RANGE, onChange: (start: Date, end: Date) => void }) {

    const dispatch = useDispatch();

    const [tapIndex, setTapIndex] = useState(defaultStart && defaultEnd ? TYPE_DATE_RANGE.CUSTOM : defaultTypeRange);
    const [customRange, setCustomRange] = useState(defaultStart && defaultEnd ? true : false);
    const [startDate, setStartDate] = useState(defaultStart && defaultEnd ?  defaultStart.getTime() : -1);
    const [endDate, setEndDate] = useState(defaultStart && defaultEnd ?  defaultEnd.getTime() : -1);

    useEffect(() => {
        const end = new Date();
        const start = new Date();
        if (tapIndex == 1) {
            // start.setDate(start.getDate() );
            // start.setMonth(start.getMonth() - 1);
            setStartDate(start.getTime());
            setEndDate(end.getTime());
        } else if (tapIndex == 2) {
            start.setDate(start.getDate() - 6);
            // start.setDate(start.getDate() - 7);
            // start.setMonth(start.getMonth() - 3);
            setStartDate(start.getTime());
            setEndDate(end.getTime());
        } else if (tapIndex == 3) {
            start.setDate(start.getDate() - 29);
            // start.setMonth(start.getMonth() - 1);
            // start.setMonth(start.getMonth() - 6);
            setStartDate(start.getTime());
            setEndDate(end.getTime());
        } else if (tapIndex == 4) {
            start.setFullYear(start.getFullYear() - 1);
            setStartDate(start.getTime());
            setEndDate(end.getTime());
        }
    }, [tapIndex]);

    useEffect(() => {
        if (endDate > -1 && startDate > -1) {
            onChange(new Date(startDate), new Date(endDate));
        }
    }, [`${startDate}-${endDate}`]);

    function onChangeDateRangeCustom(start: Date, end: Date) {
        const days = ((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
        if (days > 30 || days < -30) {
            dispatch(showToast({
                message: "the maximum range of dates is 30 days.",
                status: "error"
            }))
            setCustomRange(false);
            setTimeout(() => {
                setCustomRange(true);
            }, 500)
            return;
        }
        setStartDate(start.getTime());
        setEndDate(end.getTime());
    }

    return (<Fragment>

        <div className="w-full flex px-[30px]">
            <TabLink onClick={()=> { if (tapIndex != 1) { setTapIndex(1); setCustomRange(false);} }} active={tapIndex == 1}>
                1 Day
            </TabLink>
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <TabLink onClick={()=> { if (tapIndex != 2) { setTapIndex(2); setCustomRange(false);} }} active={tapIndex == 2}>
                1 Week
            </TabLink>
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <TabLink onClick={()=> { if (tapIndex != 3) { setTapIndex(3); setCustomRange(false);} }} active={tapIndex == 3}>
                1 Mon
            </TabLink>
            {/* <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <TabLink onClick={()=> { if (tapIndex != 4) { setTapIndex(4); setCustomRange(false);} }} active={tapIndex == 4}>
                1 Yr
            </TabLink> */}
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <TabLink onClick={()=> { if (tapIndex != 5) { setTapIndex(5); setCustomRange(true); } }} active={tapIndex == 5}>
                Custom
            </TabLink>
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <div className="w-[250px]">
                {
                    customRange ? <InputDateRange onChange={onChangeDateRangeCustom} defaultStart={new Date(startDate)} defaultEnd={new Date(endDate)} classes={"min-h-[40px] text-sm"}/> :
                    <ButtonSecondary onClick={()=>{}} classes={"min-h-[40px] text-sm bg-color-secondary cursor-default"}>
                        {endDate > -1 ?
                        timestampToDateLocal(startDate).replaceAll("-", "/") + " - " + timestampToDateLocal(endDate).replaceAll("-", "/") :
                        "Select range"}
                    </ButtonSecondary>
                }
            </div>
        </div>

    </Fragment>)
}

export default DateRangeControl;
