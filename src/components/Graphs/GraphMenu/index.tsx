import { Fragment } from "react";
import { INPUT_CONTROL_STATE } from "../../../config/enum";
import InputCheckbox from "../../FormInput/InputCheckbox";
import Space from "../../Space";
  

function GraphMenu({selections, metadata, onChange}: {selections: { [key: string]: boolean}, metadata: {
    "key": string,
    "label": string
  }[], onChange: (seleted:{"key": string,"label": string}, checked: boolean) => void}) {
    const blockLastInputShowChart: boolean = Object.values(selections).filter(show => show).length == 1;
    return (<div className="flex justify-center items-center">
        {metadata.map((info: {"key": string,"label": string}, index: number)=> {
            return (<Fragment key={index}>
                <InputCheckbox
                    state={INPUT_CONTROL_STATE.DEFAULT}
                    message={""}
                    disabled={blockLastInputShowChart && selections[info.key]}
                    defaultChecked={selections[info.key]}
                    classes={`f-semibold`}
                    name={info.key}
                    label={info.label}
                    onChange={(checked: boolean) => {
                        onChange(info, checked);
                }} />  
                <Space classes="w-[10px]" />
            </Fragment>);
        })}
    </div>);
}

export default GraphMenu;