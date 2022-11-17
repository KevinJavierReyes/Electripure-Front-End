import { Fragment, useEffect, useState } from "react"
import MDP from "./MDP"

const Site = (site:any) => {
    const [ toggleData, setToggleData ] = useState(false)
    return (
        <Fragment>
            <hr className="mt-[15px] w-full" />
            <div className="w-full flex justify-between" >
                <div className="flex h-[75px]">
                    <div className="h-[60px] w-[60px] mt-2">
                        <img className="h-full w-full rounded-md" src={site['site'].link} alt="image" />
                    </div>
                    <div className="ml-4 mt-3">
                        <h4>{site['site'].name}</h4>
                        <div >
                            <small>Status</small>
                            <span className="p-1 text-[#55BA47]">&#9679;</span>
                        </div>
                    </div>
                </div>
                <div onClick={() => setToggleData(prev => !toggleData)} className="w-[50px] h-[50px] my-auto border-l-2 cursor-pointer">
                    <i className={`border-solid border-black divide-x-[3px] p-[3px] ml-4 mt-3 inline-block border-b-2 translate-x-1/2 translate-y-1/2 border-r-2 ${toggleData ? 'rotate-[-135deg]':'rotate-45'}`}>
                    </i>
                </div>
            </div>
            <div className={`${toggleData? "block" : "hidden"}`}>
                { site.length !== 0 ? site['site'].mdp_list.map((mdp: any, index_mdp:any) => 
                    <MDP key={index_mdp} mdp={mdp} site={site["site"]}/> 
                ): ""}
            </div>
            <hr className="w-full" />
            
        </Fragment>
    )
}

export default Site;
