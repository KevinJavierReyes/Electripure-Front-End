import { Fragment, useState } from "react";
import img from "./item_img.svg";
import { useNavigate, useParams } from "react-router-dom";

const MDP = ({site, mdp}: {site: any, mdp: any}) => {
    console.log(site, mdp);
    const meterId : string = mdp["sub_id"][0].replace("Meter ID: ", "");
    const mdpId : string = mdp["id"];
    const siteId : string = site["id"];
    const {companyId} = useParams();
    // console.log("Company ", companyId);
    const [ togglesubData, setSubToggleData ] = useState(false);
    const navigate = useNavigate();
    return (
        <Fragment>
            <div className="">
            <hr className="w-full" />
                <div className="w-full flex justify-between">
                    <div className="flex h-[75px] ml-8">
                        <div className="h-[40px] v-[40px] mt-2">
                            <img className="h-full w-full rounded-md" src={img} alt="image" />
                        </div>
                        <div className="ml-4 mt-6">
                            <h3>{mdp.name}</h3>
                        </div>
                    </div>
                    <div onClick={() =>setSubToggleData(prev => !togglesubData)} className="w-[50px] h-[50px] my-auto border-l-2 cursor-pointer">
                            <i className={`
                                            border-solid
                                            border-black 
                                            divide-x-[3px] 
                                            p-[3px] 
                                            mxlix-4
                                            ml-4 
                                            mt-3 
                                            inline-block 
                                            border-b-2 
                                            translate-x-1/2 
                                            translate-y-1/2 
                                            border-r-2 ${togglesubData ? 'rotate-[-135deg]' : 'rotate-45' }`}>
                            </i>
                    </div>
                </div>
                { mdp.sub_id?.map((sub_id:any, index_sub_id: any) => (
                    <div key={index_sub_id} className={togglesubData? "text-xs text-left m-1 w-[80%] pl-[40px]" : "hidden" }>
                        <p><strong>{sub_id}</strong></p>
                    </div>
                ))}
                { mdp.sub_mdp?.map((sub_mdp:any, index_sub_mdp: any) => (
                    <div key={index_sub_mdp} className={togglesubData? "text-left m-1 text-black w-[80%] pl-[40px]" : "hidden" }>
                        {   sub_mdp == "Amps & Volts" ? 
                                <p><strong className="cursor-pointer" onClick={ () => {
                                    navigate(`company/${companyId}/meter/${meterId}/apmsvolts/amps`)
                                } }>{sub_mdp}</strong></p> :
                            sub_mdp == "Power" ?
                                <p><strong className="cursor-pointer" onClick={ () => { 
                                    navigate(`company/${companyId}/meter/${meterId}/power/active`)
                                    // navigate(`company/${companyId}/site/${siteId}/mdp/${mdpId}/power/${meterId}/active`)
                                } }>{sub_mdp}</strong></p> :
                                <p><strong>{sub_mdp}</strong></p>
                        }
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default MDP;
