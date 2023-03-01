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
import { DataMetadata, GraphMetadata, GroupColorDataPowerLog, GroupDataGraphPowerLog, GroupShowDataPowerLog, GroupShowGraphPowerLog, GroupShowGroupDataPowerLog, ZoomPowerLog } from "../../../interfaces/graph";


const initStateData: string = JSON.stringify({ "x": [], "timestamp": [], "x_label": [], "y": {
  // "max": [],
  // "min": [],
  // "average": [],
}});

function generateInitStateData(metadata: GraphMetadata[]): GroupDataGraphPowerLog  {
  let state: any = {}
  metadata.map((info: GraphMetadata) => {
    state[info.key] = initStateData;
  });
  return state;
}

function generateInitStateColor(metadata: DataMetadata[]): GroupColorDataPowerLog{
  let state: any = {}
  metadata.map((info: DataMetadata) => {
    state[info.key] = info.color;
  });
  return state;
}

function generateInitStateShowData(metadata: DataMetadata[]): GroupShowDataPowerLog {
  let state: any = {}
  metadata.map((info: DataMetadata, index: number) => {
    state[info.key] = true;
  });
  return state;
}

function generateInitStateShowGraph(metadata: GraphMetadata[]): GroupShowGraphPowerLog {
  let state: any = {}
  metadata.map((info: GraphMetadata, index: number) => {
    state[info.key] = index == 0;
  });
  return state;
}

function generateInitStateLabelsGroups(metadata: DataMetadata[]): GroupShowGroupDataPowerLog {
  let state: any = {

  };
  metadata.map((info: DataMetadata, index: number) => {
    info.group?.map((group: string, index: number) => {
      if (!state.hasOwnProperty(group)) state[group] = {};
      if (!state[group].hasOwnProperty(info.label[index])) state[group][info.label[index]] = {"keys":[]};
      state[group][info.label[index]].show = true;
      state[group][info.label[index]].keys.push(info.key);
    });
  });
  return state;
}

