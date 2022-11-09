import React from "react";
import Navegation from "../components/Navigation";
import { Outlet } from "react-router-dom";

function DashboardPage () {

    return (
        <React.Fragment>
            <Navegation>
                <div className="px-[30px] py-[10px] w-full">
                    <Outlet />
                </div>
            </Navegation>
        </React.Fragment>
    );
}

export default DashboardPage;
