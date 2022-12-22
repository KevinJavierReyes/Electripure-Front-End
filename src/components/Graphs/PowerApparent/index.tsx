import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import DateRangeControl from "../DateRangeControl";
import { setLoading, showToast } from "../../../actions/electripure";
import { timestampToDateLocal } from "../../../libs/dateformat";
import LineGraph from "../LineGraph";
import ElectripureService from "../../../service/electripure-service";
import { ResponseGeneric } from "../../../interfaces/base-service";
import { useParams } from "react-router";
import { toDictTimestamps, toUnix } from "../../../utils/parser";


function PowerApparent ({ defaultMeterId }: { defaultMeterId?: number }) {
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render PowerApparent......");
  const dispatch = useDispatch();
  const [data, setData] = useState(JSON.stringify({ "x": [], "y": {
    "Power Apparent Min": [],
    "Power Apparent Max": [],
    // "Power Factor C": [],
  }}));
  const [rawDictTimestamps, setRawDictTimestamps] = useState(JSON.stringify({}));
  const colors: any = {
    "Power Apparent Min": "#00AEE8",
    "Power Apparent Max": "#55BA47",
    // "Power Factor C": "#263B92",
    "default": "#ed4278"
  };
  async function getPowerApparentData(start: Date, end: Date) {

    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getPowerApparentDataGraph({
      date_min: toUnix(start.getTime()),
      date_max: toUnix(end.getTime()),
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
    setRawDictTimestamps(JSON.stringify(toDictTimestamps(data)));
    setData(JSON.stringify({
      "x": data["TS_data"],
      "y": {
        "Power Apparent Min": data["APP_MIN"],
        "Power Apparent Max": data["APP_MAX"]
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
      const response: ResponseGeneric = await ElectripureService.getPowerApparentDataGraph({
          date_min: dateMin,
          date_max: dateMax,
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
      setRawDictTimestamps(JSON.stringify(toDictTimestamps(data)));
      setData(JSON.stringify({
        "x": data["TS_data"],
        "y": {
          "Power Apparent Min": data["APP_MIN"],
          "Power Apparent Max": data["APP_MAX"]
        }
      }));
    }
  

  return (<Fragment>
      <DateRangeControl onChange={getPowerApparentData}/>
      <LineGraph data={JSON.parse(data)} colors={colors} onZoom={onZoom} />
  </Fragment>);
}

export default PowerApparent;