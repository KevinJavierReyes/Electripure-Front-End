import { Chart as ChartJS, CategoryScale, ChartOptions, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { Fragment, useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';

import "./style.css";
import { ColorGraph, DataGraph, yLabel } from "../../../interfaces/graph";

// Config chart js
ChartJS.register(
  zoomPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function generateScales(data: DataGraph) {
  let positions: string[] = ["left", "right"];
  let state: any = {};
  let ticks: any = {
    callback: function(value: any, index: number, ticks: any) {
      // console.log(value);
      return value;
    }
  };
  if (Array.isArray(data.y)) {
    data.y.forEach((data: DataGraph, index: number) => {
      state[`y${index + 1}`] ={
        type: "linear",
        display: true,
        position: positions[index],
        ticks: ticks
      };
    });
  } else if (data.y.hasOwnProperty("pf_average")) {
    state = {
      "y1": {
        type: "linear",
        display: true,
        position: positions[0],
        ticks: ticks
      },
      "y2": {
        type: "linear",
        display: true,
        position: positions[1],
        ticks: ticks
      }
    }
  } else {
    state = {
      "y1": {
        type: "linear",
        display: true,
        position: positions[0],
        ticks: ticks
      }
    }
  }
  return state;
}

function generateLabels(data: DataGraph) {

  let state: any[] = [];
  if (Array.isArray(data.y)) {
    data.y.forEach((subdata: DataGraph, index: number) => {
      state = [...state, ...Object.keys(subdata.y).map((key: string) => {
        return {
          "name": key,
          "group": `y${index + 1}`
        }
      })];
    });
  } else if (data.y.hasOwnProperty("pf_average")) {
      [["var_average",
      "var_max",
      "var_min",
      "va_average",
      "va_max",
      "va_min",
      "w_average",
      "w_max",
      "w_min"], ["pf_average",
      "pf_max",
      "pf_min"]].forEach((keys: string[], index: number) => {
      state = [...state, ...keys.map((key: string) => {
        return {
          "name": key,
          "group": `y${index + 1}`
        }
      })];
    });
  } else {
    state = Object.keys(data.y).map((key: string) => {
      return {
        "name": key,
        "group": "y1"
      }
    });
  }
  return state;
}

function generateDatasets(data: DataGraph) {
  let state: any = {};
  if (Array.isArray(data.y)) {
    data.y.forEach((subdata: DataGraph, index: number) => {
      state = {...state, ...subdata.y};
    });
  } else {
    state = data.y;
  }
  return state;
}

function LineGraphSimple({ labels, data, colors, onZoom, title, showDatasetMap = {}, showTooltip=true}: { labels: any[], data: DataGraph, colors: ColorGraph, onZoom: (x1: any, x2: any) => void, title: string, showDatasetMap?: any, showTooltip?: boolean }) {
  console.log("Render LineGraphSimple......");
  const yLabels: yLabel[] = generateLabels(data);
  const yData: { [key: string]: any } = generateDatasets(data);
  const xData: any[] = data.x;
  const [yFilterRaw, setYFilter]: any = useState(JSON.stringify({}));
  const yFilter: { [key: string]: boolean } = JSON.parse(yFilterRaw);

  function startFetch({ chart }: { chart: ChartJS }) {
    const { min, max } = chart.scales.x;
    if (!(min == 0 && max == xData.length - 1)) {
      onZoom(min, max);
      chart.resetZoom('none');
    }
  }

  // Options
  const options: ChartOptions = {
    "responsive": true,
    "animation": {
      "duration": 0
    },
    "interaction": {
      "intersect": false,
      "axis": "x"
    },
    "elements": {
      "point": {
        "radius": 0
      }
    },
    "scales": generateScales(data),
    "plugins": {
      "zoom": {
        "zoom": {
          "drag": {
            "enabled": true,
          },
          "pinch": {
            "enabled": true
          },
          "mode": 'x',
          "onZoomComplete": startFetch
        }
      },
      "legend": {
        "display": false,
        "position": "bottom" as const,
      },
      "title": {
        "display": true,
        "text": title,
        "position": "left"
      },
      "tooltip": {
        "enabled": showTooltip,
        "callbacks": {
          "title": (tooltipItem: any) => {
            return `${data.x[tooltipItem[0].dataIndex]}`;
          },
          "label": (tooltipItem: any) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.dataset.data[tooltipItem.dataIndex]}`;
          },
        }
      },
    }
  };
  // Data
  const source = {
    "labels": labels,
    "datasets": yLabels.filter((label:  yLabel) => yFilter[label.name] == undefined ? true : yFilter[label.name]).map((label:  yLabel) => {
      return {
        "label": label.name,
        "yAxisID": label.group,
        // "borderWidth": 0.5,
        // "fill": false,
        "data": yData[label.name] ?? [],
        "borderColor": colors[label.name] ?? colors["default"],
        "backgroundColor": colors[label.name] ?? colors["default"],
        "hidden": showDatasetMap.hasOwnProperty(label.name) ? !showDatasetMap[label.name] : true
        // "pointRadius": "0"
      };
    })
  };

  return (<Fragment>
    <div className="max-w-full max-h-full h-full px-[30px]">
      <Line className="w-full h-full max-w-full max-h-full" options={options} data={source} />
    </div>
  </Fragment>);
}

export default LineGraphSimple;