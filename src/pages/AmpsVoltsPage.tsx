import React from "react";
import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import Tab from "../components/FormInput/Tab";
import AmpsGraph from "../components/Graphs/AmpsGraph";

function AmpsVoltsPage () {
    
    const navigate = useNavigate();
    const [tapIndex, setTapIndex] = useState(1);

    return (
        <React.Fragment>
            <div className={"justify-center items-center flex mb-[20px] sm:justify-start flex-col-reverse sm:flex-row"}>
                <span className="ml-[20px]"><h3 className="f-bold text-lg">Amps & Volts</h3></span>
            </div>
            <div className="w-full rounded border-color-secondary border bg-white p-[30px]">
                <div className="flex">
                    <div className="flex flex-col items-start justify-start w-[170px] border-color-secondary border-r border-t">
                        <Tab active={tapIndex == 1} onClick={()=> { if (tapIndex != 1) { setTapIndex(1); navigate("apms") } }}>
                            Amps
                        </Tab>
                        <Tab active={tapIndex == 2} onClick={()=> { if (tapIndex != 2) { setTapIndex(2); navigate("volts") } }}>
                            Volts
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

export default AmpsVoltsPage;
