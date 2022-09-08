import * as React from "react";
import { RootState } from "../app/store";
import { darkmode } from "../app/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { Chart, ChartSeries, ChartSeriesItem } from "@progress/kendo-react-charts";
import "hammerjs";

const images = import.meta.glob("../assets/*/*.(jpg|svg)");
const gallery: Array<URL> = [];

function HomePage() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.app);
  const [series] = React.useState([20, 1, 18, 3, 15, 5, 10, 6, 9, 6, 10, 5, 13, 3, 16, 1, 19, 1, 20, 2, 18, 5, 12, 7, 10, 8]);

  React.useEffect(() => {
    for (const path in images) {
      images[path]().then(() => {
        const p = new URL(path, import.meta.url);
        gallery.push(p);
        dispatch(darkmode(true));
      });
    }

    setTimeout(() => {
      dispatch(darkmode(false));
    }, 3000);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={darkMode ? "dark" : "ligth"}>
      <div className="flex flex-col h-screen bg-gray-200 dark:bg-gray-700">
        <header className="flex flex-row justify-between items-center p-2">
          <img className="bg-gray-200" src={gallery.find((val) => /\.*Logo\.*/i.test(decodeURI(val.pathname)))?.pathname} />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white"> The best Electrify Technology</h1>
          <p className="text-gray-600 dark:text-gray-300">Energy is life</p>
        </header>

        <div className="h-full my-10 px-5">
          <div className="max-w-md md:max-w-2xl mx-auto bg-neutral-800 dark:bg-neutral-50 rounded-xl shadow-lg shadow-indigo-800/60 dark:shadow-green-400/50 overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full object-cover md:h-full md:w-48"
                  src="https://elcomercio.pe/resizer/R5fl8-2JsbAPjxN-GEBA6n5g1Ps=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/7WKY2DC5U5GLRNJR4AAH2PXSNI.jpg"
                  alt="Man looking at item at a store"
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
                <a href="google.com.pe" className="block mt-1 text-lg leading-tight font-medium hover:underline text-white dark:text-black">
                  Finding customers for your new business
                </a>
                <p className="mt-2 text-gray-400 dark:text-gray-500">
                  Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.
                </p>
              </div>
            </div>
          </div>

          <br />

          <Chart className="max-w-md md:max-w-2xl mx-auto">
            <ChartSeries>
              <ChartSeriesItem
                type="area"
                data={series}
                markers={{
                  visible: true,
                }}
                line={{
                  style: "normal",
                }}
              />
            </ChartSeries>
          </Chart>
        </div>

        <footer className="flex flex-row justify-between p-2 text-gray-900 dark:text-white">
          <span>Electripure Design</span>
          <span>2022</span>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
