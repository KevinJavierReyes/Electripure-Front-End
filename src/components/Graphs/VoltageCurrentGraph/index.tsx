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
  const [rawDataAA, setRawDataAA] = useState(JSON.stringify({ "x": [], "x_label": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  const [rawDataBA, setRawDataBA] = useState(JSON.stringify({ "x": [], "x_label": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  const [rawDataCA, setRawDataCA] = useState(JSON.stringify({ "x": [], "x_label": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  const [rawDataNA, setRawDataNA] = useState(JSON.stringify({ "x": [], "x_label": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  const [rawDataAV, setRawDataAV] = useState(JSON.stringify({ "x": [], "x_label": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  const [rawDataBV, setRawDataBV] = useState(JSON.stringify({ "x": [], "x_label": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  const [rawDataCV, setRawDataCV] = useState(JSON.stringify({ "x": [], "x_label": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));
  const [rawDataGV, setRawDataGV] = useState(JSON.stringify({ "x": [], "x_label": [], "y": {
    "max": [],
    "min": [],
    "average": [],
  }}));


  // Config
  const colors: any = {
    "max": "#fc0303",
    "min": "#00ff3c",
    "average": "#000000",
    "default": "#ed4278"
  };
  const [rawShowCharts, setRawShowCharts] = useState(JSON.stringify({
    "aa": true,
    "ba": false,
    "ca": false,
    "na": false,
    "av": true,
    "bv": false,
    "cv": false,
    "gv": false
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
  const dataAA = JSON.parse(rawDataAA);
  const dataBA = JSON.parse(rawDataBA);
  const dataCA = JSON.parse(rawDataCA);
  const dataNA = JSON.parse(rawDataNA);
  const dataAV = JSON.parse(rawDataAV);
  const dataBV = JSON.parse(rawDataBV);
  const dataCV = JSON.parse(rawDataCV);
  const dataGV = JSON.parse(rawDataGV);
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
    // Solitar datos
    const responseAA: ResponseGeneric = await ElectripureService.getAmpsDataAGraph(payload);
    const responseBA: ResponseGeneric = await ElectripureService.getAmpsDataBGraph(payload);
    const responseCA: ResponseGeneric = await ElectripureService.getAmpsDataCGraph(payload);
    const responseNA: ResponseGeneric = await ElectripureService.getAmpsDataNGraph(payload);

    const responseAV: ResponseGeneric = await ElectripureService.getVoltsDataAGraph(payload);
    const responseBV: ResponseGeneric = await ElectripureService.getVoltsDataBGraph(payload);
    const responseCV: ResponseGeneric = await ElectripureService.getVoltsDataCGraph(payload);
    const responseGV: ResponseGeneric = await ElectripureService.getVoltsDataGGraph(payload);


    // Validar datos obtenidos
    if(!responseAA.success) {
        dispatch(showToast({
            message: responseAA.error!,
            status: "error"
        }));
        return;
    };
    let dataAA: any = responseAA.data;
    if(!responseBA.success) {
      dispatch(showToast({
          message: responseBA.error!,
          status: "error"
      }));
      return;
    };
    let dataBA: any = responseBA.data;
    if(!responseCA.success) {
      dispatch(showToast({
          message: responseCA.error!,
          status: "error"
      }));
      return;
    };
    let dataCA: any = responseCA.data;
    if(!responseNA.success) {
      dispatch(showToast({
          message: responseNA.error!,
          status: "error"
      }));
      return;
    };
    let dataNA: any = responseNA.data;
    dispatch(setLoading({
        loading: false
    }));

    if(!responseAV.success) {
      dispatch(showToast({
          message: responseAV.error!,
          status: "error"
      }));
      return;
    };
    let dataAV: any = responseAV.data;
    if(!responseBV.success) {
      dispatch(showToast({
          message: responseBV.error!,
          status: "error"
      }));
      return;
    };
    let dataBV: any = responseBV.data;
    if(!responseCV.success) {
      dispatch(showToast({
          message: responseCV.error!,
          status: "error"
      }));
      return;
    };
    let dataCV: any = responseCV.data;
    if(!responseGV.success) {
      dispatch(showToast({
          message: responseGV.error!,
          status: "error"
      }));
      return;
    };
    let dataGV: any = responseGV.data;


    // Almacenar datos
    setRawDataAA(JSON.stringify({
      "x": dataAA["TS_data"],
      "x_label": dataAA["TS_data_label"],
      "timestamp": dataAA["TS_unix"],
      "y": {
        "max": dataAA["MAX_data"],
        "min": dataAA["MIN_data"],
        "average": dataAA["AVERAGE_data"]
      }
    }));
    setRawDataBA(JSON.stringify({
      "x": dataBA["TS_data"],
      "x_label": dataBA["TS_data_label"],
      "timestamp": dataBA["TS_unix"],
      "y": {
        "max": dataBA["MAX_data"],
        "min": dataBA["MIN_data"],
        "average": dataBA["AVERAGE_data"]
      }
    }));
    setRawDataCA(JSON.stringify({
      "x": dataCA["TS_data"],
      "x_label": dataCA["TS_data_label"],
      "timestamp": dataCA["TS_unix"],
      "y": {
        "max": dataCA["MAX_data"],
        "min": dataCA["MIN_data"],
        "average": dataCA["AVERAGE_data"]
      }
    }));
    setRawDataNA(JSON.stringify({
      "x": dataNA["TS_data"],
      "x_label": dataNA["TS_data_label"],
      "timestamp": dataNA["TS_unix"],
      "y": {
        "max": dataNA["MAX_data"],
        "min": dataNA["MIN_data"],
        "average": dataNA["AVERAGE_data"]
      }
    }));


    setRawDataAV(JSON.stringify({
      "x": dataAV["TS_data"],
      "x_label": dataAV["TS_data_label"],
      "timestamp": dataAV["TS_unix"],
      "y": {
        "max": dataAV["MAX_data"],
        "min": dataAV["MIN_data"],
        "average": dataAV["AVERAGE_data"]
      }
    }));
    setRawDataBV(JSON.stringify({
      "x": dataBV["TS_data"],
      "x_label": dataBV["TS_data_label"],
      "timestamp": dataBV["TS_unix"],
      "y": {
        "max": dataBV["MAX_data"],
        "min": dataBV["MIN_data"],
        "average": dataBV["AVERAGE_data"]
      }
    }));
    setRawDataCV(JSON.stringify({
      "x": dataCV["TS_data"],
      "x_label": dataCV["TS_data_label"],
      "timestamp": dataCV["TS_unix"],
      "y": {
        "max": dataCV["MAX_data"],
        "min": dataCV["MIN_data"],
        "average": dataCV["AVERAGE_data"]
      }
    }));
    setRawDataGV(JSON.stringify({
      "x": dataGV["TS_data"],
      "x_label": dataGV["TS_data_label"],
      "timestamp": dataGV["TS_unix"],
      "y": {
        "max": dataGV["MAX_data"],
        "min": dataGV["MIN_data"],
        "average": dataGV["AVERAGE_data"]
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
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  message={""}
                  disabled={blockLastInputShowChart && showCharts["na"]}
                  defaultChecked={showCharts["na"]}
                  classes={`f-semibold`}
                  name={"na"}
                  label={"N(A)"}
                  onChange={(checked: boolean) => {
                    toogleCharts("na", checked);
                  }} />
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  message={""}
                  disabled={blockLastInputShowChart && showCharts["av"]}
                  defaultChecked={showCharts["av"]}
                  classes={`f-semibold`}
                  name={"av"}
                  label={"A(V)"}
                  onChange={(checked: boolean) => {
                    toogleCharts("av", checked);
                  }} />
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  message={""}
                  disabled={blockLastInputShowChart && showCharts["bv"]}
                  defaultChecked={showCharts["bv"]}
                  classes={`f-semibold`}
                  name={"bv"}
                  label={"B(V)"}
                  onChange={(checked: boolean) => {
                    toogleCharts("bv", checked);
                  }} />
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  message={""}
                  disabled={blockLastInputShowChart && showCharts["cv"]}
                  defaultChecked={showCharts["cv"]}
                  classes={`f-semibold`}
                  name={"cv"}
                  label={"C(V)"}
                  onChange={(checked: boolean) => {
                    toogleCharts("cv", checked);
                  }} />
              <InputCheckbox
                  state={INPUT_CONTROL_STATE.DEFAULT}
                  message={""}
                  disabled={blockLastInputShowChart && showCharts["gv"]}
                  defaultChecked={showCharts["gv"]}
                  classes={`f-semibold`}
                  name={"gv"}
                  label={"G(V)"}
                  onChange={(checked: boolean) => {
                    toogleCharts("gv", checked);
                  }} />
            </div>
          </div>
          <Space classes="w-[100%] h-[20px]"/>
        </div>
        <div className="w-full flex justify-start flex-col absolute left-0 bottom-0" style={{"height": `calc(100% - ${heightControl}px)`}}>
          { showCharts["aa"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}}>
              <LineGraphSimple labels={dataAA.x_label} showTooltip={showTooltip} showDatasetMap={showX} data={{"x": dataAA.x, "y": dataAA.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataAA); }} title="A(A)"/>
            </div> : ""}
          { showCharts["ba"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
              <LineGraphSimple labels={dataBA.x_label} showTooltip={showTooltip} showDatasetMap={showX}  data={{"x": dataBA.x, "y": dataBA.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataBA); }} title="B(A)"/> 
            </div>: ""}
          { showCharts["ca"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
              <LineGraphSimple labels={dataCA.x_label} showTooltip={showTooltip} showDatasetMap={showX} data={{"x": dataCA.x, "y": dataCA.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataCA); }} title="C(A)"/>
            </div>: ""}
          { showCharts["na"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
              <LineGraphSimple labels={dataNA.x_label} showTooltip={showTooltip} showDatasetMap={showX} data={{"x": dataNA.x, "y": dataNA.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataNA); }} title="N(A)"/>
            </div>: ""}

          { showCharts["av"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
            <LineGraphSimple labels={dataAV.x_label} showTooltip={showTooltip} showDatasetMap={showX} data={{"x": dataAV.x, "y": dataAV.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataAV); }} title="A(V)"/>
          </div>: ""}
          { showCharts["bv"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
            <LineGraphSimple labels={dataBV.x_label} showTooltip={showTooltip} showDatasetMap={showX} data={{"x": dataBV.x, "y": dataBV.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataBV); }} title="B(V)"/>
          </div>: ""}
          { showCharts["cv"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
            <LineGraphSimple labels={dataCV.x_label} showTooltip={showTooltip} showDatasetMap={showX} data={{"x": dataCV.x, "y": dataCV.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataCV); }} title="C(V)"/>
          </div>: ""}
          { showCharts["gv"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
            <LineGraphSimple labels={dataGV.x_label} showTooltip={showTooltip} showDatasetMap={showX} data={{"x": dataGV.x, "y": dataGV.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataGV); }} title="G(V)"/>
          </div>: ""}
        </div>
  </div>);
}

export default VoltageCurrentGraph;