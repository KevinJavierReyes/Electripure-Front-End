import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { CompanyEntity } from "../interfaces/entities";
import { sendGetCompaniesTable, sendUpdateCompany, sendGetCompanyDetail, sendCreateMDP, sendCreateSite, sendGetCompaniesByUser, sendArchiveCompany, sendActivateDeactivateCompany} from "./../actions/electripure";
import { ElectripureState } from "../interfaces/reducers"
import SiteDetails from "./Details/SiteDetails"
import { ModalMiddle } from "../components/Modal";
import CompanyUpdateForm, { ICompanyUpdateForm } from "../components/Form/CompanyUpdateForm"
import SiteCreateForm from "../components/Form/SiteCreateForm"
import { CompanyInformationUpdateDataForm } from "../interfaces/form"
import { CiaPermission } from "../routers/Permissions"
import { settingPermissions } from "../libs/permissions"
import  DataTableUploadFiles from "../components/DataTables/DataTableUploadFiles"

interface ICompany {
    address: string;
    address2: string;
    cia_image: string;
    city: string;
    id_image: string;
    name: string;
    sites: ISite[];
    state: string;
    zip: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
}
interface ISite {
    address: string;
    address2: string;
    city: string;
    id: number;
    id_esquematico: string;
    id_image: string;
    mdps: IMdp[];
    name: string;
    payment: string;
    schedule_image: string;
    site_image: string;
    state: string;
    zip: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
}

interface IMdp {
    MDP: number;
    MDPname: string;
    applianceID: number;
    id: number;
    meterID: number;
    switchgear: number;
    transformer: number;
    location: {
        x: number;
        y: number;
    }
}

