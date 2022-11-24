import React from "react";
import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import Tab from "../components/FormInput/Tab";

function HarmonicPage () {
    
    const navigate = useNavigate();
    const [tapIndex, setTapIndex] = useState(1);

    return (
        <React.Fragment>
            <div className={"justify-center items-center flex mb-[20px] sm:justify-start flex-col-reverse sm:flex-row"}>
                <span className="ml-[20px]"><h3 className="f-bold text-lg">Harmonics</h3></span>
            </div>
            <div className="w-full rounded border-color-secondary border bg-white p-[30px]">
                <div className="flex">
                    <div className="flex flex-col items-start justify-start w-[170px] border-color-secondary border-r border-t">
                        <Tab active={tapIndex == 1} onClick={()=> { if (tapIndex != 1) { setTapIndex(1); navigate("amp/line1") } }}>
                            Amps Line 1
                        </Tab>
                        <Tab active={tapIndex == 2} onClick={()=> { if (tapIndex != 2) { setTapIndex(2); navigate("amp/line2") } }}>
                            Amps Line 2
                        </Tab>
                        <Tab active={tapIndex == 3} onClick={()=> { if (tapIndex != 3) { setTapIndex(3); navigate("amp/line3") } }}>
                            Amps Line 3
                        </Tab>
                        <Tab active={tapIndex == 4} onClick={()=> { if (tapIndex != 4) { setTapIndex(4); navigate("volt/line1") } }}>
                            Volts Line 1
                        </Tab>
                        <Tab active={tapIndex == 5} onClick={()=> { if (tapIndex != 5) { setTapIndex(5); navigate("volt/line2") } }}>
                            Volts Line 2
                        </Tab>
                        <Tab active={tapIndex == 6} onClick={()=> { if (tapIndex != 6) { setTapIndex(6); navigate("volt/line3") } }}>
                            Volts Line 3
                        </Tab>
                    </div>
                    <div className="w-full">
                       <Outlet/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default HarmonicPage;
