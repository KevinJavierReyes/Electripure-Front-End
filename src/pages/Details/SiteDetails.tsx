import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router";
import MDPsDetails from "./MDPsDetails"
import { ModalMiddle } from "./../../components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { SiteUpdateDataForm } from "../../interfaces/form";
import  SiteUpdateForm  from "../../components/Form/SiteUpdateForm"
import { sendUpdateSite, sendGetCompanyDetail } from "../../actions/electripure"
import { ElectripureState } from "../../interfaces/reducers"

const SiteDetails = ({site}:any) => {
    const [ toggleModal, setToggleModal ] = useState(false)
    const [ updateValue, setUpdateValue ] = useState({})
    const dispatch = useDispatch()
    const {ciaId} = useParams()

    const submitSiteUpdateInfo = (data: SiteUpdateDataForm) =>{
        dispatch(sendUpdateSite(data))
        setToggleModal(false)
        dispatch(sendGetCompanyDetail({"cia_id": ciaId}))
    }
    useEffect(() =>{
        dispatch(sendGetCompanyDetail({"cia_id": ciaId}))
    },[site])

    return (
        <Fragment>
            <div className="flex border p-[20px] mt-[40px]">
               <div className="flex w-[60%] gap-[20px]">
                   <img className="w-[100px] h-[100px] rounded" src={site.site_image} />
                   <div className="">
                       <div className="text-2xl">
                           <h2>{site.name}</h2>
                       </div>
                       <p className="flex items-center mt-[5px]">
                      <svg className="mr-[10px]" width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.59375 14.4219C3.17188 12.6445 0 8.40625 0 6C0 3.10156 2.32422 0.75 5.25 0.75C8.14844 0.75 10.5 3.10156 10.5 6C10.5 8.40625 7.30078 12.6445 5.87891 14.4219C5.55078 14.832 4.92188 14.832 4.59375 14.4219ZM5.25 7.75C6.20703 7.75 7 6.98438 7 6C7 5.04297 6.20703 4.25 5.25 4.25C4.26562 4.25 3.5 5.04297 3.5 6C3.5 6.98438 4.26562 7.75 5.25 7.75Z" fill="#737373"/>
                      </svg>
                       {site?.address}
                       </p>
                       <p className="flex items-center mt-[5px]">
                      <svg className="mr-[10px]" width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.59375 14.4219C3.17188 12.6445 0 8.40625 0 6C0 3.10156 2.32422 0.75 5.25 0.75C8.14844 0.75 10.5 3.10156 10.5 6C10.5 8.40625 7.30078 12.6445 5.87891 14.4219C5.55078 14.832 4.92188 14.832 4.59375 14.4219ZM5.25 7.75C6.20703 7.75 7 6.98438 7 6C7 5.04297 6.20703 4.25 5.25 4.25C4.26562 4.25 3.5 5.04297 3.5 6C3.5 6.98438 4.26562 7.75 5.25 7.75Z" fill="#737373"/>
                      </svg>
                       {site?.address2}
                       </p>
                       <p className="mt-[5px]">City: {site?.city}</p>
                       <p className="flex items-center mt-[10px]">
                       <svg className="mr-[10px]" width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M10.5 4.25H7V0.75L10.5 4.25ZM7 5.125H10.5V13.4375C10.5 14.1758 9.89844 14.75 9.1875 14.75H1.3125C0.574219 14.75 0 14.1758 0 13.4375V2.0625C0 1.35156 0.574219 0.75 1.3125 0.75H6.125V4.25C6.125 4.74219 6.50781 5.125 7 5.125ZM1.75 3.15625C1.75 3.29297 1.83203 3.375 1.96875 3.375H4.15625C4.26562 3.375 4.375 3.29297 4.375 3.15625V2.71875C4.375 2.60938 4.26562 2.5 4.15625 2.5H1.96875C1.83203 2.5 1.75 2.60938 1.75 2.71875V3.15625ZM1.96875 5.125H4.15625C4.26562 5.125 4.375 5.04297 4.375 4.90625V4.46875C4.375 4.35938 4.26562 4.25 4.15625 4.25H1.96875C1.83203 4.25 1.75 4.35938 1.75 4.46875V4.90625C1.75 5.04297 1.83203 5.125 1.96875 5.125ZM5.38672 9.41797L5.22266 9.39062C4.59375 9.19922 4.59375 9.08984 4.62109 8.98047C4.64844 8.76172 5.08594 8.70703 5.44141 8.76172C5.60547 8.78906 5.76953 8.84375 5.93359 8.89844C6.20703 9.00781 6.53516 8.84375 6.61719 8.57031C6.72656 8.26953 6.58984 7.96875 6.28906 7.85938C6.09766 7.80469 5.93359 7.75 5.79688 7.72266V7.53125C5.79688 7.23047 5.55078 6.98438 5.25 6.98438C4.92188 6.98438 4.70312 7.23047 4.70312 7.53125V7.69531C4.07422 7.83203 3.63672 8.21484 3.55469 8.78906C3.33594 9.96484 4.45703 10.293 4.92188 10.4297L5.08594 10.4844C5.87891 10.7031 5.87891 10.7852 5.85156 10.9219C5.82422 11.1406 5.38672 11.1953 5.03125 11.1406C4.83984 11.1133 4.59375 11.0039 4.375 10.9492L4.26562 10.8945C3.96484 10.7852 3.66406 10.9492 3.55469 11.2227C3.44531 11.5234 3.60938 11.8242 3.88281 11.9336L3.99219 11.9609C4.21094 12.043 4.45703 12.125 4.70312 12.1797V12.3438C4.70312 12.6719 4.92188 12.8906 5.25 12.8906C5.55078 12.8906 5.79688 12.6719 5.79688 12.3438V12.1797C6.39844 12.043 6.83594 11.6875 6.91797 11.1133C7.13672 9.91016 5.98828 9.60938 5.38672 9.41797Z" fill="#737373"/>
                        </svg>
                            Schedule {site?.payment}
                       </p>
                   </div>
                   <span className="h-[40px] cursor-pointer text-[#00AEE8]"
                         onClick={()=> setToggleModal(!toggleModal)}>Edit Site
                   </span>
               </div>
               <ModalMiddle show={toggleModal} onClose={()=>{setToggleModal(false)}}>
                   {
                       <SiteUpdateForm onSubmit={submitSiteUpdateInfo} siteId={site.id}/>
                   }
               </ModalMiddle>
               <div className="flex flex-col w-[30%]">
                  <h1 className="flex items-center">MDPs <hr className="ml-[10px] w-[100%]" /></h1>
                  {site?.mdps? site.mdps.map((mdp:any, mdp_index:number) => <MDPsDetails key={mdp_index} mdps={mdp} siteId={site.id} />) :
                    ""}
               </div>
           </div>
        </Fragment>
     )
}

export default SiteDetails;
