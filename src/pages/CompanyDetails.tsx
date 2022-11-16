import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { CompanyEntity } from "../interfaces/entities";
import { sendGetCompaniesTable } from "./../actions/electripure";
import { ElectripureState } from "../interfaces/reducers"
import SiteDetails from "./Details/SiteDetails"
import { ModalMiddle } from "../components/Modal";
import CompanyUpdateForm from "../components/Form/CompanyUpdateForm"
import { BasicCompanyInformationDataForm } from "../interfaces/form"

const CompanyDetails = () =>{
    const [ toggleModal, setToggleModal ] = useState(false);
    const [ newCompanyRaw,  setNewCompany ] = useState(`{"id_user": 42}`)
    const {ciaId} = useParams()
    const newCompany = JSON.parse(newCompanyRaw)
    const companies = JSON.parse(useSelector((state: ElectripureState) => state.companies));
    const cia:any = companies.filter((element:any) => element.company_id == ciaId)[0];
    console.log("cia", cia)
    
    const submitCompanyUpdateInfo = (data: BasicCompanyInformationDataForm) =>{
        console.log(data)
        setNewCompany(JSON.stringify({
            ...newCompany,
            "basicInformation": {
                "companyName" : data.company,
                "address" : data.address,
                "address2" : data.address2,
                "city" : data.city,
                "state": data.state,
                "zip": data.zip,
                "imgId" : data.logo
            }
        }));
    }
        
    useEffect(() =>{
    
    })
    return (
        <Fragment>
        <div className="flex flex-col bg-white border w-full h-screen p-[40px] overflow-scroll">
            <div className="flex gap-[50px] mb-[40px]">
                <div className="border flex w-[200px] h-[220px]">
                    <img className="rounded w-[80%] m-auto border" src={cia?.link} alt="" />
                </div>
                <div className="flex w-[80%] justify-between">
                    <div className="flex mt-[20px]">
                        <div className="text-2xl font-medium">
                            <h1>{cia?.company_name}</h1>
                        </div>
                        <span  className="cursor-pointer ml-[20px] h-[40px]"
                            onClick={()=> setToggleModal(!toggleModal)}>Edit Company</span>
                    </div>
                    <ModalMiddle show={toggleModal} onClose={()=>{setToggleModal(false)}}>
                        {
                            <CompanyUpdateForm onSubmit={submitCompanyUpdateInfo}/>
                        }
                    </ModalMiddle>
                    <div className="cursor-pointer">
                        <svg width="101" height="32" viewBox="0 0 101 32">
                            <rect width="101" height="32" rx="16" fill="#55BA47"/>
                            <circle cx="18" cy="16" r="11" fill="white"/>
                        </svg>
                    </div>
                </div>
            </div>
            <h1 className="flex items-center">Sites <hr className="ml-[10px] w-[100%]" /> </h1>
            {cia?.list_sites? <SiteDetails sites={cia.list_sites}/> :""}
        </div>
        </Fragment>
    )
}


export default CompanyDetails;
