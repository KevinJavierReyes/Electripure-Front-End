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


function PowerLine1 ({ defaultMeterId }: { defaultMeterId?: number }) {
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render PowerLine1......");
  const dispatch = useDispatch();
  const [rawDictTimestamps, setRawDictTimestamps] = useState(JSON.stringify({}));
  const [data, setData] = useState(JSON.stringify({ "x": [], "y": {
    "Power Line A Min": [],
    "Power Line A Max": [],
    // "Power Factor C": [],
  }}));
  const colors: any = {
    "Power Line A Min": "#00AEE8",
    "Power Line A Max": "#55BA47",
    // "Power Factor C": "#263B92",
    "default": "#ed4278"
  };
  async function getPowerLine1Data(start: Date, end: Date) {

    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getPowerLine1DataGraph({
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
        "Power Line A Min": data["V1_MIN"],
        "Power Line A Max": data["V1_MAX"]
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
      const response: ResponseGeneric = await ElectripureService.getPowerLine1DataGraph({
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
          "Power Line A Min": data["V1_MIN"],
          "Power Line A Max": data["V1_MAX"]
        }
      }));
    }

  return (<Fragment>
      <DateRangeControl onChange={getPowerLine1Data}/>
      <LineGraph data={JSON.parse(data)} colors={colors} onZoom={onZoom}/>
  </Fragment>);
}

export default PowerLine1;