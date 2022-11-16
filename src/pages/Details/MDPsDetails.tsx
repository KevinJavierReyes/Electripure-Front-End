import { useState } from "react";
import MDPDetails from "./MDPDetails"
import { ModalMiddle } from "./../../components/Modal";
import MDPUpdateForm from "../../components/Form/MDPUpdateForm"
import { UpdateMDPDataForm } from "../../interfaces/form"

const MDPsDetails = ({mdps}:any) => {
    const [ toggleDetails, setToggleDetails ] = useState(false);
    const [ toggleModal, setToggleModal ] = useState(false);
    const [ updateValue, setUpdateValue ] = useState({})

    const submitMDPUpdateInfo = (data:UpdateMDPDataForm) => {
        setUpdateValue(JSON.stringify({
            ...updateValue,
            "MDP": {
                "name": data.name,
                "meterId": data.meterId,
                "applianceId": data.applianceId,
                "ampCap": data.ampCap,
                "switchgearCap": data.switchgearCap,
                "transformer": data.transformer
            }
        }));
    }
    return(
        <div className="flex flex-col z-0">
            <div className="flex justify-between items-center h-[50px] m-[10px]">
                <p>{mdps.name} 
                    {toggleDetails ? <span  onClick={()=>setToggleModal(!toggleModal)}
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
            <ModalMiddle show={toggleModal} onClose={()=>{setToggleModal(false)}}>
                {
                    <MDPUpdateForm onSubmit={submitMDPUpdateInfo}/>
                }
            </ModalMiddle>
            { toggleDetails ?
                <MDPDetails sub_mdp={mdps.sub_mdp} sub_id={mdps.sub_id} />:
            ""}
        <hr />
        </div>
    )
}

export default MDPsDetails;
