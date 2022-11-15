import { useState } from "react";
import MDPDetails from "./MDPDetails"

const MDPsDetails = ({mdps}:any) => {
    const [ toggleDetails, setToggleDetails ] = useState(false);
    const updateMDP = () => {
        console.log('update mdp')
    }
    return(
        <div className="flex flex-col z-0">
            <div className="flex justify-between items-center h-[50px] m-[10px]">
                <p>{mdps.name} 
                    {toggleDetails ? <span  onClick={updateMDP}
                                            className="cursor-pointer ml-[15px]">Edit MDP</span>: ""}
                </p>
                <div onClick={()=> setToggleDetails(!toggleDetails)} 
                     className="w-[50px] h-[50px] my-auto border-l-2 cursor-pointer">
                    <i  className={`inline-block
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
                                    border-r-2 ${toggleDetails? 'rotate-[-135deg]' : 'rotate-45'}`}>
                    </i>
                </div>
            </div>
            { toggleDetails ?
                <MDPDetails sub_mdp={mdps.sub_mdp} sub_id={mdps.sub_id} />:
            ""}
        <hr />
        </div>
    )
}

export default MDPsDetails;
