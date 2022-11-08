import React from "react";
import { ButtonSecondary } from "../components/FormInput/Button";
import DataTableCompanies from "../components/DataTables/DataTableCompanies";

function CompanyListPage () {

    return (
        <React.Fragment>
            <div className={"justify-center items-center flex mb-[20px] sm:justify-start flex-col-reverse sm:flex-row"}>
                <div className={"w-[200px]"}>
                    <ButtonSecondary onClick={()=> { }}>
                        <span className="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                            </svg>
                            <span className="f-medium">Add new customer</span>
                        </span>
                    </ButtonSecondary>
                </div>
                <span className="ml-[20px]"><h3 className="f-bold text-lg">Company Management</h3></span>
            </div>
            <div className="w-full rounded border-color-secondary border">
                <DataTableCompanies />
            </div>
        </React.Fragment>
    );
}

export default CompanyListPage;
