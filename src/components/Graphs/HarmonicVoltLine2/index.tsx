import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import DateRangeControl from "../DateRangeControl";
import { setLoading, showToast } from "../../../actions/electripure";
import { timestampToDateLocal } from "../../../libs/dateformat";
import LineGraph from "../LineGraph";
import ElectripureService from "../../../service/electripure-service";
import { ResponseGeneric } from "../../../interfaces/base-service";
import { useParams } from "react-router";


function HarmonicVoltLine2 ({ defaultMeterId }: { defaultMeterId?: number }) {
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render HarmonicVoltLine2......");
  const dispatch = useDispatch();
  const [data, setData] = useState(JSON.stringify({ "x": [], "y": {
    "THD Voltage Line B": [],
    "Harmonics3 of Voltage Line B": [],
    "Harmonics5 of Voltage Line B": [],
    "Harmonics7 of Voltage Line B": [],
    "Harmonics9 of Voltage Line B": []
  }}));
  const colors: any = {
    "THD Voltage Line B": "#00AEE8",
    "Harmonics3 of Voltage Line B": "#55BA47",
    "Harmonics5 of Voltage Line B": "#263B92",
    "Harmonics7 of Voltage Line B": "#ed4278",
    "Harmonics9 of Voltage Line B": "#ed4278",
    "default": "#ed4278"
  };
  async function getPowerActiveData(start: Date, end: Date) {

    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getHarmonicVoltLine2DataGraph({
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
        "THD Voltage Line B": data["data_THDV2"],
        "Harmonics3 of Voltage Line B": data["data_H3V2"],
        "Harmonics5 of Voltage Line B": data["data_H5V2"],
        "Harmonics7 of Voltage Line B": data["data_H7V2"],
        "Harmonics9 of Voltage Line B": data["data_H9V2"]
      }
    }));
  }

  return (<Fragment>
      <DateRangeControl onChange={getPowerActiveData}/>
      <LineGraph data={JSON.parse(data)} colors={colors} />
  </Fragment>);
}

export default HarmonicVoltLine2;