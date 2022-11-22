import { useState } from "react";
import { ModalMiddle } from "./../../components/Modal";
import MDPUpdateForm from "../../components/Form/MDPUpdateForm"
import { UpdateMDPDataForm } from "../../interfaces/form"
import { useSelector, useDispatch } from "react-redux";
import { sendUpdateMDP } from "../../actions/electripure"
import MDPLogo from "../../assets/svg/mdp1.svg"

const MDPsDetails = ({mdps, siteId}:{mdps: any, siteId:number}) => {
    const [ toggleDetails, setToggleDetails ] = useState(false);
    const [ toggleModal, setToggleModal ] = useState(false);
    const [ updateValue, setUpdateValue ] = useState({})

    const dispatch = useDispatch()
    const submitMDPUpdateInfo = (data:UpdateMDPDataForm) => {
        console.log("Mdp updated", data)
        dispatch(sendUpdateMDP(data))
        setToggleModal(false)
    }
    return(
        <div className="flex flex-col z-0">
            <div className="flex justify-between items-center h-[50px] m-[10px]">
                <div className="flex items-center">
                    <img src={MDPLogo} alt="" />
                    <p className="ml-[10px]">MDP  {mdps.id}
                        {toggleDetails ? <span  onClick={()=>setToggleModal(!toggleModal)}
                                                className="cursor-pointer ml-[15px] text-[#00AEE8]">Edit MDP</span>: ""}
                    </p>
                </div>
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
                    <MDPUpdateForm onSubmit={submitMDPUpdateInfo} siteId={siteId} mdpId={mdps.id}/>
                }
            </ModalMiddle>
            { toggleDetails ?
                <div className="w-[280px] m-auto">
                    <div className="mb-[5px] flex">Meter ID: <p className="text-[#00AEE8]"> {mdps.meterID}</p></div>
                    <div className="mb-[5px] flex">Appliance ID: <p className="text-[#00AEE8]"> {mdps.applianceID}</p></div>
                    <div className="mb-[5px]">MDP rating: {mdps.MDP}</div>
                    <div className="mb-[5px]">Switchgear rating: {mdps.switchgear}</div>
                    <div className="mb-[5px]">Transformer rating: {mdps.transformer}</div>
                </div>
            :
            ""}
        <hr />
        </div>
    )
}

export default MDPsDetails;
