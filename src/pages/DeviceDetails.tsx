import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ElectripureState } from "../interfaces/reducers"
import { useParams } from "react-router";

// Import components
import { ModalMiddle } from "./../components/Modal";
import DataTableUsers from "../components/DataTables/DataTableUsers";
import { ButtonSecondary } from "../components/FormInput/Button";
import { UpdateDeviceDataForm } from "../interfaces/form"
import { DeviceData } from "../interfaces/entities"
import DeviceUpdateForm from "../components/Form/DeviceUpdateForm"
import { useNavigate } from "react-router";
// Import actions
import { sendGetDevicesTable, sendGetUsers, sendUpdateDeviceDetails } from "../actions/electripure";
import { UserPermission } from "../routers/Permissions"
import { settingPermissions } from "../libs/permissions"


function DeviceDetails () {

    const [ toggleModal, setToggleModal ] = useState(false)
    const [ updateValue, setUpdateValue ] = useState({})
    const { devId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const devices = JSON.parse(useSelector((state: ElectripureState) => state.devicesTable));
    const device:DeviceData = devices.device_list?.filter((element:DeviceData)=> element.id_device === parseInt(devId?? ""))[0];

    const submitDeviceUpdateInfo = (data: UpdateDeviceDataForm) =>{
        dispatch(sendUpdateDeviceDetails(data));
        setToggleModal(false)
        dispatch(sendGetDevicesTable({}));
    }

    useEffect(() =>{
        dispatch(sendGetDevicesTable({}));
    }, [devices])


    return (
        <Fragment>
            <div className="rounded border w-[120px] h-[50px] bg-white mb-[20px] flex items-center justify-evenly">
                <svg width="7" 
                     height="10"
                     viewBox="0 0 7 10" 
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0.847656 4.28516C0.601562 4.55859 0.601562 4.96875 0.847656 5.21484L4.56641 8.93359C4.83984 9.20703 5.25 9.20703 5.49609 8.93359L6.125 8.33203C6.37109 8.05859 6.37109 7.64844 6.125 7.40234L3.47266 4.75L6.125 2.125C6.37109 1.87891 6.37109 1.44141 6.125 1.19531L5.49609 0.566406C5.25 0.320312 4.83984 0.320312 4.56641 0.566406L0.847656 4.28516Z" fill="#181818"/>
                </svg>
                <span className="text-xl cursor-pointer" onClick={()=>{navigate("/dashboard/device/list")}}>Back</span>
            </div>
            <div className="flex bg-white p-[20px] h-[600px] flex-col">
                <div className="flex">
                    <div className="rounded-[50%] border w-[100px] h-[100px] flex justify-around items-center font-bold text-4xl">
                        <h1>{device?.type_device[0]}</h1>
                    </div>
                    <div className="ml-[100px]">
                        <div className="flex">
                            <h1 className="text-3xl">{device?.serial_number}</h1>
                                { settingPermissions("edit_device")[0] === 1?
                                <span className="cursor-pointer mt-[20px] ml-[20px] text-[#00AEE8]" onClick={()=> setToggleModal(!toggleModal)}>Edit Device Information</span>
                                :<span></span>
                                }
                        </div>
                        <ModalMiddle show={toggleModal} onClose={()=>{setToggleModal(false)}}>
                            {
                                <DeviceUpdateForm onSubmit={submitDeviceUpdateInfo} device={device}/>
                            }
                        </ModalMiddle>
                        <div className="mt-[10px]" >
                            <p className="flex items-center"></p>
                        </div>
                        <div className="mt-[10px]"><p>Type: {device?.type_device}</p></div>
                    </div>
                </div>
                <div className="flex w-[100%] gap-[40px]">
                    <div className="w-[50%]">
                        <div className="flex w-[100%] mt-[25px] text-2xl items-center"><h1 className="w-[50%]">Paired device</h1><hr className="w-[50%]"/></div>
                        <div className="mt-[25px] flex flex-col overflow-scroll border h-[250px] rounded p-[30px]">
                            <h1 className="text-3xl mb-[20px] text-[#00AEE8]">{device?.serial_number}</h1>
                            <span className="flex items-center">
                                <svg  className="mr-[20px]" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.1875 1.375C2.1875 0.910156 2.57031 0.5 3.0625 0.5H4.8125C5.27734 0.5 5.6875 0.910156 5.6875 1.375H8.3125C8.3125 0.910156 8.69531 0.5 9.1875 0.5H10.9375C11.4023 0.5 11.8125 0.910156 11.8125 1.375H12.25C13.207 1.375 14 2.16797 14 3.125V9.25C14 10.2344 13.207 11 12.25 11H1.75C0.765625 11 0 10.2344 0 9.25V3.125C0 2.16797 0.765625 1.375 1.75 1.375H2.1875ZM10.5 4C10.5 3.78125 10.2812 3.5625 10.0625 3.5625C9.81641 3.5625 9.625 3.78125 9.625 4V4.875H8.75C8.50391 4.875 8.3125 5.09375 8.3125 5.3125C8.3125 5.55859 8.50391 5.75 8.75 5.75H9.625V6.625C9.625 6.87109 9.81641 7.0625 10.0625 7.0625C10.2812 7.0625 10.5 6.87109 10.5 6.625V5.75H11.375C11.5938 5.75 11.8125 5.55859 11.8125 5.3125C11.8125 5.09375 11.5938 4.875 11.375 4.875H10.5V4ZM2.625 5.75H5.25C5.46875 5.75 5.6875 5.55859 5.6875 5.3125C5.6875 5.09375 5.46875 4.875 5.25 4.875H2.625C2.37891 4.875 2.1875 5.09375 2.1875 5.3125C2.1875 5.55859 2.37891 5.75 2.625 5.75Z" fill="#737373"/>
                                </svg>
                                {"Appliance"}
                            </span>
                        </div>
                    </div>
                    <div className="w-[50%]">
                        <div className="flex w-[100%] mt-[25px] text-2xl items-center"><h1 className="w-[40%]">Location details</h1><hr className="w-[60%]"/></div>
                        <div className="mt-[25px] flex flex-col overflow-scroll border h-[250px] rounded p-[30px]">
                            <h1 className="text-3xl mb-[20px] text-[#00AEE8]">{device?.company_name}</h1>
                            <p className="text-xl">{device?.MDP_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DeviceDetails;
