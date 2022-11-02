import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Tab from "../components/FormInput/Tab";
import AmpsGraph from "../components/Graphs/AmpsGraph";

// Import interfaces
// Import components
import Navegation from "../components/Navigation";
// Import actions

function AmpsVoltsPage () {
    const [tapIndex, setTapIndex] = useState(1);
    const dispatch = useDispatch();


    return (
        <React.Fragment>
            <Navegation>
                <div className="px-[30px] py-[10px] w-full">
                    <div className={"justify-center items-center flex mb-[20px] sm:justify-start flex-col-reverse sm:flex-row"}>
                        <span className="ml-[20px]"><h3 className="f-bold text-lg">Amps & Volts</h3></span>
                    </div>
                    <div className="w-full rounded border-color-secondary border bg-white p-[30px]">
                        <div className="flex">
                            <div className="flex flex-col items-start justify-start w-[170px] border-color-secondary border-r border-t">
                                <Tab active={tapIndex == 1} onClick={()=> { if (tapIndex != 1) { setTapIndex(1) } }}>
                                    Amps
                                </Tab>
                                <Tab active={tapIndex == 2} onClick={()=> { if (tapIndex != 2) { setTapIndex(2) } }}>
                                    Volts
                                </Tab>
                            </div>
                            <div className="w-full">
                                <AmpsGraph/>
                            </div>
                        </div>
                    </div>
                </div>
            </Navegation>
        </React.Fragment>
    );
}

export default AmpsVoltsPage;
