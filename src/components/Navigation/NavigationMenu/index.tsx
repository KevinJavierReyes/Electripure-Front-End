import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendAddCompany, setJwt, setLoginToken, setTimestampTwoStepVerification } from "../../../actions/electripure";
import { BasicCompanyInformationDataForm, CreateMDPDataForm, MainPointContactDataForm, SiteDetailDataForm, SiteManagerDataForm } from "../../../interfaces/form";
import { ElectripureState } from "../../../interfaces/reducers";
import BasicCompanyInformationForm from "../../Form/BasicCompanyInformationForm";
import CreateMDPForm from "../../Form/CreateMDPForm";
import FinishCreateMDPForm from "../../Form/FinishCreateMDPForm";
import MainPointContactForm from "../../Form/MainPointContactForm";
import SiteDetailForm from "../../Form/SiteDetailForm";
import SiteManagerForm from "../../Form/SiteManagerForm";
import { ModalMiddle } from "../../Modal";
import logoUrl from "./../../../assets/svg/Logo.svg";
import DropdownSelector from "./DropdownSelector"


function NavbarMenu() {
    const [isShowModal, setShowModal] = useState(false);
    const [siteDefaultDataForm, setSiteDefaultDataForm] = useState(`{
        "name": "",
        "address": "",
        "address2": "",
        "city": "",
        "state": "",
        "zip": "",
        "logo": "",
        "rate": "",
        "schematic": ""
    }`);
    const toastMessage = useSelector((state: ElectripureState) => state.toastMessage);
    const dispatch = useDispatch();
    
    const [newCompanyRaw, setNewCompany] = useState(`{  "id_user": 42 } `);
    const [stepCreateCompany, setStepCreateCompany] = useState(1);
    const newCompany = JSON.parse(newCompanyRaw);


    function submitBasicCompanyInformationForm(data: BasicCompanyInformationDataForm) {
        setNewCompany(JSON.stringify({
            ...newCompany,
            "basicInformation": {
                "companyName" : data.company,
                "address" : data.address,
                "address2" : data.address2,
                "city" : data.city,
                "state": data.state,
                "zip": data.zip,
                "imgId" : data.logo
            }
        }));
        setSiteDefaultDataForm(JSON.stringify({
            "address": data.address,
            "address2": data.address2,
            "city": data.city,
            "state": data.state,
            "zip": data.zip
        }));
        console.log("Step 1", data);
        setStepCreateCompany(2);
    }

    function submitMainPointContactForm(data: MainPointContactDataForm) {
        setNewCompany(JSON.stringify({
            ...newCompany,
            "mainPointContact" : {
                "fullName" : data.fullname,
                "email" : data.email,
                "cellPhone" : data.cellphone
            }
        }));
        console.log("Step 2", data);
        setStepCreateCompany(3);
    
    }

    function submitSiteManagerForm(data: SiteManagerDataForm) {
        setNewCompany(JSON.stringify({
            ...newCompany,
            "siteManager" : {
                "fullName" : data.fullname,
                "email" : data.email,
                "cellPhone" : data.cellphone
            }
        }));
        console.log("Step 3", data);
        setStepCreateCompany(4);
    }

    function submitSiteDetailForm(data: SiteDetailDataForm) {
        setNewCompany(JSON.stringify({
            ...newCompany,
            "siteDetails" : {
                "siteName" : data.name,
                "address" : data.address,
                "address2" : data.address2,
                "city" : data.city,
                "state": data.state,
                "zip": data.zip,
                "paymentSchedule" : data.rate,
                "imgId" : data.logo,
                "imgSchematic" : data.schematic
            }
        }));
        console.log("Step 4", data);
        setStepCreateCompany(5);
    }

    function submitCreateMDPForm(data: CreateMDPDataForm[]) {
        setNewCompany(JSON.stringify({
            ...newCompany,
            "MDP": data.map((mdpData: CreateMDPDataForm) => {
                return {
                    "siteName" : mdpData.name,
                    "meterID" : mdpData.meterId,
                    "applianceID" : mdpData.applianceId,
                    "MDP" : mdpData.ampCap,
                    "switchgear": mdpData.switchgearCap,
                    "transformer": mdpData.transformer
                };
            })
        }));
        console.log("Step 5", data);
        dispatch(sendAddCompany({
            ...newCompany,
            "MDP": data.map((mdpData: CreateMDPDataForm) => {
                return {
                    "siteName" : mdpData.name,
                    "meterID" : mdpData.meterId,
                    "applianceID" : mdpData.applianceId,
                    "MDP" : mdpData.ampCap,
                    "switchgear": mdpData.switchgearCap,
                    "transformer": mdpData.transformer
                };
            })
        }));
    }

    function previousStepCreateCompany() {
        setStepCreateCompany(stepCreateCompany - 1);
    }

    useEffect(() => {
        if (toastMessage == "Company created!") {
            // setStepCreateCompany(6);
            setShowModal(false);
            setStepCreateCompany(1);
        }
    }, [toastMessage])

    // function logout() {
    //     dispatch(setTimestampTwoStepVerification({
    //         "timestamp": null
    //     }));
    //     dispatch(setLoginToken({
    //         "token": null
    //     }));
    //     dispatch(setJwt({
    //         "token": null
    //     }));
    //     localStorage.removeItem("electripureJwt");
    //     // navigate("/login");
    // }

    return (
        <div className="w-full h-screen	flex justify-start items-center flex-col shadow-md border-r border-color-black-light">
            <div className="w-full px-[10px] py-[15px]">
                <img src={logoUrl} className="h-[40px]"></img>
            </div>
            {/* <div className="w-full px-[30px]"> */}
                {/*<button onClick={logout}>Log out</button> */}
            {/* </div> */}
            <DropdownSelector onCreateCompany={()=> {
                setShowModal(true);
            }}/>
            <ModalMiddle show={isShowModal} onClose={()=>{setShowModal(false); setStepCreateCompany(1);}}>
                {
                    stepCreateCompany == 1 ? <BasicCompanyInformationForm onSubmit={submitBasicCompanyInformationForm}/> :
                    stepCreateCompany == 2 ? <MainPointContactForm onSubmit={submitMainPointContactForm} onPrevious={previousStepCreateCompany}/> :
                    stepCreateCompany == 3 ? <SiteManagerForm onSubmit={submitSiteManagerForm} onPrevious={previousStepCreateCompany}/> :
                    stepCreateCompany == 4 ? <SiteDetailForm defaultData={JSON.parse(siteDefaultDataForm)} onSubmit={submitSiteDetailForm} onPrevious={previousStepCreateCompany}/> :
                    stepCreateCompany == 5 ? <CreateMDPForm onSubmit={submitCreateMDPForm} onPrevious={previousStepCreateCompany}/> :
                    stepCreateCompany == 6 ? <FinishCreateMDPForm onClose={()=>{setShowModal(false); setStepCreateCompany(1);}}/> : <div></div>
                }
            </ModalMiddle>  
        </div>
    );
    
}

export default NavbarMenu;
