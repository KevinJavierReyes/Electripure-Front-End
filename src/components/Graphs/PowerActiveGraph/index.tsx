import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import DateRangeControl from "../DateRangeControl";
import { setLoading, showToast } from "../../../actions/electripure";
import { timestampToDateLocal } from "../../../libs/dateformat";
import LineGraph from "../LineGraph";
import ElectripureService from "../../../service/electripure-service";
import { ResponseGeneric } from "../../../interfaces/base-service";
import { useParams } from "react-router";


function PowerActiveGraph ({ defaultMeterId }: { defaultMeterId?: number }) {
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render PowerActiveGraph......");
  const dispatch = useDispatch();
  const [data, setData] = useState(JSON.stringify({ "x": [], "y": {
    "Power Active Min": [],
    "Power Active Max": [],
    // "Power Active C": [],
  }}));
  const colors: any = {
    "Power Active Min": "#00AEE8",
    "Power Active Max": "#55BA47",
    // "Power Active C": "#263B92",
    "default": "#ed4278"
  };
  async function getPowerActiveData(start: Date, end: Date) {

    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getPowerActiveDataGraph({
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
        "Power Active Min": data["ACT_MIN"],
        "Power Active Max": data["ACT_MAX"]
      }
    }));
  }

  return (<Fragment>
      <DateRangeControl onChange={getPowerActiveData}/>
      <LineGraph data={JSON.parse(data)} colors={colors} />
  </Fragment>);
}

export default PowerActiveGraph;