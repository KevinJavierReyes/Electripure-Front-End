import { Fragment } from "react";
import { INPUT_CONTROL_STATE } from "../../config/enum";
import InputCheckbox from "../FormInput/InputCheckbox";
import Space from "../Space";

const initStateShowGraph: string = JSON.stringify({
    "aa": true,
    "ba": false,
    "ca": false,
    "na": false,
    "av": false,
    "bv": false,
    "cv": false,
    "gv": false
  });
  
  const graphMetadata: any = [
    {
      "key": "aa",
      "label": "A(A)"
    },
    {
      "key": "ba",
      "label": "B(A)"
    },
    {
      "key": "ca",
      "label": "C(A)"
    },
    {
      "key": "na",
      "label": "N(A)"
    },
    {
      "key": "av",
      "label": "A(V)"
    },
    {
      "key": "bv",
      "label": "B(V)"
    },
    {
      "key": "cv",
      "label": "C(V)"
    },
    {
      "key": "gv",
      "label": "G(V)"
    }
  ];
  

function GraphMenu({selections, metadata, onChange}: {selections: { [key: string]: boolean}, metadata: {
    "key": string,
    "label": string
  }[], onChange: (seleted:{"key": string,"label": string}, checked: boolean) => void}) {
    const blockLastInputShowChart: boolean = Object.values(selections).filter(show => show).length == 1;
    return (<div className="flex justify-center items-center">
        {metadata.map((info: {"key": string,"label": string})=> {
            return (<Fragment>
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