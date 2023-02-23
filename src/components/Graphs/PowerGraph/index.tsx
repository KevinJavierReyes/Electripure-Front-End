import { useParams } from "react-router";
import { DataMetadata, GraphMetadata } from "../../../interfaces/graph";
import PowerLogGraph from "../PowerLogGraph";



const graphMetadata: GraphMetadata[] = [
  {
    "key": "a",
    "label": "A",
    "url": "https://apidev.electripuremeter.com/get_chart3_A_v2"
  },
  {
    "key": "b",
    "label": "B",
    "url": "https://apidev.electripuremeter.com/get_chart3_B_v2"
  },
  {
    "key": "c",
    "label": "C",
    "url": "https://apidev.electripuremeter.com/get_chart3_C_v2"
  },
  {
    "key": "t",
    "label": "T",
    "url": "https://apidev.electripuremeter.com/get_chart3_T_v2"
  }
];


const dataMetadata: DataMetadata[] = [
  {
    "key": "dpf_max",
    "color": "#fc0303",
    "label": ["DPF", "Maximun"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "dpf_average",
    "color": "#000000",
    "label": ["DPF", "Average"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "dpf_min",
    "color": "#00ff3c",
    "label": ["DPF", "Minimum"],
    "group": ["P. Uni", "Display"]
  },
  {
    "key": "pf_max",
    "color": "#fc0303",
    "label": ["PF", "Maximun"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "pf_average",
    "color": "#000000",
    "label": ["PF", "Average"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "pf_min",
    "color": "#00ff3c",
    "label": ["PF", "Minimum"],
    "group": ["P. Uni", "Display"]
  },
  {
    "key": "var_max",
    "color": "#fc0303",
    "label": ["VAR", "Maximun"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "var_average",
    "color": "#000000",
    "label": ["VAR", "Average"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "var_min",
    "color": "#00ff3c",
    "label": ["VAR", "Minimum"],
    "group": ["P. Uni", "Display"]
  },
  {
    "key": "va_max",
    "color": "#fc0303",
    "label": ["VA", "Maximun"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "va_average",
    "color": "#000000",
    "label": ["VA", "Average"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "va_min",
    "color": "#00ff3c",
    "label": ["VA", "Minimum"],
    "group": ["P. Uni", "Display"]
  },
  {
    "key": "w_max",
    "color": "#fc0303",
    "label": ["W", "Maximun"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "w_average",
    "color": "#000000",
    "label": ["W", "Average"],
    "group": ["P. Uni", "Display"]
  }, {
    "key": "w_min",
    "color": "#00ff3c",
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
  return (<PowerLogGraph dataMetadata={dataMetadata} resultToData={resultToData} defaultMeterId={deviceId} graphMetadata={graphMetadata} />)
}

export default PowerGraph;