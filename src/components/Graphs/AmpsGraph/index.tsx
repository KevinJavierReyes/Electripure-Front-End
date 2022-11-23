import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DateRangeControl from "../DateRangeControl";
import { setLoading, showToast } from "../../../actions/electripure";
import { timestampToDateLocal } from "../../../libs/dateformat";
import LineGraph from "../LineGraph";
import ElectripureService from "./../../../service/electripure-service";
import { ResponseGeneric } from "../../../interfaces/base-service";
import { useParams } from "react-router";
import DateRangeControlAndPoint from "../DateRangeControlAndPoint";


function AmpsGraph ({ defaultMeterId }: { defaultMeterId?: number }) {
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render AmpsGraph......");



  const dispatch = useDispatch();
  const [data, setData] = useState(JSON.stringify({ "x": [], "y": {
    "Amps Line A": [],
    "Amps Line B": [],
    "Amps Line C": [],
  }}));
  const colors: any = {
    "Amps Line A": "#00AEE8",
    "Amps Line B": "#55BA47",
    "Amps Line C": "#263B92",
    "default": "#ed4278"
  };

  async function getVoltsData(start: Date | null, end: Date | null, points: number | null) {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getAmpsDataGraph({
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
        "Amps Line A": data["A1_data"],
        "Amps Line B": data["A2_data"],
        "Amps Line C": data["A3_data"]
      }
    }));
  }

  return (<Fragment>
        <DateRangeControlAndPoint onChange={getVoltsData}/>
        <LineGraph data={JSON.parse(data)} colors={colors} />
  </Fragment>);
}

export default AmpsGraph;