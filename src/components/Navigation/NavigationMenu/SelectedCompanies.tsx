import { Fragment, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { CompanyEntity } from "../../../interfaces/entities"
import { ElectripureState } from "../../../interfaces/reducers"
import img from "./item_img.svg"
import  Site from "./components/Site"

const SelectedCompanies = ({companySelected}: any) => {

    const company = JSON.parse(useSelector((state: ElectripureState) => state.companies)).filter(function(a: any){
        return a.company_name  === companySelected
    })

    useEffect(()=>{

    }, [])

    const companyArray:any = Array.from(company)

    return (
        <Fragment>
            <div className="w-[80%]">
            {
                companyArray.length !== 0 ? 
                companyArray[0]['list_sites'].map((site:any, site_index:any) => (
                    <Site key={site_index} site={site} />
            ))
                : ""
            }
            </div>

        </Fragment>
    )
}

export default SelectedCompanies;
