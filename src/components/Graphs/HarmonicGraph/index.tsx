import { useParams } from "react-router";
import { DataMetadata, GraphMetadata } from "../../../interfaces/graph";
import PowerLogGraph from "../PowerLogGraph";



const graphMetadata: GraphMetadata[] = [
  {
    "key": "a1",
    "label": "A1",
    "url": "https://apidev.electripuremeter.com/get_chart2_A1_v2"
  },
  {
    "key": "a2",
    "label": "A2",
    "url": "https://apidev.electripuremeter.com/get_chart2_A2_v2"
  },
  {
    "key": "a3",
    "label": "A3",
    "url": "https://apidev.electripuremeter.com/get_chart2_A3_v2"
  },
  {
    "key": "an",
    "label": "AN",
    "url": "https://apidev.electripuremeter.com/get_chart2_AN_v2"
  },
  {
    "key": "v1",
    "label": "V1",
    "url": "https://apidev.electripuremeter.com/get_chart2_V1_v2"
  },
  {
    "key": "v2",
    "label": "V2",
    "url": "https://apidev.electripuremeter.com/get_chart2_V2_v2"
  },
  {
    "key": "v3",
    "label": "V3",
    "url": "https://apidev.electripuremeter.com/get_chart2_V3_v2"
  },
  {
    "key": "vn",
    "label": "VN",
    "url": "https://apidev.electripuremeter.com/get_chart2_VN_v2"
  }
];


const dataMetadata: DataMetadata[] = [{
  "key": "h1",
  "color": "#00AEE8",
  "label": "H1"
}, {
  "key": "h3",
  "color": "#55BA47",
  "label": "H3"
}, {
  "key": "h5",
  "color": "#263B92",
  "label": "H5"
}, {
  "key": "h7",
  "color": "#ed4278",
  "label": "H7"
}, {
  "key": "h9",
  "color": "#000000",
  "label": "H9"
}];


function resultToData(result: any): string {
  return JSON.stringify({
    "x": result["TS_data"],
    "x_label": result["TS_data_label"],
    "timestamp": result["TS_unix"],
    "y": {
      "h1": result["H1"],
      "h3": result["H3"],
      "h5": result["H5"],
      "h7": result["H7"],
      "h9": result["H9"]
    }
  });
}


function HarmonicGraph ({ defaultMeterId }: { defaultMeterId?: number }) {
  // get deviceId [Not editable]
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  return (<PowerLogGraph dataMetadata={dataMetadata} resultToData={resultToData} deviceId={deviceId} graphMetadata={graphMetadata} />)
}

export default HarmonicGraph;