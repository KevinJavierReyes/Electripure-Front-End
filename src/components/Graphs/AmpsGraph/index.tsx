import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { ButtonLink, ButtonSecondary } from "../../FormInput/Button";
import InputCheckbox from "../../FormInput/InputCheckbox";
import TabLink from "../../FormInput/TabLink";
import Space from "../../Space";
import DateRangeControl from "../DateRangeControl";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
    ChartDataset,
    TooltipModel,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import { filterAmpsData, sendGetAmpsDataGraph } from "../../../actions/electripure";
import { ElectripureState } from "../../../interfaces/reducers";
import { AmpsDataEntity } from "../../../interfaces/entities";
import { timestampToDateLocal, unixTimestampToLocal } from "../../../libs/dateformat";
import { useHref } from "react-router-dom";


function AmpsGraph () {
  const dispatch = useDispatch();
  // Get Amps Data
  const ampsData: string = useSelector((state: ElectripureState) => state.ampsData);
  const datasetToggle: { [key: string]: boolean } = JSON.parse(useSelector((state: ElectripureState) => state.ampsDataToggle));
  const ampsDataFiltered: Partial<AmpsDataEntity> = JSON.parse(useSelector((state: ElectripureState) => state.ampsDataFiltered));
  const timestamps: number[] = ampsDataFiltered.timestamp!;
  delete ampsDataFiltered.timestamp;
  const labels = Object.keys(ampsDataFiltered);
  const colors: {[key: string]: string} = {
    "Amps Line A": "#00AEE8",
    "Amps Line B": "#55BA47",
    "Amps Line C": "#263B92",
    "default": "#ed4278"
  };
  useEffect(() => {
    const dataKeys = Object.keys(JSON.parse(ampsData));
    let newDatasetToggle: { [key: string]: boolean } = {};
    dataKeys.forEach((key: string) => {
      if (key != "timestamp") {
        if (datasetToggle.hasOwnProperty(key)) {
          newDatasetToggle[key] = datasetToggle[key];
        } else {
          newDatasetToggle[key] = true;
        }
      }
    });
    dispatch(filterAmpsData(newDatasetToggle))
  }, [ampsData]);
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
  const options:ChartOptions = {
    "responsive": true,
    interaction: {
      intersect:false,
      axis: "x"
    },
    elements: {
      point: {
        radius: 0
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
  const data = {
    "labels": timestamps.map((timestamp: number) => {
      return unixTimestampToLocal(timestamp);
    }),
    // "labels": timestamps,
    "datasets": labels.map((label: string) => {
      return {
        "label": label,
        // "borderWidth": 0.5,
        // "fill": false,
        "data": ampsDataFiltered[label]!,
        "borderColor": colors[label] ?? colors["default"],
        "backgroundColor": colors[label] ?? colors["default"],
        // "pointRadius": "0"
      };
    })
  };
  return (<Fragment>
      <DateRangeControl onChange={(start: Date, end: Date) => {
        console.log("Date: ");
        console.log(timestampToDateLocal(start.getTime()));
        console.log(timestampToDateLocal(end.getTime()));
        dispatch(sendGetAmpsDataGraph({
          dateMin: timestampToDateLocal(start.getTime()),
          dateMax: timestampToDateLocal(end.getTime()),
          device: 41
        }));
      }}/>
      <div className="w-full p-[30px]">
          <Line className="max-w-full" options={options} data={data} />
      </div>
      
      <div className="flex justify-center flex-wrap p-[30px]">
          <div className="w-auto">
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
          </div>
      </div>
  </Fragment>);
}

export default AmpsGraph;
