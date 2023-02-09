import { useParams } from "react-router";
import { DataMetadata, GraphMetadata } from "../../../interfaces/graph";
import PowerLogGraph from "../PowerLogGraph";



const graphMetadata: GraphMetadata[] = [
  {
    "key": "aa",
    "label": "A(A)",
    "url": "https://apidev.electripuremeter.com/get_chart1_A(A)_v2"
  },
  {
    "key": "ba",
    "label": "B(A)",
    "url": "https://apidev.electripuremeter.com/get_chart1_B(A)_v2"
  },
  {
    "key": "ca",
    "label": "C(A)",
    "url": "https://apidev.electripuremeter.com/get_chart1_C(A)_v2"
  },
  {
    "key": "na",
    "label": "N(A)",
    "url": "https://apidev.electripuremeter.com/get_chart1_N(A)_v2"
  },
  {
    "key": "av",
    "label": "A(V)",
    "url": "https://apidev.electripuremeter.com/get_chart1_A(V)_v2"
  },
  {
    "key": "bv",
    "label": "B(V)",
    "url": "https://apidev.electripuremeter.com/get_chart1_B(V)_v2"
  },
  {
    "key": "cv",
    "label": "C(V)",
    "url": "https://apidev.electripuremeter.com/get_chart1_C(V)_v2"
  },
  // {
  //   "key": "gv",
  //   "label": "G(V)",
  //   "url": "https://apidev.electripuremeter.com/get_chart1_G(V)_v2"
  // }
];


const dataMetadata: DataMetadata[] = [{
  "key": "max",
  "color": "#fc0303",
  "label": "Maximun"
}, {
  "key": "average",
  "color": "#000000",
  "label": "Average"
}, {
  "key": "min",
  "color": "#00ff3c",
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
  return (<PowerLogGraph dataMetadata={dataMetadata} resultToData={resultToData} defaultMeterId={deviceId} graphMetadata={graphMetadata} />)
}

export default VoltageCurrentGraph;