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
import { GetAmpsDataRequest, GetChartData } from "../../../interfaces/electripure-service";
import LineGraphSimple from "../LineGraphSimple";
import Space from "../../Space";
import InputCheckbox from "../../FormInput/InputCheckbox";
import { INPUT_CONTROL_STATE, ORIENTATION_INPUT, TYPE_DATE_RANGE, TYPE_EVENTS_EVENT, TYPE_EVENTS_ZOOM } from "../../../config/enum";
import { ButtonPrimary } from "../../FormInput/Button";
import DateRangeControlCustom from "../DateRangeControlCustom";
import DateRangeControlCustom2 from "../DateRangeControlCustom2";
import InputCheckboxIcon from "../../FormInput/InputCheckboxIcon";
import ZoomMenu from "../../ZoomMenu";
import EventMenu from "../../EventMenu";
import GraphMenu from "../../GraphMenu";
import DataMenu from "../../DataMenu";


const initStateData: string = JSON.stringify({ "x": [], "timestamp": [], "x_label": [], "y": {
  "max": [],
  "min": [],
  "average": [],
}});

const colors: any = {
  "max": "#fc0303",
  "min": "#00ff3c",
  "average": "#000000",
  "default": "#ed4278"
};

const initStateShowGraph: string = JSON.stringify({
  "aa": true,
  "ba": false,
  "ca": false,
  "na": false,
  "av": false,
  "bv": false,
  "cv": false,
  "gv": false
});

const graphMetadata: any[] = [
  {
    "key": "aa",
    "label": "A(A)"
  },
  {
    "key": "ba",
    "label": "B(A)"
  },
  {
    "key": "ca",
    "label": "C(A)"
  },
  {
    "key": "na",
    "label": "N(A)"
  },
  {
    "key": "av",
    "label": "A(V)"
  },
  {
    "key": "bv",
    "label": "B(V)"
  },
  {
    "key": "cv",
    "label": "C(V)"
  },
  {
    "key": "gv",
    "label": "G(V)"
  }
];

const initStateShowData: string = JSON.stringify({
  "max": true,
  "min": true,
  "average": true
});

const dataMetadata: any = [{
  "key": "max",
  "label": "Maximun"
}, {
  "key": "average",
  "label": "Average"
}, {
  "key": "min",
  "label": "Minimum"
}];

function resultToData(result: any): string {
  return JSON.stringify({
    "x": result["TS_data"],
    "x_label": result["TS_data_label"],
    "timestamp": result["TS_unix"],
    "y": {
      "max": result["MAX_data"],
      "min": result["MIN_data"],
      "average": result["AVERAGE_data"]
    }
  });
}