const CompanyDetails = () =>{
    // SECTION Instance hooks
    const dispatch = useDispatch()
    // Get cOmpnay id from url
    let {ciaId} = useParams()
    let companyId = parseInt(ciaId!);
    // SECTION Instance states
    const [ showModalUpdateCompany, setShowModalUpdateCompany ] = useState(false);
    const [ toggleModalCreateSite, setToggleModalCreateSite ] = useState(false);
    // !SECTION
    // !SECTION
    
    // Get company from redux
    // const companies = JSON.parse(useSelector((state: ElectripureState) => state.companies));
    // const company = companies.find((company: CompanyEntity) => company.company_id === parseInt(ciaId?? ""));
    const company: ICompany = JSON.parse(useSelector((state: ElectripureState) => state.companyDetails));
    // Function to validate if user can edit company
    // const editCompany = () => {
    //     if(settingPermissions("edit_company")[0] === 2){
    //         const company = JSON.parse(useSelector((state: ElectripureState) => state.companies))[0];
    //         return company?.company_id === parseInt(ciaId?? "") ? true: false;
    //     } else if(settingPermissions("edit_company")[0] === 1){
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    // SECTION Define action functions
    const submitUpdateCompany = (data: ICompanyUpdateForm) =>{
        // console.log(data);
        dispatch(sendUpdateCompany({
            "company": data.name,
            "address": data.address,
            "address2": data.address2,
            "city": data.city,
            "state": data.state,
            "zip": data.zip,
            "company_id": data.id,
            "id_image": data.id_image,
            "image": ""//data.url_image
        }));
        setShowModalUpdateCompany(false)
        // dispatch(sendGetCompanyDetail({"cia_id": ciaId}))
    }   
    const submitCreateSite = (data:any) => {
        data.idcompany = parseInt(companyId?? "");
        dispatch(sendCreateSite(data));
        setToggleModalCreateSite(false);
        dispatch(sendGetCompanyDetail({"cia_id": companyId}));
    }
    // SECTION Define action functions
    function archiveCompany() {
        dispatch(sendArchiveCompany({"id": companyId}))
    }
    async function deactivateCompany() {
        dispatch(sendActivateDeactivateCompany({"id": companyId, "action": "deactivate"}))
    }
    async function activateCompany() {
        dispatch(sendActivateDeactivateCompany({"id": companyId, "action": "activate"}))
    }
    // !SECTION
    // SECTION
    useEffect(() =>{
        // Get company detail
        dispatch(sendGetCompanyDetail({"cia_id": companyId}))
        // dispatch(sendGetCompaniesByUser({"userId": settingPermissions("edit_company")[1]}))
    }, [])

    return (
        <Fragment>
        <div className="bg-white border w-full h-full p-[40px] overflow-auto">
            {/* SECTION Company info */}
            <div className="flex justify-between items-start w-[100%]">
                <div className="w-[100%] flex">
                    <div className="rounded border flex w-[200px] h-[200px] p-[5px]">
                        <img className="rounded w-[100%]" src={company.cia_image} alt="" />
                    </div>
                    <div className="py-[10px] px-[20px]" style={{"width": "calc(80% - 200px)"}}>
                        <div className="flex items-end justify-start">
                            <div className="text-2xl font-medium">
                                <h1>{company.name}</h1>
                            </div>
                            <div className="w-[200px] pl-[10px]">
                                { false ?  "" : 
                                    <span  className="cursor-pointer h-[40px] text-[#00AEE8]" onClick={()=> setShowModalUpdateCompany(true)}>
                                        Edit Company
                                    </span>
                                }
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-start items-start w-[400px] mt-[10px]">
                                <div className="">
                                    <svg width="20" height="20" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.59375 14.4219C3.17188 12.6445 0 8.40625 0 6C0 3.10156 2.32422 0.75 5.25 0.75C8.14844 0.75 10.5 3.10156 10.5 6C10.5 8.40625 7.30078 12.6445 5.87891 14.4219C5.55078 14.832 4.92188 14.832 4.59375 14.4219ZM5.25 7.75C6.20703 7.75 7 6.98438 7 6C7 5.04297 6.20703 4.25 5.25 4.25C4.26562 4.25 3.5 5.04297 3.5 6C3.5 6.98438 4.26562 7.75 5.25 7.75Z" fill="#737373"/>
                                    </svg>
                                </div>
                                <div className="ml-[5px]">
                                    <p>{company.address}</p>
                                    <p>{company.address2}</p>
                                    <p>City: {company.city}</p>
                                    <p>State: {company.state}</p>
                                    <p>Zip code:{company.zip}</p>
                                </div>
                            </div>
                            <div className="flex justify-start items-start w-[400px] mt-[10px]">
                                <div className="">
                                    <svg width="20" height="20" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 0.625H1.75C0.765625 0.625 0 1.41797 0 2.375V11.125C0 12.1094 0.765625 12.875 1.75 12.875H14C14.957 12.875 15.75 12.1094 15.75 11.125V2.375C15.75 1.41797 14.957 0.625 14 0.625ZM4.8125 3.25C5.76953 3.25 6.5625 4.04297 6.5625 5C6.5625 5.98438 5.76953 6.75 4.8125 6.75C3.82812 6.75 3.0625 5.98438 3.0625 5C3.0625 4.04297 3.82812 3.25 4.8125 3.25ZM7.4375 10.25H2.1875C1.94141 10.25 1.75 10.0586 1.75 9.8125C1.75 8.60938 2.70703 7.625 3.9375 7.625H5.6875C6.89062 7.625 7.875 8.60938 7.875 9.8125C7.875 10.0586 7.65625 10.25 7.4375 10.25ZM13.5625 8.5H10.0625C9.81641 8.5 9.625 8.30859 9.625 8.0625C9.625 7.84375 9.81641 7.625 10.0625 7.625H13.5625C13.7812 7.625 14 7.84375 14 8.0625C14 8.30859 13.7812 8.5 13.5625 8.5ZM13.5625 6.75H10.0625C9.81641 6.75 9.625 6.55859 9.625 6.3125C9.625 6.09375 9.81641 5.875 10.0625 5.875H13.5625C13.7812 5.875 14 6.09375 14 6.3125C14 6.55859 13.7812 6.75 13.5625 6.75ZM13.5625 5H10.0625C9.81641 5 9.625 4.80859 9.625 4.5625C9.625 4.34375 9.81641 4.125 10.0625 4.125H13.5625C13.7812 4.125 14 4.34375 14 4.5625C14 4.80859 13.7812 5 13.5625 5Z" fill="#737373"/>
                                    </svg>
                                </div>
                                <div className="ml-[5px]">
                                    <p>{company.contact_name}</p>
                                    <p>{company.contact_phone}</p>
                                    <p>{company.contact_email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex flex-col justify-center items-center">
                    <div className="cursor-pointer flex items-center relative w-[100px]" onClick={deactivateCompany}>
                        <svg width="101" height="32" viewBox="0 0 101 32">
                            <rect width="101" height="32" rx="16" fill="#55BA47"/>
                            <circle cx="18" cy="16" r="11" fill="white"/>
                        </svg>
                        <p className="text-white absolute right-[15px]">Active</p>
                    </div>
                    <div className="cursor-pointer flex justify-center items-center mt-[10px]" onClick={archiveCompany}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        <span className="text-sm ml-[5px]">Archive</span>
                    </div>
                </div>
            </div>
            {/* !SECTION */}
            {/* SECTION Line */}
            <div className="flex justify-center items-center my-[20px]">
                <p className="text-xl">Sites</p>
                <hr className="ml-[10px] w-[100%]" /> 
                <CiaPermission role="edit_company">
                <button className="w-[200px] border h-[50px] ml-[10px]" onClick={()=> setToggleModalCreateSite(!toggleModalCreateSite)}>
                    + Add New Site
                </button>
                </CiaPermission>
            </div>
            {/* !SECTION */}
            {/* SECTION Sites */}
            <div>
                {company?.sites? company?.sites.map((site:ISite, index:number) =>  <SiteDetails key={index} site={site} />) : ""}
            </div>
            {/* !SECTION */}
            <DataTableUploadFiles companyId={parseInt(companyId!)}/>
            {/* 
                
                <ModalMiddle show={toggleModalCreateSite} onClose={()=>{setToggleModalCreateSite(false)}}>
                    {
                        <SiteCreateForm onSubmit={submitCreateSite} />
                    }
                </ModalMiddle>
            </h1>
            
             */}
        </div>
        <ModalMiddle show={showModalUpdateCompany} onClose={()=>{setShowModalUpdateCompany(false)}}>
            {
                <CompanyUpdateForm company={{
                    ...company,
                    "id": companyId!,
                    "url_image": company.cia_image,
                    "id_image": company.id_image
                }} onSubmit={submitUpdateCompany}/>
            }
        </ModalMiddle>
        </Fragment>
    )
}

export default CompanyDetails;
