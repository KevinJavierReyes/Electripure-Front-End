import { Fragment, useState } from "react";
import { INPUT_CONTROL_STATE, TYPE_SPACE } from "../../../config/enum";
import { ButtonLink, ButtonSecondary } from "../../FormInput/Button";
import InputCheckbox from "../../FormInput/InputCheckbox";
import TabLink from "../../FormInput/TabLink";
import Space from "../../Space";
import DateRangeControl from "../DateRangeControl";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  


function AmpsGraph () {

    const [tapIndex, setTapIndex] = useState(1);
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labels.map(() => 12),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: labels.map(() => 10),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };
      

    return (<Fragment>
        <DateRangeControl/>
        <div className="w-full p-[30px]">
            <Line className="max-w-full" options={options} data={data} />;
        </div>
        <div className="flex justify-center flex-wrap p-[30px]">
            <div className="w-auto">
                <InputCheckbox
                    state={INPUT_CONTROL_STATE.DEFAULT}
                    message={""}
                    classes="color-primary f-semibold"
                    name={"linea"}
                    label="Amps Line A"
                    onChange={(checked: boolean) => {}} />
            </div>
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <div className="w-auto">
                <InputCheckbox
                    state={INPUT_CONTROL_STATE.DEFAULT}
                    message={""}
                    classes="color-success f-semibold"
                    name={"lineb"}
                    label="Amps Line B"
                    onChange={(checked: boolean) => {}} />
            </div>
            <Space type={TYPE_SPACE.INPUT_DISTANCE_VERTICAL}/>
            <div className="w-auto">
                <InputCheckbox
                    state={INPUT_CONTROL_STATE.DEFAULT}
                    message={""}
                    classes="color-primary-dark f-semibold"
                    name={"linec"}
                    label="Amps Line C"
                    onChange={(checked: boolean) => {}} />
            </div>
        </div>
    </Fragment>)
}

export default AmpsGraph;
