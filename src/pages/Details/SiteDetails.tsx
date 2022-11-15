import { Fragment } from "react";
import MDPsDetails from "./MDPsDetails"

const SiteDetails = ({sites}:any) => {
    return (
        <Fragment>
           {sites.map((site:any, index:number) =>(
            <div key={index} className="flex border p-[20px] mt-[40px] h-[500px]">
               <div className="flex w-[60%] gap-[20px]">
                   <img className="w-[100px] h-[100px] rounded" src={site.link} />
                   <p>{site.name}</p>
                   <p className="cursor-pointer">Edit Site</p>
               </div>
               <div className="flex flex-col w-[30%]">
                  <h1 className="flex items-center">MDPs <hr className="ml-[10px] w-[100%]" /> </h1>
                  {site?.mdp_list? site.mdp_list.map((mdp:any, mdp_index:number) => (<MDPsDetails key={mdp_index} mdps={mdp} />)) :
                    ""}
               </div>
           </div>))}
        </Fragment>
     )
}

export default SiteDetails;
