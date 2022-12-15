import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendAddCompany } from "../actions/electripure"
import { ElectripureState } from "./../interfaces/reducers";
import BasicCompanyInformationForm from "../components/Form/BasicCompanyInformationForm"
import { BasicCompanyInformationDataForm, 
         MainPointContactDataForm, 
         SiteManagerDataForm, 
         CreateMDPDataForm,
         SiteDetailDataForm } from "../interfaces/form"

import MainPointContactForm from "../components/Form/MainPointContactForm";
import { ModalMiddle } from "./../components/Modal";
import SiteManagerForm from "./../components/Form/SiteManagerForm";
import SiteDetailForm from "./../components/Form/SiteDetailForm";
import CreateMDPForm from "./../components/Form/CreateMDPForm"
import FinishCreateMDPForm from "./../components/Form/FinishCreateMDPForm"
import { CiaPermission } from "../routers/Permissions"

import Navegation from "../components/Navigation";
import { ButtonSecondary } from "../components/FormInput/Button";
import DataTableDevices from "../components/DataTables/DataTableDevices"
import { settingPermissions } from "../libs/permissions"

function DeviceListPage () {
    const [isShowModal, setShowModal] = useState(false);
    const toastMessage = useSelector((state: ElectripureState) => state.toastMessage);
    const dispatch = useDispatch();
    
    useEffect(() => {
    }, [toastMessage])

    return (
        <Fragment>
            <div className="px-[30px] py-[10px] w-full">
                <div className={"justify-center items-center flex mb-[20px] sm:justify-start flex-col-reverse sm:flex-row"}>
                    <div className={"w-[200px]"}>
                        <CiaPermission role="create_company">
                            <ButtonSecondary onClick={()=> setShowModal(true)}>
                                <span className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                    </svg>
                                    <span className="f-medium">Add new device</span>
                                </span>
                            </ButtonSecondary>
                        </CiaPermission>
                        <ModalMiddle show={isShowModal} onClose={()=>{setShowModal(false);}}>
                            {
                            }
                        </ModalMiddle>  

                    </div>
                    <span className="ml-[20px]"><h3 className="f-bold text-lg">Device Management</h3></span>
                </div>
                { settingPermissions("list_device")[0] === 1 ?
                    <div className="w-full rounded border-color-secondary border">
                            <DataTableDevices />
                    </div>
                    : <div></div>
                }
            </div>
        </Fragment>
    );
}

export default DeviceListPage;
