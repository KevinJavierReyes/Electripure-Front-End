import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import DateRangeControl from "../DateRangeControl";
import { setLoading, showToast } from "../../../actions/electripure";
import { timestampToDateLocal } from "../../../libs/dateformat";
import LineGraph from "../LineGraph";
import ElectripureService from "../../../service/electripure-service";
import { ResponseGeneric } from "../../../interfaces/base-service";
import { useParams } from "react-router";


function HarmonicAmpLine3 ({ defaultMeterId }: { defaultMeterId?: number }) {
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render HarmonicAmpLine3......");
  const dispatch = useDispatch();
  const [data, setData] = useState(JSON.stringify({ "x": [], "y": {
    "THD Amps Line C": [],
    "Harmonics3 of Amps Line C": [],
    "Harmonics5 of Amps Line C": [],
    "Harmonics7 of Amps Line C": [],
    "Harmonics9 of Amps Line C": []
  }}));
  const colors: any = {
    "THD Amps Line C": "#00AEE8",
    "Harmonics3 of Amps Line C": "#55BA47",
    "Harmonics5 of Amps Line C": "#263B92",
    "Harmonics7 of Amps Line C": "#ed4278",
    "Harmonics9 of Amps Line C": "#ed4278",
    "default": "#ed4278"
  };
  async function getPowerActiveData(start: Date, end: Date) {

    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getHarmonicAmpsLine3DataGraph({
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
        "THD Amps Line C": data["data_THDC3"],
        "Harmonics3 of Amps Line C": data["data_H3C3"],
        "Harmonics5 of Amps Line C": data["data_H5C3"],
        "Harmonics7 of Amps Line C": data["data_H7C3"],
        "Harmonics9 of Amps Line C": data["data_H9C3"]
      }
    }));
  }

  return (<Fragment>
      <DateRangeControl onChange={getPowerActiveData}/>
      <LineGraph data={JSON.parse(data)} colors={colors} />
  </Fragment>);
}

export default HarmonicAmpLine3;