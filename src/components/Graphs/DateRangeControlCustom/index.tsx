import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../../../actions/electripure";
import { TYPE_DATE_RANGE, TYPE_SPACE } from "../../../config/enum";
import { timestampToDateLocal } from "../../../libs/dateformat";
import { ButtonSecondary } from "../../FormInput/Button";
import InputDateRange from "../../FormInput/InputDateRange";
import TabLink from "../../FormInput/TabLink";
import Space from "../../Space";

function DateRangeControlCustom({ onChange, defaultStart, defaultEnd}: { defaultStart?: Date, defaultEnd?: Date, onChange: (start: Date, end: Date) => void }) {

    const dispatch = useDispatch();
    
    const [startDate, setStartDate] = useState(defaultStart && defaultEnd ?  defaultStart.getTime() : new Date().getTime());
    const [endDate, setEndDate] = useState(defaultStart && defaultEnd ?  defaultEnd.getTime() : new Date().getTime());

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
            return;
        }
        setStartDate(start.getTime());
        setEndDate(end.getTime());
    }

    return (<Fragment>
        <div className="w-full flex px-[30px]">
            <div className="w-[250px]">
                <InputDateRange onChange={onChangeDateRangeCustom} defaultStart={new Date(startDate)} defaultEnd={new Date(endDate)} classes={"min-h-[40px] text-sm"}/>
            </div>
        </div>

    </Fragment>)
}

export default DateRangeControlCustom;