function PowerLogGraph ({ deviceId, resultToData, dataMetadata, graphMetadata }: { deviceId: number,  resultToData: (result: any) => string, graphMetadata: GraphMetadata[], dataMetadata: DataMetadata[] }) {
  // Import dispatch [Not editable]
  const dispatch = useDispatch();

  // Create states by each graph
  const [rawData, setRawData] = useState(JSON.stringify(generateInitStateData(graphMetadata)));
  // Almacena en un diccionario la data de cada grafico
  const data: GroupDataGraphPowerLog = JSON.parse(rawData);
  
  // Create state for show / hide elements [Not editable]
  const [rawShowCharts, setRawShowCharts] = useState(JSON.stringify(generateInitStateShowGraph(graphMetadata)));
  const [rawShowData, setRawShowData] = useState(JSON.stringify(generateInitStateShowData(dataMetadata)));
  const [rawShowGroupData, setRawShowGroupData] = useState((dataMetadata.length > 0 && dataMetadata[0].hasOwnProperty("group"))? JSON.stringify(generateInitStateLabelsGroups(dataMetadata)) : "{}");
  const [showTooltip, setShowTootip] = useState(true);
  const [showLegends, setShowLegends] = useState(false);
  // Diccionario de colores
  const colors: GroupColorDataPowerLog = generateInitStateColor(dataMetadata);
  // Diccionario para guardar el estado show/hide de las lineas
  const showData: GroupShowDataPowerLog = JSON.parse(rawShowData);
  // Diccionario para guardar el estado show/hide de las lineas
  const showGroupData: GroupShowGroupDataPowerLog = JSON.parse(rawShowGroupData);
  // Diccionario para guardar el estado show/hide de los graficos
  const showCharts: GroupShowGraphPowerLog = JSON.parse(rawShowCharts);
  // Flag para saber se mostrara por grupos o no las lineas
  const isGroupData: boolean = Object.keys(showGroupData).length > 0;

  // state for the data range  [Not editable]
  const [startTimestampFilter, setStartTimestampFilter] = useState(0);
  const [endTimestampFilter, setEndTimestampFilter] = useState(0);

  // state for the Zoom [Not editable]
  const [rawZoomHistory, setRawZoomHistory] = useState("[]");
  const zoomHistory: ZoomPowerLog[] = JSON.parse(rawZoomHistory);

  const graphicsVisible: number =  Object.values(showCharts).filter(show => show).length;

  // Toogle charts show/hide [Not editable]
  function toogleCharts(chart: string, show: boolean) {
    showCharts[chart] = show;
    setRawShowCharts(JSON.stringify(showCharts));
  }
  // Toogle lines show/hide [Not editable]
  function toogleData(chart: string | string[], show: boolean) {
    // console.log(showData);
    if (typeof chart == "string")
      showData[chart] = show;
    else 
      chart.forEach((crt: string) => {
        showData[crt] = show;
      });
    // console.log(showData);
    setRawShowData(JSON.stringify(showData));
  }
  // Toogle lines show/hide by groups [Not editable]
  function toogleGroupData(group: string, label: string, keys: string[], checked: boolean) {
    
    
    // console.log(showGroupData[group])
    if (checked) {
      const groupValid = Object.keys(showGroupData).filter( grp => grp != group);
      let keysBlocked: string[] = [];
      groupValid.map((grp: string) => {
        Object.keys(showGroupData[grp]).map((lbl: string) => {
          if (!showGroupData[grp][lbl].show) {
            keysBlocked = [...keysBlocked, ...showGroupData[grp][lbl].keys]
          }
        })
      });

      toogleData(keys.filter((key)=> {
        return keysBlocked.indexOf(key) == -1
      }), checked);

    } else {
      toogleData(keys, checked);
    }
    showGroupData[group][label].show = checked;
    setRawShowGroupData(JSON.stringify(showGroupData));
  }
  // get the chart data and store it locally [Not editable]
  async function requestData(payload: GetChartData) {
    console.log(`From: ${new Date(payload.date_min! * 1000)} - To: ${new Date(payload.date_max! * 1000)}`);
    // Solitar datos
    dispatch(setLoading({
      loading: true
    }));
    await Promise.all(graphMetadata.map(async (info: GraphMetadata, index: number)=> {
      const response: ResponseGeneric = await ElectripureService.getDataGraph(info.url, payload);
      if(!response.success) {
        dispatch(showToast({
            message: response.error!,
            status: "error"
        }));
        dispatch(setLoading({
          loading: false
        }));
        throw new Error("Problemas al obtener la data de los graficos.");
      };
      (data as any)[info.key] = resultToData(response.data);
    }));
    dispatch(setLoading({
      loading: false
    }));
    setRawData(JSON.stringify(data));
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
  const [maxmin, setMaxMin] = useState(true);
  function showOnlyMinMax() {
    toogleData("max", maxmin);
    toogleData("min", maxmin);
    toogleData("average", !maxmin);
    setMaxMin(!maxmin)
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

  // Zoom In [Not editable]
  async function zoomIn() {
    let keys = Object.keys(data);
    if (keys.length == 0) {
      return;
    }
    const dataX = JSON.parse((data as any)[keys[0]]);
    const split = Math.ceil((dataX.timestamp.length / 4) / 2)
    const dateMin: number = dataX.timestamp[split - 1];
    const dateMax: number = dataX.timestamp[dataX.timestamp.length - split - 1];
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
  // Open menu
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
  // Close menu
  function handlerClick(e: any) {
    if (showMenu) {
      setShowMenu(false);
    }
  }

  return (<div className="relative h-full w-full">

        {/* Controls and filters */}
        <div ref={containerGraph}>
          {/* Controls */}
          <div className="flex justify-start flex-wrap md:flex-nowrap w-[100%]">

            {/* Date control */}
            <div className="min-w-full sm:min-w-[250px]">
              <DateRangeControlCustom2 defaultStart={new Date(new Date().toDateString())} defaultEnd={new Date()} onChange={onFilter}/>
            </div>


            <Space classes="w-[10px] h-[10px]"/>

            {/* Options control */}
            <div className="w-full sm:w-auto flex justify-center items-center">
              <ZoomMenu
                records={Object.keys(data).length > 0 ? JSON.parse((data as any)[Object.keys(data)[0]]).timestamp.length : 0 } // Cantidad de registros
                zooms={zoomHistory.length} // Cantidad de zooms realizados
                onChange={(type:TYPE_EVENTS_ZOOM, checked: boolean)=> {
                  if (type == TYPE_EVENTS_ZOOM.IN) zoomIn()
                  else if (type == TYPE_EVENTS_ZOOM.OUT) zoomOut()
                  else if (type == TYPE_EVENTS_ZOOM.RESET) resetZoom()  
                }} // Evento 
              />
              <Space classes="w-[10px]" />
              <EventMenu
                legend={showLegends} // Flag para el checkbox show labels
                tooltip={showTooltip} // Flas para el checkbox show tooltip
                onChange={(type:TYPE_EVENTS_EVENT, checked: boolean)=> {
                    if (type == TYPE_EVENTS_EVENT.LEGENDS) setShowLegends(checked);
                    else if (type == TYPE_EVENTS_EVENT.TOOLTIP) setShowTootip(checked);
                  }}// Evento
                />
            </div>

          </div>

          <Space classes="w-[100%] h-[20px]"/>


          {/* Filters */}
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
            { isGroupData? 
                Object.keys(showGroupData).map((key: string, index: number) => {
                  return <div key={index}>
                    <strong>
                      {key}
                    </strong>
                    <div className="flex justify-center items-center">
                      <DataMenu metadata={Object.keys(showGroupData[key]).map((label: string)=> {
                        return {
                          key: showGroupData[key][label].keys.join("###"),
                          label: label
                        };
                      })} selections={(()=> {
                        let selected: any = {};
                        Object.keys(showGroupData[key]).map((label: string)=> {
                          selected[showGroupData[key][label].keys.join("###")] = showGroupData[key][label].show;
                        })
                        console.log(selected)
                        return selected;
                      })()} onChange={(info, checked)=> {
                          toogleGroupData(key, info.label, info.key.split("###"), checked);
                      }}/>
                    </div>     
                  </div>;
                })
              :<div>
                <strong>
                  Display
                </strong>
                <div className="flex justify-center items-center">
                    <DataMenu
                    metadata={dataMetadata.map((data: DataMetadata)=> {
                      return {
                        key: data.key,
                        label: data.label as string
                      };
                    })} // Lista para generar checkbox
                    selections={showData} // Checkbox seleccionados
                    onChange={(info, checked)=> {
                      toogleData(info.key, checked);
                    }} // Evento
                    />
                </div>     
              </div>
            }
          </div>
          <Space classes="w-[100%] h-[20px]"/>
        </div>

        {/* Graphs */}
        <div ref={containerRef}
          style={{"height": `calc(100% - ${heightControl}px)`}} // Estilos dinamicos de la altura
          onClick={(e)=> {handlerClick(e)}} // Agregar evento para cerrar menu
          onContextMenu={(e)=> {handlerRight(e)}} // Agregar evento para abrir menu
          className="w-full flex justify-start flex-col absolute left-0 bottom-0">
            
            { showMenu ?
              <div className="absolute bg-white p-[5px] shadow shadow-gray-50 border-[1px]" style={{"left": `${leftMenu}px`, "top": `${topMenu}px`}}>
                <ul>
                  <li className="p-[5px] cursor-pointer" onClick={()=> {setShowTootip(!showTooltip)}}>View Cursor</li>
                  <li className="p-[5px] cursor-pointer" onClick={()=> {setShowLegends(!showLegends)}}>View Legend</li>
                  <li className="p-[5px] cursor-pointer" onClick={showOnlyMinMax}>View max/min values</li>
                </ul>
              </div> : "" }

            { showLegends ?
              <div className="w-full flex justify-center flex-wrap" >
                    {dataMetadata.map((info: any)=> {
                        return (<div className="flex justify-center items-center mx-[10px]">
                          <div className="w-[10px] h-[10px] mx-[5px]" style={{"backgroundColor": colors[info.key]}}></div>
                          <strong>{info.label.toUpperCase()}</strong>
                        </div>);
                    })}
              </div> : "" }
          
            {graphMetadata.map((info: GraphMetadata)=>{
              return (<Fragment>
                { showCharts[info.key] && data.hasOwnProperty(info.key) ?
                  <div
                    style={{"height": `${(100/ graphicsVisible)}%`}} // Altura dinamica de cada grafico
                    className={"w-full"}>
                      <LineGraphSimple
                        labels={JSON.parse((data as any)[info.key]).x_label} // Lista de labels para el eje X (No son lo originales)
                        showTooltip={showTooltip} // Flag show/hide de tooltip
                        showDatasetMap={showData} // Flag show/hide de lines
                        data={{"x": JSON.parse((data as any)[info.key]).x, "y": JSON.parse((data as any)[info.key]).y}} // Enviar data del eje X y Y (Original)
                        colors={colors} // Enviar diccionario de colores
                        onZoom={(x1: any, x2: any) => { onZoom(x1, x2, JSON.parse((data as any)[info.key])); }} // Evento de Zoom
                        title={info.label} // Titulo del grafico
                      />
                  </div> : ""}
              </Fragment>);
            })}

        </div>


  </div>);
}

export default PowerLogGraph;