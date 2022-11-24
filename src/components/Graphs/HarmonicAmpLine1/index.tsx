import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import DateRangeControl from "../DateRangeControl";
import { setLoading, showToast } from "../../../actions/electripure";
import { timestampToDateLocal } from "../../../libs/dateformat";
import LineGraph from "../LineGraph";
import ElectripureService from "../../../service/electripure-service";
import { ResponseGeneric } from "../../../interfaces/base-service";
import { useParams } from "react-router";


function HarmonicAmpLine1 ({ defaultMeterId }: { defaultMeterId?: number }) {
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render HarmonicAmpLine1......");
  const dispatch = useDispatch();
  const [data, setData] = useState(JSON.stringify({ "x": [], "y": {
    "THD Amps Line A": [],
    "Harmonics3 of Amps Line A": [],
    "Harmonics5 of Amps Line A": [],
    "Harmonics7 of Amps Line A": [],
    "Harmonics9 of Amps Line A": []
  }}));
  const colors: any = {
    "THD Amps Line A": "#00AEE8",
    "Harmonics3 of Amps Line A": "#55BA47",
    "Harmonics5 of Amps Line A": "#263B92",
    "Harmonics7 of Amps Line A": "#ed4278",
    "Harmonics9 of Amps Line A": "#ed4278",
    "default": "#ed4278"
  };
  async function getPowerActiveData(start: Date, end: Date) {

    dispatch(setLoading({
        loading: true
    }));
    const response: ResponseGeneric = await ElectripureService.getHarmonicAmpsLine1DataGraph({
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
        "THD Amps Line A": data["data_THDC1"],
        "Harmonics3 of Amps Line A": data["data_H3C1"],
        "Harmonics5 of Amps Line A": data["data_H5C1"],
        "Harmonics7 of Amps Line A": data["data_H7C1"],
        "Harmonics9 of Amps Line A": data["data_H9C1"]
      }
    }));
  }

  return (<Fragment>
      <DateRangeControl onChange={getPowerActiveData}/>
      <LineGraph data={JSON.parse(data)} colors={colors} />
  </Fragment>);
}

export default HarmonicAmpLine1;