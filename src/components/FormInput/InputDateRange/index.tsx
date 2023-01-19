import { useState, Fragment } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { timestampToDateLocal } from "../../../libs/dateformat";
import { ButtonPrimary, ButtonSecondary } from "../Button";
import "./style.css";

export default function InputDateRange({defaultStart=new Date(), defaultEnd=new Date(), onChange, classes}: {defaultStart:Date, defaultEnd: Date, onChange: (start:Date, end: Date) => void, classes:string}) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    "startDate": defaultStart,
    "endDate": defaultEnd,
    "key": 'selection'
  });

 

  function selectDateRange() {
    const range: any = state;
    setShow(false);
    onChange(range.startDate, range.endDate);
  }

  return (<Fragment>
    <div className="relative">
      <ButtonSecondary onClick={()=>{setShow(true)}} classes={classes}>
        {  timestampToDateLocal(state.startDate.getTime()).replaceAll("-", "/") + " - " + timestampToDateLocal(state.endDate.getTime()).replaceAll("-", "/") }
      </ButtonSecondary>
      {show ? <div className="absolute top-0 left-0 border border-color-secondary date-range z-10">
        <DateRange
          editableDateInputs={true}
          onChange={(item: RangeKeyDict) => {
            setState(item.selection as any)
          }}
          moveRangeOnFirstSelection={false}
          ranges={[state as any]}/>
          <ButtonPrimary onClick={selectDateRange} classes="bg-primary-react-date">
            OK
          </ButtonPrimary>
      </div> : <div></div>}
    </div>
  </Fragment>);
}
