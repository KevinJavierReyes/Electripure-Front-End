import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import DateRangeControl from "../DateRangeControl";
import { setLoading, showToast } from "../../../actions/electripure";
import { timestampToDateLocal } from "../../../libs/dateformat";
import LineGraph from "../LineGraph";
import ElectripureService from "../../../service/electripure-service";
import { ResponseGeneric } from "../../../interfaces/base-service";
import { useParams } from "react-router";


function HarmonicAmpLine2 ({ defaultMeterId }: { defaultMeterId?: number }) {
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render HarmonicAmpLine2......");
  const dispatch = useDispatch();
  const [data, setData] = useState(JSON.stringify({ "x": [], "y": {
    "THD Amps Line B": [],
    "Harmonics3 of Amps Line B": [],
    "Harmonics5 of Amps Line B": [],
    "Harmonics7 of Amps Line B": [],
    "Harmonics9 of Amps Line B": []
  }}));
  const colors: any = {
    "THD Amps Line B": "#00AEE8",
    "Harmonics3 of Amps Line B": "#55BA47",
    "Harmonics5 of Amps Line B": "#263B92",
    "Harmonics7 of Amps Line B": "#ed4278",
    "Harmonics9 of Amps Line B": "#ed4278",
    "default": "#ed4278"
  };
  async function getPowerActiveData(start: Date, end: Date) {

    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getHarmonicAmpsLine2DataGraph({
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
        "THD Amps Line B": data["data_THDC2"],
        "Harmonics3 of Amps Line B": data["data_H3C2"],
        "Harmonics5 of Amps Line B": data["data_H5C2"],
        "Harmonics7 of Amps Line B": data["data_H7C2"],
        "Harmonics9 of Amps Line B": data["data_H9C2"]
      }
    }));
  }

  return (<Fragment>
      <DateRangeControl onChange={getPowerActiveData}/>
      <LineGraph data={JSON.parse(data)} colors={colors} />
  </Fragment>);
}

export default HarmonicAmpLine2;