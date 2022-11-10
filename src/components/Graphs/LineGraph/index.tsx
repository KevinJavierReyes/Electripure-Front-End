import { Chart as ChartJS, CategoryScale, ChartOptions, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { Fragment, useState } from "react";
import { Line } from "react-chartjs-2";
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { unixTimestampToLocal } from "../../../libs/dateformat";
import InputCheckbox from "../../FormInput/InputCheckbox";
import Space from "../../Space";

import "./style.css";

function LineGraph({ data, colors }: {data: { y: { [key:string]: any}, x: number[] }, colors: { [key: string]: string, default: string}}) {
  console.log("Render LineGraph......");
  const yLabels: string[] = Object.keys(data.y);
  const yData: { [key:string]: any} = data.y;
  const xData: number[] = data.x;
  const [yFilterRaw, setYFilter]: any = useState(JSON.stringify({}));
  const yFilter: { [key:string]: boolean} = JSON.parse(yFilterRaw);
  // Config chart js
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  // Options
  const options:ChartOptions = {
    "responsive": true,
    "interaction": {
      "intersect": false,
      "axis": "x"
    },
    "elements": {
      "point": {
        "radius": 0
      }
    },
    "plugins": {
      "legend": {
        "display": false,
        "position": "bottom" as const,
      },
      "title": {
        "display": false,
        "text": '',
      },
      "tooltip": {
        "enabled": true,
        "callbacks": {
          label: (tooltipItem: any) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.dataset.data[tooltipItem.dataIndex]}`;
          },
        }
      },
    }
  };
  // Data
  const source = {
    "labels": xData.map((timestamp: number) => {
      return unixTimestampToLocal(timestamp);
    }),
    "datasets": yLabels.filter((key: string) => yFilter[key] == undefined ? true : yFilter[key]).map((yLabel: string) => {
      return {
        "label": yLabel,
        // "borderWidth": 0.5,
        // "fill": false,
        "data": yData[yLabel] ?? [] ,
        "borderColor": colors[yLabel] ?? colors["default"],
        "backgroundColor": colors[yLabel] ?? colors["default"],
        // "pointRadius": "0"
      };
    })
  };
  return (<Fragment>
      <div className="w-full p-[30px]">
          <Line className="max-w-full" options={options} data={source} />
      </div>
      
      <div className="flex justify-center flex-wrap p-[30px]">
        {yLabels.map((yLabel: string, index: number) =>{
          return (<Fragment>
            <div className="w-auto">
              <InputCheckbox
                  key={index}
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  message={""}
                  defaultChecked={yFilter[yLabel] == undefined ? true : yFilter[yLabel]}
                  classes={`text-custom-${(colors[yLabel] ?? colors["default"]).replace("#", "")} f-semibold`}
                  name={yLabel}
                  label={yLabel}
                  onChange={(checked: boolean) => {
                    const newYFilterState = {
                      ...yFilter
                    };
                    newYFilterState[yLabel] = checked;
                    setYFilter(JSON.stringify(newYFilterState));
                  }} />
              
            </div>
            { yLabels.length > index + 1 ? <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/> : ""}
          </Fragment>)
        })}
          {/* <div className="w-auto">
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  message={""}
                  defaultChecked={true}
                  classes="color-primary f-semibold"
                  name={"linea"}
                  label="Amps Line A"
                  onChange={(checked: boolean) => {
                    dispatch(filterAmpsData({
                      ...datasetToggle,
                      "Amps Line A": checked
                    }));
                  }} />
          </div>
          <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
          <div className="w-auto">
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  message={""}
                  defaultChecked={true}
                  classes="color-success f-semibold"
                  name={"lineb"}
                  label="Amps Line B"
                  onChange={(checked: boolean) => {
                    dispatch(filterAmpsData({
                      ...datasetToggle,
                      "Amps Line B": checked
                    }));
                  }} />
          </div>
          <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
          <div className="w-auto">
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  message={""}
                  defaultChecked={true}
                  classes="color-primary-dark f-semibold"
                  name={"linec"}
                  label="Amps Line C"
                  onChange={(checked: boolean) => {
                    dispatch(filterAmpsData({
                      ...datasetToggle,
                      "Amps Line C": checked
                    }));
                  }} />
          </div> */}
      </div>
  </Fragment>);
}

export default LineGraph;