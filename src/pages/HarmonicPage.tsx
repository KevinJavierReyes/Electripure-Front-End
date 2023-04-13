import React from "react";
import { Outlet } from "react-router";

function HarmonicPage () {

    return (
        <React.Fragment>
            <div className={"h-[30px] flex justify-start items-start"}>
                <span><h3 className="f-bold text-lg">Harmonics</h3></span>
            </div>
            <div style={{"height": "calc(100% - 30px)"}} className="w-full rounded border-color-secondary border bg-white p-[30px]">
                <Outlet/>
            </div>
        </React.Fragment>
    );
    
}

export default HarmonicPage;
