import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DateRangeControl from "../DateRangeControl";
import { setLoading, showToast } from "../../../actions/electripure";
import { timestampToDateLocal } from "../../../libs/dateformat";
import LineGraph from "../LineGraph";
import ElectripureService from "../../../service/electripure-service";
import { ResponseGeneric } from "../../../interfaces/base-service";
import { useParams } from "react-router";
import DateRangeControlAndPoint from "../DateRangeControlAndPoint";
import { toDictTimestamps, toUnix } from "../../../utils/parser";
import { GetAmpsDataRequest } from "../../../interfaces/electripure-service";
import LineGraphSimple from "../LineGraphSimple";
import Space from "../../Space";
import InputCheckbox from "../../FormInput/InputCheckbox";
import { INPUT_CONTROL_STATE, ORIENTATION_INPUT } from "../../../config/enum";
import { ButtonPrimary } from "../../FormInput/Button";
import DateRangeControlCustom from "../DateRangeControlCustom";


function VoltageCurrentGraph ({ defaultMeterId }: { defaultMeterId?: number }) {
  // Obtener deviceId
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  console.log("Render VoltageCurrentGraph......");
  const dispatch = useDispatch();

  const containerGraph = useRef(null);


  // Create states
  const [rawDataA, setRawDataA] = useState(JSON.stringify({ "x": [], "x_label": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  // const [rawDictTimestampsA, setRawDictTimestampsA] = useState(JSON.stringify({}));
  const [rawDataB, setRawDataB] = useState(JSON.stringify({ "x": [], "x_label": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  // const [rawDictTimestampsB, setRawDictTimestampsB] = useState(JSON.stringify({}));
  const [rawDataC, setRawDataC] = useState(JSON.stringify({ "x": [], "x_label": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  // const [rawDictTimestampsC, setRawDictTimestampsC] = useState(JSON.stringify({}));
  const colors: any = {
    "max": "#fc0303",
    "min": "#00ff3c",
    "average": "#000000",
    "default": "#ed4278"
  };
  const [rawShowCharts, setRawShowCharts] = useState(JSON.stringify({
    "aa": true,
    "ba": false,
    "ca": false
  }));
  const [rawShowX, setRawShowX] = useState(JSON.stringify({
    "max": true,
    "min": true,
    "average": true
  }));
  const [showTooltip, setShowTootip] = useState(true);
  const [startTimestampFilter, setStartTimestampFilter] = useState(0);
  const [endTimestampFilter, setEndTimestampFilter] = useState(0);
  const [countZoomIn, setCountZoomIn] = useState(0);
  const showX: any = JSON.parse(rawShowX);
  const blockLastInputShowX: boolean = Object.values(showX).filter(show => show).length == 1;
  const showCharts: any = JSON.parse(rawShowCharts);
  const blockLastInputShowChart: boolean = Object.values(showCharts).filter(show => show).length == 1;
  const graphicsVisible: number =  Object.values(showCharts).filter(show => show).length;
  const dataA = JSON.parse(rawDataA);
  const dataB = JSON.parse(rawDataB);
  const dataC = JSON.parse(rawDataC);
  // Toogle tooltip
  function toogleTooltip(show: boolean) {
    setShowTootip(show);
  }
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
    console.log("Date min");
    console.log(new Date(payload.date_min! * 1000));
    console.log("Date max");
    console.log(new Date(payload.date_max! * 1000));
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
    // setRawDictTimestampsA(JSON.stringify(toDictTimestamps(dataA)));
    // setRawDictTimestampsB(JSON.stringify(toDictTimestamps(dataB)));
    // setRawDictTimestampsC(JSON.stringify(toDictTimestamps(dataC)));
    setRawDataA(JSON.stringify({
      "x": dataA["TS_data"],
      "x_label": dataA["TS_data_label"],
      "timestamp": dataA["TS_unix"],
      "y": {
        "max": dataA["A1_MAX_data"],
        "min": dataA["A1_MIN_data"],
        "average": dataA["A1_data"]
      }
    }));
    setRawDataB(JSON.stringify({
      "x": dataA["TS_data"],
      "x_label": dataA["TS_data_label"],
      "timestamp": dataA["TS_unix"],
      "y": {
        "max": dataB["A1_MAX_data"],
        "min": dataB["A1_MIN_data"],
        "average": dataB["A1_data"]
      }
    }));
    setRawDataC(JSON.stringify({
      "x": dataA["TS_data"],
      "x_label": dataA["TS_data_label"],
      "timestamp": dataA["TS_unix"],
      "y": {
        "max": dataC["A1_MAX_data"],
        "min": dataC["A1_MIN_data"],
        "average": dataC["A1_data"]
      }
    }));
  }
  // Obtener datos por filtro
  async function getAmpsData(start: Date | null, end: Date | null) {
    // const dateMin: number | null = start != null ? toUnix(start.getTime()) : null;
    // const dateMax: number | null = end != null ? toUnix(end.getTime()) + 86400 : null;
    
    const dateMin: number | null = start != null ? toUnix(new Date(start.getTime() - (start.getTime() % 86400000)).getTime()) : null;
    const dateMax: number | null = end != null ? toUnix(new Date(end.getTime() - (end.getTime() % 86400000)).getTime()) + 86400 : null;
    
    await requestChartsData({
      date_min: dateMin,
      // 86400 es igual a un dia mas.
      date_max: dateMax,
      device: deviceId,
      points: null
    });
    setStartTimestampFilter(dateMin ?? 0);
    setEndTimestampFilter(dateMax ?? 0);
    setCountZoomIn(0);
  }
  // Obtener datos por evento zoom
  async function onZoom(x1:any, x2: any, data: any) {
    const dateMin: number = data.timestamp[x1];
    const dateMax: number = data.timestamp[x2];
    await requestChartsData({
      date_min: dateMin,
      date_max: dateMax,
      device: deviceId,
      points: null
    });
    setCountZoomIn(countZoomIn + 1);
  }

  async function zoomOut() {
    await requestChartsData({
      date_min: startTimestampFilter,
      // 86400 es igual a un dia mas.
      date_max: endTimestampFilter,
      device: deviceId,
      points: null
    });
    setCountZoomIn(0);
  }


  const [heightControl, setHeightControl] = useState(0);

  useEffect(() => {
    // console.log('height: ', containerGraph.current.clientHeight);
    // console.log('width: ', containerGraph.current.clientWidth);
    setHeightControl((containerGraph.current as any).clientHeight);
  }, []);

  return (<div className="relative h-full w-full">
        <div ref={containerGraph}>
          <div className="flex justify-start flex-wrap md:flex-nowrap w-[100%]">
            <div className="w-full md:w-[250px] flex justify-center">
              <div className="w-full sm:w-[250px]">
                <DateRangeControlCustom defaultEnd={new Date()} defaultStart={new Date()} onChange={getAmpsData}/>
              </div>
            </div>
            <Space classes="w-[100%] h-[10px]"/>
            <div className="w-full md:w-auto flex justify-center items-center">
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  orientation={ORIENTATION_INPUT.LEFT} 
                  message={""}
                  disabled={blockLastInputShowX && showX["max"]}
                  defaultChecked={showX["max"]}
                  classes={`f-semibold`}
                  name={"max"}
                  label={"MAX"}
                  onChange={(checked: boolean) => {
                    toogleX("max", checked);
                  }} />
              <Space classes="w-[10px]" />
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  orientation={ORIENTATION_INPUT.LEFT} 
                  message={""}
                  disabled={blockLastInputShowX && showX["min"]}
                  defaultChecked={showX["min"]}
                  classes={`f-semibold`}
                  name={"min"}
                  label={"MIN"}
                  onChange={(checked: boolean) => {
                    toogleX("min", checked);
                  }} />
              <Space classes="w-[10px]" />
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  orientation={ORIENTATION_INPUT.LEFT} 
                  message={""}
                  disabled={blockLastInputShowX && showX["average"]}
                  defaultChecked={showX["average"]}
                  classes={`f-semibold`}
                  name={"average"}
                  label={"AVG"}
                  onChange={(checked: boolean) => {
                    toogleX("average", checked);
                  }} />
            </div>     
            <Space classes="w-[100%] h-[10px]"/>
            <div className="w-full md:w-[250px] flex justify-center items-center">
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  orientation={ORIENTATION_INPUT.LEFT}
                  message={""}
                  disabled={false}
                  defaultChecked={showTooltip}
                  classes={`f-semibold`}
                  name={"tooltip"}
                  label={"LEGENDS"}
                  onChange={(checked: boolean) => {
                    toogleTooltip(checked);
                  }} />
              <Space classes="w-[10px]" />
              <div className="w-[260px]">
                <ButtonPrimary
                  children={"Restore Zoom"}
                  onClick={zoomOut}
                  classes={"bg-secondary px-[4px]"}
                  disabled={countZoomIn == 0}/>
              </div>
            </div>
          </div>
          <Space classes="w-[100%] h-[20px]"/>
          <div className="flex justify-between flex-wrap w-[100%]">
            <div className="flex items-center">
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  message={""}
                  disabled={blockLastInputShowChart && showCharts["aa"]}
                  defaultChecked={showCharts["aa"]}
                  classes={`f-semibold`}
                  name={"aa"}
                  label={"A(A)"}
                  onChange={(checked: boolean) => {
                    toogleCharts("aa", checked);
                  }} />
              <Space classes="w-[10px]" />
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  message={""}
                  disabled={blockLastInputShowChart && showCharts["ba"]}
                  defaultChecked={showCharts["ba"]}
                  classes={`f-semibold`}
                  name={"ba"}
                  label={"B(A)"}
                  onChange={(checked: boolean) => {
                    toogleCharts("ba", checked);
                  }} />
              <Space classes="w-[10px]" />
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  message={""}
                  disabled={blockLastInputShowChart && showCharts["ca"]}
                  defaultChecked={showCharts["ca"]}
                  classes={`f-semibold`}
                  name={"ca"}
                  label={"C(A)"}
                  onChange={(checked: boolean) => {
                    toogleCharts("ca", checked);
                  }} />
            </div>
          </div>
          <Space classes="w-[100%] h-[20px]"/>
        </div>
        <div className="w-full flex justify-start flex-col absolute left-0 bottom-0" style={{"height": `calc(100% - ${heightControl}px)`}}>
          { showCharts["aa"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}}>
              <LineGraphSimple labels={dataA.x_label} showTooltip={showTooltip} showDatasetMap={showX} data={{"x": dataA.x, "y": dataA.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataA); }} title="A(A)"/>
            </div> : ""}
          { showCharts["ba"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
              <LineGraphSimple labels={dataB.x_label} showTooltip={showTooltip} showDatasetMap={showX}  data={{"x": dataB.x_label, "y": dataB.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataB); }} title="B(A)"/> 
            </div>: ""}
          { showCharts["ca"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
              <LineGraphSimple labels={dataC.x_label} showTooltip={showTooltip} showDatasetMap={showX} data={{"x": dataC.x_label, "y": dataC.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataC); }} title="C(A)"/>
            </div>: ""}
        </div>
  </div>);
}

export default VoltageCurrentGraph;