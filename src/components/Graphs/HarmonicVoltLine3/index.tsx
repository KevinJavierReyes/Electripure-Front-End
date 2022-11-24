import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import DateRangeControl from "../DateRangeControl";
import { setLoading, showToast } from "../../../actions/electripure";
import { timestampToDateLocal } from "../../../libs/dateformat";
import LineGraph from "../LineGraph";
import ElectripureService from "../../../service/electripure-service";
import { ResponseGeneric } from "../../../interfaces/base-service";
import { useParams } from "react-router";


function HarmonicVoltLine3 ({ defaultMeterId }: { defaultMeterId?: number }) {
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render HarmonicVoltLine3......");
  const dispatch = useDispatch();
  const [data, setData] = useState(JSON.stringify({ "x": [], "y": {
    "THD Voltage Line C": [],
    "Harmonics3 of Voltage Line C": [],
    "Harmonics5 of Voltage Line C": [],
    "Harmonics7 of Voltage Line C": [],
    "Harmonics9 of Voltage Line C": []
  }}));
  const colors: any = {
    "THD Voltage Line C": "#00AEE8",
    "Harmonics3 of Voltage Line C": "#55BA47",
    "Harmonics5 of Voltage Line C": "#263B92",
    "Harmonics7 of Voltage Line C": "#ed4278",
    "Harmonics9 of Voltage Line C": "#ed4278",
    "default": "#ed4278"
  };
  async function getPowerActiveData(start: Date, end: Date) {

    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getHarmonicVoltLine3DataGraph({
        date_min: timestampToDateLocal(start.getTime()),
        date_max: timestampToDateLocal(end.getTime()),
        device: deviceId
    });
    dispatch(setLoading({
        loading: false
    }));
    if(!response.success) {
        dispatch(showToast({
            message: response.error!,
            status: "error"
        }));
        return;
    };
    let data: any = response.data;
    setData(JSON.stringify({
      "x": data["TS_data"],
      "y": {
        "THD Voltage Line C": data["data_THDV3"],
        "Harmonics3 of Voltage Line C": data["data_H3V3"],
        "Harmonics5 of Voltage Line C": data["data_H5V3"],
        "Harmonics7 of Voltage Line C": data["data_H7V3"],
        "Harmonics9 of Voltage Line C": data["data_H9V3"]
      }
    }));
  }

  return (<Fragment>
      <DateRangeControl onChange={getPowerActiveData}/>
      <LineGraph data={JSON.parse(data)} colors={colors} />
  </Fragment>);
}

export default HarmonicVoltLine3;