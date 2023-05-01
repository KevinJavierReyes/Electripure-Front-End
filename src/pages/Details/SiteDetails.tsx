import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router";
import MDPsDetails from "./MDPsDetails"
import { ModalMiddle } from "./../../components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { SiteUpdateDataForm } from "../../interfaces/form";
import  SiteUpdateForm  from "../../components/Form/SiteUpdateForm"
import { sendUpdateSite, sendGetCompanyDetail, sendCreateMDP, sendGetCompaniesByUser } from "../../actions/electripure"
import { ElectripureState } from "../../interfaces/reducers"
import { CiaPermission } from "../../routers/Permissions"
import MDPCreateForm from "../../components/Form/MDPCreateForm" 
import { settingPermissions } from "../../libs/permissions"
import mdpIcon from '../../assets/img/mdp_icon.png';

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

const SiteDetails = ({site}:{site: ISite}) => {
    const [ toggleModal, setToggleModal ] = useState(false)
    const [ toggleModalCreateMDP, setToggleModalCreateMDP ] = useState(false)
    const [ updateValue, setUpdateValue ] = useState({})
    const dispatch = useDispatch()
    const {ciaId} = useParams()

    const editSite = () => {
        if(settingPermissions("edit_company")[0] === 2){
            const company = JSON.parse(useSelector((state: ElectripureState) => state.companies))[0];
            return (company?.company_id === parseInt(ciaId?? "") ? true: false)
        } else if(settingPermissions("edit_company")[0] === 1){
            return true
        } else {
            return false
        }
    }

    const submitSiteUpdateInfo = (data: SiteUpdateDataForm) =>{
        dispatch(sendUpdateSite(data))
        setToggleModal(false)
        dispatch(sendGetCompanyDetail({"cia_id": ciaId}))
    }

    const submitCreateMDP = (data: any) =>{
        data.idsite = site.id
        dispatch(sendCreateMDP(data))
        setToggleModalCreateMDP(false)
        dispatch(sendGetCompanyDetail({"cia_id": ciaId}))
    }

    useEffect(() =>{
        dispatch(sendGetCompaniesByUser({"userId": settingPermissions("edit_company")[1]}))
        dispatch(sendGetCompanyDetail({"cia_id": ciaId}))
    },[site])

    return (
        <Fragment>
            <div className="flex border flex-col">
                <div className="w-[100%] flex p-[30px]">
                    <div className="rounded border flex w-[100px] h-[100px] p-[5px]">
                        <img className="rounded w-[100%]" src={site.site_image} alt="" />
                    </div>
                    <div className="py-[10px] px-[20px]" style={{"width": "calc(80% - 100px)"}}>
                        <div className="flex items-end justify-start">
                            <div className="text-2xl font-medium">
                                <h1>{site.name}</h1>
                            </div>
                            <div className="w-[200px] pl-[10px]">
                                { false ?  "" : 
                                    <span  className="cursor-pointer h-[40px] text-[#00AEE8]" onClick={()=> setToggleModal(!toggleModal)}>
                                        Edit Site
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex justify-start items-start w-[100%] max-w-[400px] mt-[10px]">
                                <div className="">
                                    <svg width="20" height="20" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.59375 14.4219C3.17188 12.6445 0 8.40625 0 6C0 3.10156 2.32422 0.75 5.25 0.75C8.14844 0.75 10.5 3.10156 10.5 6C10.5 8.40625 7.30078 12.6445 5.87891 14.4219C5.55078 14.832 4.92188 14.832 4.59375 14.4219ZM5.25 7.75C6.20703 7.75 7 6.98438 7 6C7 5.04297 6.20703 4.25 5.25 4.25C4.26562 4.25 3.5 5.04297 3.5 6C3.5 6.98438 4.26562 7.75 5.25 7.75Z" fill="#737373"/>
                                    </svg>
                                </div>
                                <div className="ml-[5px]">
                                    <p>{site.address}</p>
                                    <p>{site.address2}</p>
                                    <p>City: {site.city}</p>
                                    <p>State: {site.state}</p>
                                    <p>Zip code:{site.zip}</p>
                                </div>
                            </div>
                            <div className="flex justify-start items-start w-[100%] max-w-[400px] mt-[10px]">
                                <div className="">
                                    <svg width="20" height="20" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 0.625H1.75C0.765625 0.625 0 1.41797 0 2.375V11.125C0 12.1094 0.765625 12.875 1.75 12.875H14C14.957 12.875 15.75 12.1094 15.75 11.125V2.375C15.75 1.41797 14.957 0.625 14 0.625ZM4.8125 3.25C5.76953 3.25 6.5625 4.04297 6.5625 5C6.5625 5.98438 5.76953 6.75 4.8125 6.75C3.82812 6.75 3.0625 5.98438 3.0625 5C3.0625 4.04297 3.82812 3.25 4.8125 3.25ZM7.4375 10.25H2.1875C1.94141 10.25 1.75 10.0586 1.75 9.8125C1.75 8.60938 2.70703 7.625 3.9375 7.625H5.6875C6.89062 7.625 7.875 8.60938 7.875 9.8125C7.875 10.0586 7.65625 10.25 7.4375 10.25ZM13.5625 8.5H10.0625C9.81641 8.5 9.625 8.30859 9.625 8.0625C9.625 7.84375 9.81641 7.625 10.0625 7.625H13.5625C13.7812 7.625 14 7.84375 14 8.0625C14 8.30859 13.7812 8.5 13.5625 8.5ZM13.5625 6.75H10.0625C9.81641 6.75 9.625 6.55859 9.625 6.3125C9.625 6.09375 9.81641 5.875 10.0625 5.875H13.5625C13.7812 5.875 14 6.09375 14 6.3125C14 6.55859 13.7812 6.75 13.5625 6.75ZM13.5625 5H10.0625C9.81641 5 9.625 4.80859 9.625 4.5625C9.625 4.34375 9.81641 4.125 10.0625 4.125H13.5625C13.7812 4.125 14 4.34375 14 4.5625C14 4.80859 13.7812 5 13.5625 5Z" fill="#737373"/>
                                    </svg>
                                </div>
                                <div className="ml-[5px]">
                                    <p>{site.contact_name}</p>
                                    <p>{site.contact_phone}</p>
                                    <p>{site.contact_email}</p>
                                </div>
                            </div>
                        </div>
                        <ModalMiddle show={toggleModal} onClose={()=>{setToggleModal(false)}}>
                            {
                                <SiteUpdateForm onSubmit={submitSiteUpdateInfo} siteId={site.id}/>
                            }
                        </ModalMiddle>
                    </div>
                </div>
                {/* SECTION More detail of site */}
                <div className="flex justify-between w-[100%]">
                    {/* SECTION Image schematic */}
                    <div className="flex w-[50%] my-[10px] mx-[30px] relative">
                        <img src={site.schedule_image} className="w-[100%]"/>
                        {site.mdps.map((mdp) => {
                            if (mdp.location && mdp.location.x && mdp.location.y)  {
                                return <img src={mdpIcon} width={40} height={40} style={{"left": `calc(${mdp.location.x}% - ${40/20}px)`, "top": `calc(${mdp.location.y}% - ${40/20}px)`}} className={`absolute`}/>
                            }
                            return ""
                        })}
                    </div>
                    {/* !SECTION */}
                    {/* SECTION MDPs */}
                    <div className="w-[50%] py-[10px] px-[30px]">
                        {/* SECTION Line */}
                        <div className="flex justify-center items-center mb-[20px]">
                            <p className="text-xl">MDPs</p>
                            <hr className="ml-[10px] w-[100%]" /> 
                            <CiaPermission role="edit_company">
                            <button className="w-[250px] border h-[50px] ml-[10px]" onClick={()=> setToggleModalCreateMDP(!toggleModalCreateMDP)}>
                                + Add New MDP
                            </button>
                            </CiaPermission>
                        </div>
                        {/* !SECTION */}
                        <ModalMiddle show={toggleModalCreateMDP} onClose={()=>{setToggleModalCreateMDP(false)}}>
                            {
                                <MDPCreateForm onSubmit={submitCreateMDP}/>
                            }
                        </ModalMiddle>
                        {site?.mdps? site.mdps.map((mdp:any, mdp_index:number) => <MDPsDetails key={mdp_index} mdps={mdp} siteId={site.id} editMDP={editSite()} />) : ""}
                    </div>
                    {/* !SECTION */}
                </div>
                {/* !SECTION */}
           </div>
        </Fragment>
     )
}

export default SiteDetails;
