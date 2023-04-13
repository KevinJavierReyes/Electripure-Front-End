import { useParams } from "react-router";
import { DataMetadata, GraphMetadata } from "../../../interfaces/graph";
import PowerLogGraph from "../PowerLogGraph";



const graphMetadata: GraphMetadata[] = [
  // {
  //   "key": "a",
  //   "label": "A",
  //   "url": "https://apidev.electripuremeter.com/get_chart3_A_v2"
  // },
  // {
  //   "key": "b",
  //   "label": "B",
  //   "url": "https://apidev.electripuremeter.com/get_chart3_B_v2"
  // },
  // {
  //   "key": "c",
  //   "label": "C",
  //   "url": "https://apidev.electripuremeter.com/get_chart3_C_v2"
  // },
  {
    "key": "t",
    "label": "T",
    "url": "https://apidev.electripuremeter.com/get_chart3_T_v2"
  }
];

const dataMetadata: DataMetadata[] = [
  {
    "key": "pf_max",
    "color": "#13007F",
    "label": ["PF", "Maximun"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "pf_average",
    "color": "#387CFD",
    "label": ["PF", "Average"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "pf_min",
    "color": "#8FFEFE",
    "label": ["PF", "Minimum"],
    "group": ["P. Uni", "Display"]
  },
  {
    "key": "var_max",
    "color": "#C8140D",
    "label": ["VAR", "Maximun"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "var_average",
    "color": "#F6221B",
    "label": ["VAR", "Average"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "var_min",
    "color": "#F78282",
    "label": ["VAR", "Minimum"],
    "group": ["P. Uni", "Display"]
  },
  {
    "key": "va_max",
    "color": "#7C4106",
    "label": ["VA", "Maximun"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "va_average",
    "color": "#F78216",
    "label": ["VA", "Average"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "va_min",
    "color": "#FCFF23",
    "label": ["VA", "Minimum"],
    "group": ["P. Uni", "Display"]
  },
  {
    "key": "w_max",
    "color": "#239D0C",
    "label": ["W", "Maximun"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "w_average",
    "color": "#3FFD1E",
    "label": ["W", "Average"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "w_min",
    "color": "#8BFF83",
    "label": ["W", "Minimum"],
    "group": ["P. Uni", "Display"]
  }
];

function resultToData(result: any): string {
  return JSON.stringify({
    "x": result["TS_data"],
    "x_label": result["TS_data_label"],
    "timestamp": result["TS_unix"],
    "y": {
      "dpf_average": result["DPF_AVG"],
      "dpf_max": result["DPF_MAX"],
      "dpf_min": result["DPF_MIN"],
      
      "pf_average": result["PF_AVG"],
      "pf_max": result["PF_MAX"],
      "pf_min": result["PF_MIN"],

      "var_average": result["VAR_AVG"],
      "var_max": result["VAR_MAX"],
      "var_min": result["VAR_MIN"],

      "va_average": result["VA_AVG"],
      "va_max": result["VA_MAX"],
      "va_min": result["VA_MIN"],
      
      "w_average": result["W_AVG"],
      "w_max": result["W_MAX"],
      "w_min": result["W_MIN"]
    }
  });
}

function PowerGraph ({ defaultMeterId }: { defaultMeterId?: number }) {
  // get deviceId [Not editable]
  let { meterId } = useParams();
  let deviceId = defaultMeterId ?? parseInt(meterId!);
  // Generate Graph
  return (<PowerLogGraph dataMetadata={dataMetadata} resultToData={resultToData} deviceId={deviceId} graphMetadata={graphMetadata} />)
}

export default PowerGraph;