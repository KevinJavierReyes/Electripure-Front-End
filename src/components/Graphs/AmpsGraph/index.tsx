import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import DateRangeControl from "../DateRangeControl";
import { setLoading, showToast } from "../../../actions/electripure";
import { timestampToDateLocal } from "../../../libs/dateformat";
import LineGraph from "../LineGraph";
import ElectripureService from "./../../../service/electripure-service";
import { ResponseGeneric } from "../../../interfaces/base-service";
import { useParams } from "react-router";


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

  async function getVoltsData(start: Date, end: Date) {

    // setData(JSON.stringify({
    //   "x": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    //   "y": {
    //     "Amps Line A": [1,1,2,3,45,6,7,6,6,5,4,5,6,1,4],
    //     "Amps Line B": [2,4,1,5,3,4,5,2,5,7,1,2,9,5,4],
    //     "Amps Line C": [2,5,8,9,2,5,3,5,3,7,2,4,7,2,6]
    //   }
    // }));
    // return;

    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getAmpsDataGraph({
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
    console.log(data);
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
      <DateRangeControl onChange={getVoltsData}/>
      <LineGraph data={JSON.parse(data)} colors={colors} />
  </Fragment>);
}

export default AmpsGraph;