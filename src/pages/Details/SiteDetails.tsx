import { Fragment, useState, useEffect } from "react";
import MDPsDetails from "./MDPsDetails"
import { ModalMiddle } from "./../../components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { SiteDetailDataForm } from "../../interfaces/form";
import  SiteUpdateForm  from "../../components/Form/SiteUpdateForm"
import { sendUpdateSite } from "../../actions/electripure"

const SiteDetails = ({sites}:any) => {
    const [ toggleModal, setToggleModal ] = useState(false)
    const [ updateValue, setUpdateValue ] = useState({})
    const dispatch = useDispatch()
    console.log(sites)

    const submitSiteUpdateInfo = (data: SiteDetailDataForm) =>{
        dispatch(sendUpdateSite(data))
        setToggleModal(false)
    }
        
    useEffect(() =>{
    
    })
    return (
        <Fragment>
           {sites.map((site:any, index:number) =>(
            <div key={index} className="flex border p-[20px] mt-[40px] h-[500px]">
               <div className="flex w-[60%] gap-[20px]">
                   <img className="w-[100px] h-[100px] rounded" src={site.site_image} />
                   <p>{site.name}</p>
                   <span className="h-[40px] cursor-pointer"
                         onClick={()=> setToggleModal(!toggleModal)}>Edit Site</span>
               </div>
               <ModalMiddle show={toggleModal} onClose={()=>{setToggleModal(false)}}>
                   {
                       <SiteUpdateForm onSubmit={submitSiteUpdateInfo}/>
                   }
               </ModalMiddle>
               <div className="flex flex-col w-[30%]">
                  <h1 className="flex items-center">MDPs <hr className="ml-[10px] w-[100%]" /> </h1>
                  {site?.mdps? site.mdps.map((mdp:any, mdp_index:number) => <MDPsDetails key={mdp_index} mdps={mdp} />) :
                    ""}
               </div>
           </div>))}
        </Fragment>
     )
}

export default SiteDetails;
