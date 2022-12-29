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
import { toDictTimestamps, toUnix } from "../../../utils/parser";
import { GetAmpsDataRequest } from "../../../interfaces/electripure-service";
import LineGraphSimple from "../LineGraphSimple";
import Space from "../../Space";
import InputCheckbox from "../../FormInput/InputCheckbox";
import { INPUT_CONTROL_STATE } from "../../../config/enum";


function AmpsGraph ({ defaultMeterId }: { defaultMeterId?: number }) {
  // Obtener deviceId
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render AmpsGraph......");
  const dispatch = useDispatch();
  // Create states
  const [dataA, setDataA] = useState(JSON.stringify({ "x": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  const [rawDictTimestampsA, setRawDictTimestampsA] = useState(JSON.stringify({}));
  const [dataB, setDataB] = useState(JSON.stringify({ "x": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  const [rawDictTimestampsB, setRawDictTimestampsB] = useState(JSON.stringify({}));
  const [dataC, setDataC] = useState(JSON.stringify({ "x": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  const [rawDictTimestampsC, setRawDictTimestampsC] = useState(JSON.stringify({}));
  const colors: any = {
    "max": "#00AEE8",
    "min": "#55BA47",
    "average": "#263B92",
    "default": "#ed4278"
  };
  const [rawShowCharts, setRawShowCharts] = useState(JSON.stringify({
    "anv": true,
    "bnv": false,
    "cnv": false
  }));
  const [rawShowX, setRawShowX] = useState(JSON.stringify({
    "max": true,
    "min": true,
    "average": true
  }));
  const showX: any = JSON.parse(rawShowX);
  const blockLastInputShowX: boolean = Object.values(showX).filter(show => show).length == 1;
  const showCharts: any = JSON.parse(rawShowCharts);
  const blockLastInputShowChart: boolean = Object.values(showCharts).filter(show => show).length == 1;
  // Toogle charts
  function toogleCharts(chart: string, show: boolean) {
    showCharts[chart] = show;
    setRawShowCharts(JSON.stringify(showCharts));
  }
  // Toogle charts
  function toogleX(chart: string, show: boolean) {
    showX[chart] = show;
    setRawShowX(JSON.stringify(showX));
  }
  // Obtener datos de todos los graficos en memoria
  async function requestChartsData(payload: GetAmpsDataRequest) {
    dispatch(setLoading({
        loading: true
    }));
    const responseA: ResponseGeneric = await ElectripureService.getAmpsDataAGraph(payload);
    const responseB: ResponseGeneric = await ElectripureService.getAmpsDataBGraph(payload);
    const responseC: ResponseGeneric = await ElectripureService.getAmpsDataCGraph(payload);
    // Validar datos obtenidos
    if(!responseA.success) {
        dispatch(showToast({
            message: responseA.error!,
            status: "error"
        }));
        return;
    };
    let dataA: any = responseA.data;
    if(!responseB.success) {
      dispatch(showToast({
          message: responseB.error!,
          status: "error"
      }));
      return;
    };
    let dataB: any = responseB.data;
    if(!responseC.success) {
      dispatch(showToast({
          message: responseC.error!,
          status: "error"
      }));
      return;
    };
    let dataC: any = responseC.data;
      dispatch(setLoading({
        loading: false
    }));
    setRawDictTimestampsA(JSON.stringify(toDictTimestamps(dataA)));
    setRawDictTimestampsB(JSON.stringify(toDictTimestamps(dataB)));
    setRawDictTimestampsC(JSON.stringify(toDictTimestamps(dataC)));
    setDataA(JSON.stringify({
      "x": dataA["TS_data"],
      "y": {
        "max": dataA["A1_MAX_data"],
        "min": dataA["A1_MIN_data"],
        "average": dataA["A1_data"]
      }
    }));
    setDataB(JSON.stringify({
      "x": dataB["TS_data"],
      "y": {
        "max": dataB["A1_MAX_data"],
        "min": dataB["A1_MIN_data"],
        "average": dataB["A1_data"]
      }
    }));
    setDataC(JSON.stringify({
      "x": dataC["TS_data"],
      "y": {
        "max": dataC["A1_MAX_data"],
        "min": dataC["A1_MIN_data"],
        "average": dataC["A1_data"]
      }
    }));
  }
  // Obtener datos por filtro
  async function getVoltsData(start: Date | null, end: Date | null) {
    await requestChartsData({
      date_min: start != null ? toUnix(start.getTime()) : null,
      date_max: end != null ? toUnix(end.getTime()) : null,
      device: deviceId,
      points: null
    });
  }
  // Obtener datos por evento zoom
  async function onZoom(x1:any, x2: any, dictTimestamps: { [key: string]: number}) {
    const dateMin: number = dictTimestamps[x1];
    const dateMax: number = dictTimestamps[x2];
    await requestChartsData({
      date_min: dateMin,
      date_max: dateMax,
      device: deviceId,
      points: null
    });
  }

  return (<Fragment>
        <div className="flex justify-between flex-wrap">
          <div className="w-auto">
            <DateRangeControl onChange={getVoltsData}/>
          </div>
          <div className="w-[300px]  flex px-[30px]">
            <InputCheckbox
                state={INPUT_CONTROL_STATE.DEFAULT}
                message={""}
                disabled={blockLastInputShowChart && showCharts["anv"]}
                defaultChecked={showCharts["anv"]}
                classes={`f-semibold`}
                name={"anv"}
                label={"AN(V)"}
                onChange={(checked: boolean) => {
                  toogleCharts("anv", checked);
                }} />
            <InputCheckbox
                state={INPUT_CONTROL_STATE.DEFAULT}
                message={""}
                disabled={blockLastInputShowChart && showCharts["bnv"]}
                defaultChecked={showCharts["bnv"]}
                classes={`f-semibold`}
                name={"bnv"}
                label={"BN(V)"}
                onChange={(checked: boolean) => {
                  toogleCharts("bnv", checked);
                }} />
            <InputCheckbox
                state={INPUT_CONTROL_STATE.DEFAULT}
                message={""}
                disabled={blockLastInputShowChart && showCharts["cnv"]}
                defaultChecked={showCharts["cnv"]}
                classes={`f-semibold`}
                name={"cnv"}
                label={"CN(V)"}
                onChange={(checked: boolean) => {
                  toogleCharts("cnv", checked);
                }} />
          </div>
          <div className="w-[400px]  flex px-[30px]">
            <InputCheckbox
                state={INPUT_CONTROL_STATE.DEFAULT}
                message={""}
                disabled={blockLastInputShowX && showX["max"]}
                defaultChecked={showX["max"]}
                classes={`f-semibold`}
                name={"max"}
                label={"Maximun"}
                onChange={(checked: boolean) => {
                  toogleX("max", checked);
                }} />
            <InputCheckbox
                state={INPUT_CONTROL_STATE.DEFAULT}
                message={""}
                disabled={blockLastInputShowX && showX["min"]}
                defaultChecked={showX["min"]}
                classes={`f-semibold`}
                name={"min"}
                label={"Minimun"}
                onChange={(checked: boolean) => {
                  toogleX("min", checked);
                }} />
            <InputCheckbox
                state={INPUT_CONTROL_STATE.DEFAULT}
                message={""}
                disabled={blockLastInputShowX && showX["average"]}
                defaultChecked={showX["average"]}
                classes={`f-semibold`}
                name={"average"}
                label={"Average"}
                onChange={(checked: boolean) => {
                  toogleX("average", checked);
                }} />
          </div>
        </div>
        <Space classes="h-[30px]"/>
        { showCharts["anv"] ? <LineGraphSimple showDatasetMap={showX} data={JSON.parse(dataA)} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, JSON.parse(rawDictTimestampsA)); }} title="AN(V)"/> : ""}
        { showCharts["bnv"] ? <LineGraphSimple showDatasetMap={showX}  data={JSON.parse(dataB)} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, JSON.parse(rawDictTimestampsB)); }} title="BN(V)"/> : ""}
        { showCharts["cnv"] ? <LineGraphSimple showDatasetMap={showX} data={JSON.parse(dataC)} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, JSON.parse(rawDictTimestampsC)); }} title="CN(V)"/> : ""}
        <Space classes="h-[30px]"/>
  </Fragment>);
}

export default AmpsGraph;