function VoltageCurrentGraph ({ defaultMeterId }: { defaultMeterId?: number }) {
  // get deviceId [Not editable]
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);

  // Import dispatch [Not editable]
  const dispatch = useDispatch();

  // Create states by each graph
  const [rawDataAA, setRawDataAA] = useState(initStateData);
  const [rawDataBA, setRawDataBA] = useState(initStateData);
  const [rawDataCA, setRawDataCA] = useState(initStateData);
  const [rawDataNA, setRawDataNA] = useState(initStateData);
  const [rawDataAV, setRawDataAV] = useState(initStateData);
  const [rawDataBV, setRawDataBV] = useState(initStateData);
  const [rawDataCV, setRawDataCV] = useState(initStateData);
  const [rawDataGV, setRawDataGV] = useState(initStateData);
  const dataAA = JSON.parse(rawDataAA);
  const dataBA = JSON.parse(rawDataBA);
  const dataCA = JSON.parse(rawDataCA);
  const dataNA = JSON.parse(rawDataNA);
  const dataAV = JSON.parse(rawDataAV);
  const dataBV = JSON.parse(rawDataBV);
  const dataCV = JSON.parse(rawDataCV);
  const dataGV = JSON.parse(rawDataGV);

  // Create state for show / hide elements [Not editable]
  const [rawShowCharts, setRawShowCharts] = useState(initStateShowGraph);
  const [rawShowData, setRawShowData] = useState(initStateShowData);
  const [showTooltip, setShowTootip] = useState(true);
  const [showLegends, setShowLegends] = useState(false);
  const showData: any = JSON.parse(rawShowData);
  const showCharts: any = JSON.parse(rawShowCharts);

  // state for the data range  [Not editable]
  const [startTimestampFilter, setStartTimestampFilter] = useState(0);
  const [endTimestampFilter, setEndTimestampFilter] = useState(0);

  // state for the Zoom [Not editable]
  const [rawZoomHistory, setRawZoomHistory] = useState("[]");
  const zoomHistory: any = JSON.parse(rawZoomHistory);


  
  const blockLastInputShowX: boolean = Object.values(showData).filter(show => show).length == 1;
  
  const blockLastInputShowChart: boolean = Object.values(showCharts).filter(show => show).length == 1;
  const graphicsVisible: number =  Object.values(showCharts).filter(show => show).length;

  // Toogle charts [Not editable]
  function toogleCharts(chart: string, show: boolean) {
    showCharts[chart] = show;
    setRawShowCharts(JSON.stringify(showCharts));
  }
  // Toogle charts [Not editable]
  function toogleData(chart: string, show: boolean) {
    showData[chart] = show;
    setRawShowData(JSON.stringify(showData));
  }

  // get the chart data and store it locally
  async function requestData(payload: GetChartData) {
    console.log(`From: ${new Date(payload.date_min! * 1000)} - To: ${new Date(payload.date_max! * 1000)}`);
    // Solitar datos
    dispatch(setLoading({
      loading: true
    }));
    const responseAA: ResponseGeneric = await ElectripureService.getAmpsDataAGraph(payload);
    const responseBA: ResponseGeneric = await ElectripureService.getAmpsDataBGraph(payload);
    const responseCA: ResponseGeneric = await ElectripureService.getAmpsDataCGraph(payload);
    const responseNA: ResponseGeneric = await ElectripureService.getAmpsDataNGraph(payload);
    const responseAV: ResponseGeneric = await ElectripureService.getVoltsDataAGraph(payload);
    const responseBV: ResponseGeneric = await ElectripureService.getVoltsDataBGraph(payload);
    const responseCV: ResponseGeneric = await ElectripureService.getVoltsDataCGraph(payload);
    const responseGV: ResponseGeneric = await ElectripureService.getVoltsDataGGraph(payload);
    [responseAA,
      responseBA,
      responseCA,
      responseNA,
      responseAV,
      responseBV,
      responseCV,
      responseGV].map((response) => {
        if(!response.success) {
            dispatch(showToast({
                message: responseAA.error!,
                status: "error"
            }));
            dispatch(setLoading({
              loading: false
            }));
            throw new Error("Problemas al obtener la data de los graficos.");
        };
    })
    dispatch(setLoading({
      loading: false
    }));
    // Store the data obtained
    setRawDataAA(resultToData(responseAA.data));
    setRawDataBA(resultToData(responseBA.data));
    setRawDataCA(resultToData(responseCA.data));
    setRawDataNA(resultToData(responseNA.data));
    setRawDataAV(resultToData(responseAV.data));
    setRawDataBV(resultToData(responseBV.data));
    setRawDataCV(resultToData(responseCV.data));
    setRawDataGV(resultToData(responseGV.data));
  }

  // On filter [Not editable]
  async function onFilter(start: Date | null, end: Date | null) {
    const dateMin: number | null = start != null ? toUnix(start.getTime()) : null;
    const dateMax: number | null = end != null ? toUnix(end.getTime()) : null;
    await requestData({
      date_min: dateMin,
      date_max: dateMax,
      device: deviceId,
      points: null
    });
    // Store filter
    setStartTimestampFilter(dateMin ?? 0);
    setEndTimestampFilter(dateMax ?? 0);
    // clear zoom history
    setRawZoomHistory("[]");
  }

  // Show Only max and min
  function showOnlyMinMax() {
    toogleData("max", true);
    toogleData("min", true);
    toogleData("average", false);
  }

  // On Zoom [Not editable]
  async function onZoom(x1:any, x2: any, data: any) {
    const dateMin: number = data.timestamp[x1];
    const dateMax: number = data.timestamp[x2];
    await requestData({
      date_min: dateMin,
      date_max: dateMax,
      device: deviceId,
      points: null
    });
    // Store zoom history
    setRawZoomHistory(JSON.stringify([...zoomHistory, {
      date_min: dateMin,
      date_max: dateMax
    }]));
  }

  // Zoom Out [Not editable]
  async function zoomOut() {
    if (zoomHistory.length > 0) {
      if (zoomHistory.length == 1) {
        resetZoom()
      } else if (zoomHistory.length > 1)  {
        await requestData({
          date_min: zoomHistory[zoomHistory.length - 2].date_min,
          // 86400 es igual a un dia mas.
          date_max: zoomHistory[zoomHistory.length - 2].date_max,
          device: deviceId,
          points: null
        });
  
        let tmpZoom = [...zoomHistory];
        var removed = tmpZoom.splice(-1); 
        setRawZoomHistory(JSON.stringify(tmpZoom));
      }
    }
  }

  // Zoom In
  async function zoomIn() {
    const split = Math.ceil((dataAA.timestamp.length / 4) / 2)
    const dateMin: number = dataAA.timestamp[split - 1];
    const dateMax: number = dataAA.timestamp[dataAA.timestamp.length - split - 1];
    await requestData({
      date_min: dateMin,
      date_max: dateMax,
      device: deviceId,
      points: null
    });
    setRawZoomHistory(JSON.stringify([...zoomHistory, {
      date_min: dateMin,
      date_max: dateMax
    }]));
  }

  // Reset zoom [Not editable]
  async function resetZoom() {
    await requestData({
      date_min: startTimestampFilter,
      date_max: endTimestampFilter,
      device: deviceId,
      points: null
    });
    // Clear zoom history
    setRawZoomHistory("[]");
  }

  // Get height max [Not editable]
  const containerGraph = useRef(null);
  const [heightControl, setHeightControl] = useState(0);
  useEffect(() => {
    setHeightControl((containerGraph.current as any).clientHeight);
  }, []);

  // Get position mouse and show menu [Not editable]
  const [leftMenu, setLeftMenu] = useState(0);
  const [topMenu, setTopMenu] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef(null);
  function handlerRight(e: any) {
    e = e || window.event;
    e.preventDefault()
    let rect = (containerRef.current as any).getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    setLeftMenu(x);
    setTopMenu(y);
    setShowMenu(true);
    return false;
  }
  function handlerClick(e: any) {
    if (showMenu) {
      setShowMenu(false);
    }
  }


  return (<div className="relative h-full w-full">
        <div ref={containerGraph}>
          <div className="flex justify-start flex-wrap md:flex-nowrap w-[100%]">
            <div className="min-w-full sm:min-w-[250px]">
              <DateRangeControlCustom2 defaultStart={new Date(new Date().toDateString())} defaultEnd={new Date()} onChange={onFilter}/>
            </div>
            <Space classes="w-[10px] h-[10px]"/>
            <div className="w-full sm:w-auto flex justify-center items-center">
              <ZoomMenu records={dataAA.timestamp.length } zooms={zoomHistory.length} onChange={(type:TYPE_EVENTS_ZOOM, checked: boolean)=> {
                if (type == TYPE_EVENTS_ZOOM.IN) zoomIn()
                else if (type == TYPE_EVENTS_ZOOM.OUT) zoomOut()
                else if (type == TYPE_EVENTS_ZOOM.RESET) resetZoom()  
              }} />
              <Space classes="w-[10px]" />
              <EventMenu legend={showLegends} tooltip={showTooltip}  onChange={(type:TYPE_EVENTS_EVENT, checked: boolean)=> {
                if (type == TYPE_EVENTS_EVENT.LEGENDS) setShowLegends(checked);
                else if (type == TYPE_EVENTS_EVENT.TOOLTIP) setShowTootip(checked);
              }} />
            </div>
          </div>
          <Space classes="w-[100%] h-[20px]"/>
          <div className="flex justify-between flex-wrap w-[100%]">
            <div>
              <strong>
                Channels
              </strong>
              <div className="flex items-center flex-wrap">
                <GraphMenu metadata={graphMetadata} selections={showCharts} onChange={(info, checked)=> {
                  toogleCharts(info.key, checked);
                }}/>
              </div>
            </div>
            <div>
              <strong>
                Display
              </strong>
              <div className="flex justify-center items-center">
                  <DataMenu metadata={dataMetadata} selections={showData} onChange={(info, checked)=> {
                    toogleData(info.key, checked);
                  }}/>
              </div>     
            </div>
          </div>
          <Space classes="w-[100%] h-[20px]"/>
        </div>
        <div ref={containerRef} className="w-full flex justify-start flex-col absolute left-0 bottom-0 " style={{"height": `calc(100% - ${heightControl}px)`}} onClick={(e)=> {handlerClick(e)}} onContextMenu={(e)=> {handlerRight(e)}}>
          { showMenu ? <div className="absolute bg-white p-[5px] shadow shadow-gray-50 border-[1px]" style={{"left": `${leftMenu}px`, "top": `${topMenu}px`}}>
            <ul>
              <li className="p-[5px] cursor-pointer" onClick={()=> {setShowTootip(!showTooltip)}}>View Cursor</li>
              <li className="p-[5px] cursor-pointer" onClick={()=> {setShowLegends(!showLegends)}}>View Legend</li>
              <li className="p-[5px] cursor-pointer" onClick={showOnlyMinMax}>View max/min values</li>
            </ul>
          </div>: ""}
          { showLegends ? <div className="w-full flex justify-center" >
                  {dataMetadata.map((info: any)=> {
                      return (<div className="flex justify-center items-center mx-[10px]">
                        <div className="w-[10px] h-[10px] mx-[5px]" style={{"backgroundColor": colors[info.key]}}></div>
                        <strong>{info.label.toUpperCase()}</strong>
                      </div>);
                  })}
          </div>: ""}
          { showCharts["aa"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}}>
              <LineGraphSimple labels={dataAA.x_label} showTooltip={showTooltip} showDatasetMap={showData} data={{"x": dataAA.x, "y": dataAA.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataAA); }} title="A(A)"/>
            </div> : ""}
          { showCharts["ba"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
              <LineGraphSimple labels={dataBA.x_label} showTooltip={showTooltip} showDatasetMap={showData}  data={{"x": dataBA.x, "y": dataBA.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataBA); }} title="B(A)"/> 
            </div>: ""}
          { showCharts["ca"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
              <LineGraphSimple labels={dataCA.x_label} showTooltip={showTooltip} showDatasetMap={showData} data={{"x": dataCA.x, "y": dataCA.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataCA); }} title="C(A)"/>
            </div>: ""}
          { showCharts["na"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
              <LineGraphSimple labels={dataNA.x_label} showTooltip={showTooltip} showDatasetMap={showData} data={{"x": dataNA.x, "y": dataNA.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataNA); }} title="N(A)"/>
            </div>: ""}

          { showCharts["av"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
            <LineGraphSimple labels={dataAV.x_label} showTooltip={showTooltip} showDatasetMap={showData} data={{"x": dataAV.x, "y": dataAV.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataAV); }} title="A(V)"/>
          </div>: ""}
          { showCharts["bv"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
            <LineGraphSimple labels={dataBV.x_label} showTooltip={showTooltip} showDatasetMap={showData} data={{"x": dataBV.x, "y": dataBV.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataBV); }} title="B(V)"/>
          </div>: ""}
          { showCharts["cv"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
            <LineGraphSimple labels={dataCV.x_label} showTooltip={showTooltip} showDatasetMap={showData} data={{"x": dataCV.x, "y": dataCV.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataCV); }} title="C(V)"/>
          </div>: ""}
          { showCharts["gv"] ? <div className={"w-full "} style={{"height": `${(100/ graphicsVisible)}%`}} >
            <LineGraphSimple labels={dataGV.x_label} showTooltip={showTooltip} showDatasetMap={showData} data={{"x": dataGV.x, "y": dataGV.y}} colors={colors} onZoom={(x1: any, x2: any) => { onZoom(x1, x2, dataGV); }} title="G(V)"/>
          </div>: ""}
        </div>
  </div>);
}

export default VoltageCurrentGraph;