import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { CompanyEntity } from "../interfaces/entities";
import { sendGetCompaniesTable, sendUpdateCompany, sendGetCompanyDetail, sendCreateMDP, sendCreateSite} from "./../actions/electripure";
import { ElectripureState } from "../interfaces/reducers"
import SiteDetails from "./Details/SiteDetails"
import { ModalMiddle } from "../components/Modal";
import CompanyUpdateForm from "../components/Form/CompanyUpdateForm"
import SiteCreateForm from "../components/Form/SiteCreateForm"
import { CompanyInformationUpdateDataForm } from "../interfaces/form"
import { CiaPermission } from "../routers/Permissions"

const CompanyDetails = () =>{
    const [ toggleModal, setToggleModal ] = useState(false);
    const [ toggleModalCreateSite, setToggleModalCreateSite ] = useState(false);
    const {ciaId} = useParams()
    const dispatch = useDispatch()
    const company = JSON.parse(useSelector((state: ElectripureState) => state.companyDetails));

    const submitCompanyUpdateInfo = (data: CompanyInformationUpdateDataForm) =>{
        dispatch(sendUpdateCompany(data))
        setToggleModal(false)
        dispatch(sendGetCompanyDetail({"cia_id": ciaId}))
    }
        
    const submitCreateSite = (data:any) => {
        data.idcompany = parseInt(ciaId?? "");
        dispatch(sendCreateSite(data));
        setToggleModalCreateSite(false);
        dispatch(sendGetCompanyDetail({"cia_id": ciaId}));
    }

    useEffect(() =>{
        dispatch(sendGetCompanyDetail({"cia_id": ciaId}))
    }, [company])

    return (
        <Fragment>
        <div className="flex flex-col bg-white border w-full h-screen p-[40px] overflow-scroll">
            <div className="flex gap-[50px] mb-[40px]">
                <div className="border flex w-[200px] h-[220px]">
                    <img className="rounded w-[80%] m-auto border" src={company?.cia_image} alt="" />
                </div>
                <div className="flex w-[80%] justify-between">
                    <div className="flex flex-col mt-[20px]">
                        <div className="text-2xl font-medium mb-[20px]">
                            <h1>{company?.name}</h1>
                        </div>
                        <div>
                            <p className="flex mr-4 items-center">
                            <svg className="mr-[10px]" width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.59375 14.4219C3.17188 12.6445 0 8.40625 0 6C0 3.10156 2.32422 0.75 5.25 0.75C8.14844 0.75 10.5 3.10156 10.5 6C10.5 8.40625 7.30078 12.6445 5.87891 14.4219C5.55078 14.832 4.92188 14.832 4.59375 14.4219ZM5.25 7.75C6.20703 7.75 7 6.98438 7 6C7 5.04297 6.20703 4.25 5.25 4.25C4.26562 4.25 3.5 5.04297 3.5 6C3.5 6.98438 4.26562 7.75 5.25 7.75Z" fill="#737373"/>
                            </svg>
                                {company?.address}
                            </p>
                            <p className="flex mr-4 items-center"> 
                            <svg className="mr-[10px]" width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 0.625H1.75C0.765625 0.625 0 1.41797 0 2.375V11.125C0 12.1094 0.765625 12.875 1.75 12.875H14C14.957 12.875 15.75 12.1094 15.75 11.125V2.375C15.75 1.41797 14.957 0.625 14 0.625ZM4.8125 3.25C5.76953 3.25 6.5625 4.04297 6.5625 5C6.5625 5.98438 5.76953 6.75 4.8125 6.75C3.82812 6.75 3.0625 5.98438 3.0625 5C3.0625 4.04297 3.82812 3.25 4.8125 3.25ZM7.4375 10.25H2.1875C1.94141 10.25 1.75 10.0586 1.75 9.8125C1.75 8.60938 2.70703 7.625 3.9375 7.625H5.6875C6.89062 7.625 7.875 8.60938 7.875 9.8125C7.875 10.0586 7.65625 10.25 7.4375 10.25ZM13.5625 8.5H10.0625C9.81641 8.5 9.625 8.30859 9.625 8.0625C9.625 7.84375 9.81641 7.625 10.0625 7.625H13.5625C13.7812 7.625 14 7.84375 14 8.0625C14 8.30859 13.7812 8.5 13.5625 8.5ZM13.5625 6.75H10.0625C9.81641 6.75 9.625 6.55859 9.625 6.3125C9.625 6.09375 9.81641 5.875 10.0625 5.875H13.5625C13.7812 5.875 14 6.09375 14 6.3125C14 6.55859 13.7812 6.75 13.5625 6.75ZM13.5625 5H10.0625C9.81641 5 9.625 4.80859 9.625 4.5625C9.625 4.34375 9.81641 4.125 10.0625 4.125H13.5625C13.7812 4.125 14 4.34375 14 4.5625C14 4.80859 13.7812 5 13.5625 5Z" fill="#737373"/>
                            </svg>
                                {company?.address2}</p>
                            <p>City: {company?.city}</p>
                            <p>State: {company?.state}</p>
                            <p>Zip code:{company?.zip}</p>
                        </div>
                    </div>
                    <CiaPermission role="edit_company">
                        <span  className="cursor-pointer h-[40px] text-[#00AEE8]" onClick={()=> setToggleModal(!toggleModal)}>
                            Edit Company
                        </span>
                    </CiaPermission>
                    <ModalMiddle show={toggleModal} onClose={()=>{setToggleModal(false)}}>
                        {
                            <CompanyUpdateForm onSubmit={submitCompanyUpdateInfo}/>
                        }
                    </ModalMiddle>
                    <div className="cursor-pointer flex items-center">
                        <svg width="101" height="32" viewBox="0 0 101 32">
                            <rect width="101" height="32" rx="16" fill="#55BA47"/>
                            <circle cx="18" cy="16" r="11" fill="white"/>
                        </svg>
                        <p className="text-white relative right-[44%]">Active</p>
                    </div>
                </div>
            </div>
            <h1 className="flex items-center">Sites 
                <hr className="ml-[10px] w-[100%]" /> 
                <CiaPermission role="edit_company">
                <button className="w-[200px] border h-[50px] ml-[10px]" onClick={()=> setToggleModalCreateSite(!toggleModalCreateSite)}>
                    + Add New Site
                </button>
                </CiaPermission>
                <ModalMiddle show={toggleModalCreateSite} onClose={()=>{setToggleModalCreateSite(false)}}>
                    {
                        <SiteCreateForm onSubmit={submitCreateSite} />
                    }
                </ModalMiddle>
            </h1>
            {company?.sites? company?.sites.map((site:any, index:number) =>  <SiteDetails key={index} site={site}/>) 
            :""}
        </div>
        </Fragment>
    )
}

export default CompanyDetails;
