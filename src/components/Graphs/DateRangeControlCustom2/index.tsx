import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../../../actions/electripure";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from "@mui/material";
import Space from "../../Space";
import { TYPE_SPACE } from "../../../config/enum";
import {ButtonPrimary} from "../../FormInput/Button";

function DateRangeControlCustom2({ onChange, defaultStart, defaultEnd}: { defaultStart?: Date, defaultEnd?: Date, onChange: (start: Date, end: Date) => void }) {

    const dispatch = useDispatch();
    
    const [startDate, setStartDate] = useState(defaultStart && defaultEnd ?  defaultStart.getTime() : new Date().getTime());
    const [endDate, setEndDate] = useState(defaultStart && defaultEnd ?  defaultEnd.getTime() : new Date().getTime());

    useEffect(() => {
        if (endDate > -1 && startDate > -1) {
            const days = ((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)) + 1;
            if (days > 30 || days < -30) {
                dispatch(showToast({
                    message: "the maximum range of dates is 30 days.",
                    status: "error"
                }))
                return;
            }
            onChange(new Date(startDate), new Date(endDate));
        }
    }, [`${startDate}-${endDate}`]);

    // function onChangeDateRangeCustom(start: Date, end: Date) {
    //     const days = ((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
    //     if (days > 30 || days < -30) {
    //         dispatch(showToast({
    //             message: "the maximum range of dates is 30 days.",
    //             status: "error"
    //         }))
    //         return;
    //     }
    //     setStartDate(start.getTime());
    //     setEndDate(end.getTime());
    // }



    return (<Fragment>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"en"}>
            
            <div className="w-full flex ">
                <div className="sm:min-w-[250px] w-full flex justify-center items-center">
                    <strong>Range:</strong>
                    <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
                    <DatePicker
                        className="w-[150px]"
                        value={new Date(startDate)}
                        onChange={ (value: any) => {setStartDate(new Date(value.format()).getTime())}}
                        renderInput={(params) => <TextField size="small" {...params} />}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
                    <TimePicker
                        className="w-[120px]"
                        value={new Date(startDate)}
                        onChange={ (value: any) => {setStartDate(new Date(value.format()).getTime())}}
                        ampm={false}
                        renderInput={(params) => <TextField size="small" {...params} />}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
                    <strong>To</strong>
                    <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
                    <DatePicker
                        className="w-[150px]"
                        value={new Date(endDate)}
                        onChange={ (value: any) => {setEndDate(new Date(value.format()).getTime())}}
                        renderInput={(params) => <TextField size="small" {...params} />}
                    />
                    <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
                    <TimePicker
                        className="w-[120px]"
                        value={new Date(endDate)}
                        onChange={ (value: any) => {setEndDate(new Date(value.format()).getTime())}}
                        ampm={false}
                        renderInput={(params) => <TextField size="small" {...params} />}
                    />
                </div>
            </div>

        </LocalizationProvider>
    </Fragment>)
}

export default DateRangeControlCustom2;
