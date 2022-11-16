import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import DateRangeControl from "../DateRangeControl";
import { setLoading, showToast } from "../../../actions/electripure";
import { timestampToDateLocal } from "../../../libs/dateformat";
import LineGraph from "../LineGraph";
import ElectripureService from "../../../service/electripure-service";
import { ResponseGeneric } from "../../../interfaces/base-service";
import { useParams } from "react-router";
import DateRangeControlAndPoint from "../DateRangeControlAndPoint";


function VoltsGraph ({ defaultMeterId }: { defaultMeterId?: number }) {
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render VoltsGraph......");
  const dispatch = useDispatch();
  const [data, setData] = useState(JSON.stringify({ "x": [], "y": {
    "Volt Line A": [],
    "Volt Line B": [],
    "Volt Line C": [],
  }}));
  const colors: any = {
    "Volt Line A": "#00AEE8",
    "Volt Line B": "#55BA47",
    "Volt Line C": "#263B92",
    "default": "#ed4278"
  };
  async function getAmpsData(start: Date | null, end: Date | null, points: number | null) {

    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getVoltsDataGraph({
        date_min: start != null ? timestampToDateLocal(start.getTime()) : null,
        date_max: end != null ? timestampToDateLocal(end.getTime()) : null,
        device: deviceId,
        points: points != null ? points : null
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
        "Volt Line A": data["V1_data"],
        "Volt Line B": data["V2_data"],
        "Volt Line C": data["V3_data"]
      }
    }));
  }

  return (<Fragment>
      <DateRangeControlAndPoint onChange={getAmpsData}/>
      <LineGraph data={JSON.parse(data)} colors={colors} />
  </Fragment>);
}

export default VoltsGraph;