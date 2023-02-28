import { Chart as ChartJS, CategoryScale, ChartOptions, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { Fragment, useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';

import "./style.css";

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

function LineGraphMulti({ labels, data, colors, onZoom, title, showDatasetMap = {}, showTooltip=true}: { labels: any[], data: { y: { [key: string]: any }, x: any[] }, colors: { [key: string]: string, default: string }, onZoom: (x1: any, x2: any) => void, title: string, showDatasetMap?: any, showTooltip?: boolean }) {
  console.log("Render LineGraphMulti......");
  // const chartRef = useRef<ChartJS>(null);
  const yLabels: string[] = Object.keys(data.y);
  const yData: { [key: string]: any } = data.y;
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
    animation: {
      duration: 0
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
    "plugins": {
      zoom: {
        zoom: {
          drag: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'x',
          onZoomComplete: startFetch
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
          title: (tooltipItem: any) => {
            return `${data.x[tooltipItem[0].dataIndex]}`;
          },
          label: (tooltipItem: any) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.dataset.data[tooltipItem.dataIndex]}`;
          },
        }
      },
    }
  };
  // Data
  const source = {
    "labels": labels,
    "datasets": yLabels.filter((key: string) => yFilter[key] == undefined ? true : yFilter[key]).map((yLabel: string) => {
      return {
        "label": yLabel,
        // "borderWidth": 0.5,
        // "fill": false,
        "data": yData[yLabel] ?? [],
        "borderColor": colors[yLabel] ?? colors["default"],
        "backgroundColor": colors[yLabel] ?? colors["default"],
        "hidden": showDatasetMap.hasOwnProperty(yLabel) ? !showDatasetMap[yLabel] : true
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

export default LineGraphMulti;