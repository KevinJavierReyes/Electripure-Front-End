import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import Tab from "../components/FormInput/Tab";
import AmpsGraph from "../components/Graphs/AmpsGraph";

function VoltageCurrentPage () {

    return (
        <React.Fragment>
            <div className={"justify-center items-center flex mb-[20px] sm:justify-start flex-col-reverse sm:flex-row"}>
                <span className="ml-[20px]"><h3 className="f-bold text-lg">Voltage & Current</h3></span>
            </div>
            <div className="w-full rounded border-color-secondary border bg-white p-[30px]">
                <Outlet/>
            </div>
        </React.Fragment>
    );
}

export default VoltageCurrentPage;
