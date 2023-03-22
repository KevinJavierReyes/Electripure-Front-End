import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DateRangeControl from "../../../../components/Graphs/DateRangeControl";
import { setLoading, showToast } from "../../../../actions/electripure";
import { timestampToDateLocal } from "../../../../libs/dateformat";
import LineGraph from "../../../../components/Graphs/LineGraph";
import ElectripureService from "../../../../service/electripure-service";
import { ResponseGeneric } from "../../../../interfaces/base-service";
import { useParams } from "react-router";
import DateRangeControlAndPoint from "../../../../components/Graphs/DateRangeControlAndPoint";
import { toDictTimestamps, toUnix } from "../../../../utils/parser";


function AmpsGraph ({ defaultMeterId }: { defaultMeterId?: number }) {
  // Obtener deviceId
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render AmpsGraph......");
  const dispatch = useDispatch();
  // Create states
  const [data, setData] = useState(JSON.stringify({ "x": [], "y": {
    "Amps Line A": [],
    "Amps Line B": [],
    "Amps Line C": [],
  }}));
  const [rawDictTimestamps, setRawDictTimestamps] = useState(JSON.stringify({}));
  const colors: any = {
    "Amps Line A": "#00AEE8",
    "Amps Line B": "#55BA47",
    "Amps Line C": "#263B92",
    "default": "#ed4278"
  };
  // Obtener datos por filtro
  async function getVoltsData(start: Date | null, end: Date | null, points: number | null) {
    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getAmpsDataGraph({
        date_min: start != null ? toUnix(start.getTime()) : null,
        date_max: end != null ? toUnix(end.getTime()) : null,
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
    setRawDictTimestamps(JSON.stringify(toDictTimestamps(data)));
    setData(JSON.stringify({
      "x": data["TS_data"],
      "y": {
        "Amps Line A": data["A1_data"],
        "Amps Line B": data["A2_data"],
        "Amps Line C": data["A3_data"]
      }
    }));
  }
  // Obtener datos por evento zoom
  async function onZoom(x1:any, x2: any) {
    dispatch(setLoading({
      loading: true
    }));
    const dictTimestamps: { [key: string]: number} = JSON.parse(rawDictTimestamps);
    const dateMin: number = dictTimestamps[x1];
    const dateMax: number = dictTimestamps[x2];
    const response: ResponseGeneric = await ElectripureService.getAmpsDataGraph({
        date_min: dateMin,
        date_max: dateMax,
        device: deviceId,
        points: null
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
    setRawDictTimestamps(JSON.stringify(toDictTimestamps(data)));
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
        <LineGraph data={JSON.parse(data)} colors={colors} onZoom={onZoom}/>
  </Fragment>);
}

export default AmpsGraph;